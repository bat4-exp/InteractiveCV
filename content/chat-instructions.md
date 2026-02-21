# Custom chat instructions

This file is optional. If it exists, its contents are added to the system prompt as **CUSTOM INSTRUCTIONS**. Use it to change how the assistant behaves without editing code or mixing rules into the resume content.

## Examples of what you can add

- **Allow jokes:** You may tell short, light jokes when the user asks or when it fits the conversation. Keep them professional and brief.
- **Allow math:** You may help with arithmetic and simple calculations when the user asks (this is already allowed by default; you can expand to more advanced math if you like).
- **Allow other topics:** You may briefly answer general knowledge questions, or politely decline with a suggestion to ask about Bram.
- **Tone:** Keep answers concise and professional. / Use a slightly more casual tone when appropriate.
- **Language:** Prefer answering in [language] when the user writes in that language.

## Format

Write in plain language, one point per line or in short paragraphs. The model will follow these in addition to the default rules (resume-only for Bram questions, greetings, date/time, etc.).
When providing large amounts of info (like all the past work experience for example), make sure to format it nicely, using break lines and bulletpoints.

## Alternative

You can also put custom instructions inside `resume-context.md`, for example in a section at the end titled **Assistant behaviour** or **How to respond**. The chatbot sees the whole file, so it will follow that too. Using this separate file keeps resume content (facts about Bram) and behaviour rules (jokes, math, tone) in different places.
