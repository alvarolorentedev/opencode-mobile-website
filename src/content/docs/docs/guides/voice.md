---
title: Use Voice with OpenCode Mobile
description: Use voice dictation and hands-free conversation mode in OpenCode Mobile, including system speech, on-device models, wake phrases, and limits.
lastUpdated: 2026-11-06
---

Use voice for quick follow-ups while walking, reviewing another screen, or when typing a detailed prompt is inconvenient. Voice input and spoken replies are separate choices: you can dictate with the system recognizer and still play replies through an on-device voice, or the reverse.

## Dictate one prompt

1. Make sure the composer is empty.
2. Tap the microphone.
3. Speak one instruction.
4. Review and edit the recognized draft.
5. Send it when it says what you intended.

Dictation fills the draft; it does not bypass your review or send automatically.

## Choose an input mode

Open **Settings → Voice & audio**.

### System speech

The default path uses the operating system's speech recognizer.

- It is available wherever the OS recognizer is available.
- Conversation mode can require a wake phrase, `hey code` by default.
- Recognition audio is handled by the OS or its speech provider under that vendor's policy.
- Confirmation is on by default, so a recognized command is shown before it is sent.

Turning the wake phrase off makes conversation mode listen immediately. In that mode, ambient speech may reach the OS speech provider and every recognized utterance becomes a confirmation candidate.

### On-device voice

The private, opt-in path runs wake-word detection, speaker verification, and speech recognition on the device.

- Choose **On-device** as the input mode, then download the base wake pack and a command model. The default English pack is about 152 MB; the multilingual Whisper tiny option is about 161 MB.
- Available wake phrases are **Hey code** and **Hey opencode**. The wake phrase remains English because the local keyword model is English.
- Voice enrollment is optional. When verification is enabled, a detected turn must match the enrolled voice before it is transcribed.
- Recognized audio is not sent to a speech vendor. Model downloads are the only network traffic.
- On-device input is foreground-only.

If the models, native runtime, or microphone permission are unavailable, the app falls back to the system phrase gate and says so.

## Use conversation mode

With the composer empty, tap the waveform button. The app runs a hands-free loop:

1. **Armed** — listens for the wake phrase when required.
2. **Listening** — captures the command after the phrase.
3. **Confirming** — shows the command when confirmation is enabled. Say or tap **yes** to send, retry to capture again, or edit the text.
4. **Submitting** — sends the command.
5. **Waiting** — follows the running turn.
6. **Speaking** — reads the assistant reply, then returns to listening.

The overlay shows the active session, current phase, and recognized speech. The animated voice ribbon indicates the active audio state. Tap **End conversation** to stop.

Conversation mode:

- can re-arm immediately after a submission, so the next command can steer or queue work while the assistant is still speaking;
- can read completed interim progress updates before the final reply;
- pauses for permissions or questions that need on-screen input;
- stops when connectivity is lost;
- keeps the screen awake while active.

## Choose spoken replies

Playback is independent of the input mode.

- **System voice** is always available and is the default. The app prefers an Enhanced voice in the selected locale when you have not chosen one.
- **On-device playback** requires an explicitly installed Piper or Kokoro pack. Piper is available for English, Spanish, Hindi, German, French, Simplified Chinese, and Brazilian Portuguese. Kokoro is the natural English option and exposes multiple speakers. Japanese stays on the system voice.
- Removing the active pack switches playback back to the system voice.
- If the pack language does not match an explicit speech locale, the app warns and uses the system voice instead of reading in the wrong language.
- Long replies are split at paragraph and sentence boundaries. Markdown headings, links, inline code, file paths, and tables are converted to speakable prose or short cues.

Set **Speech rate** and the working sound in the same section.

## Check permissions and capabilities

Use the voice check in Settings to review:

- microphone and speech permission;
- speech recognition availability;
- on-device support and model status;
- the selected playback engine and voice;
- a playback test.

If permission was denied, open the device settings from the check. On Android, a recognizer that ends immediately retries the available compatibility modes before showing a retry error. On iOS, an on-device attempt that cannot run retries through network recognition before reporting a failure.

## Know the boundaries

- Conversation mode is foreground-only; continuous background microphone capture is not supported.
- The wake phrase is a submission gate, not an always-on background listener. In system mode the recognizer still runs while armed.
- Overlapping speech is not separated. A noisy room can still contaminate a turn; keep the confirmation and tap fallback.
- On-device speaker verification reduces accidental turns but does not identify every speaker perfectly.
- TTS failures show feedback and leave input ready instead of silently ending the loop.
- Always review high-impact instructions on screen before allowing changes.
- Background completion notifications are independent of voice and may be delayed on iOS.

Next: [Configure providers and models](/docs/guides/providers-and-models/), [start a task](/docs/guides/tasks/), or review [permissions and changes](/docs/guides/approvals-and-changes/).
