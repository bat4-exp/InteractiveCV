import { list } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const BLOB_ANALYTICS_PATH = 'analytics/events.ndjson';

function aggregate(ndjsonText: string): { thisWeek: number; allTime: number; byCountry: Record<string, number> } {
  const byCountry: Record<string, number> = {};
  let allTime = 0;
  let thisWeek = 0;
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const lines = ndjsonText.split('\n').filter((l) => l.trim());
  for (const line of lines) {
    try {
      const e = JSON.parse(line) as { ts: string; geo?: { country?: string } };
      allTime += 1;
      if (new Date(e.ts).getTime() >= weekAgo) thisWeek += 1;
      const country = e.geo?.country ?? 'Unknown';
      byCountry[country] = (byCountry[country] ?? 0) + 1;
    } catch {
      /* skip bad lines */
    }
  }
  return { thisWeek, allTime, byCountry };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { blobs } = await list({ prefix: 'analytics/' });
    const blob = blobs.find((b) => b.pathname === BLOB_ANALYTICS_PATH);
    if (!blob?.url) {
      return res.json({ thisWeek: 0, allTime: 0, byCountry: {} });
    }
    const r = await fetch(blob.url);
    if (!r.ok) return res.json({ thisWeek: 0, allTime: 0, byCountry: {} });
    const text = await r.text();
    const stats = aggregate(text);
    return res.json(stats);
  } catch (e) {
    console.warn('[api/analytics]', e);
    return res.status(500).json({ error: 'Failed to read analytics' });
  }
}
