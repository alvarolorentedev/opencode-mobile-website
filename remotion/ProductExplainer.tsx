import type {ReactNode} from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const palette = {
  background: '#131111',
  surface: '#191717',
  border: '#393434',
  text: '#f2eded',
  muted: '#b8b2b2',
  soft: '#858080',
  mint: '#78e5c1',
};

const fontFamily =
  'IBM Plex Mono, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

type ScreenshotSceneProps = {
  image: string;
  eyebrow: string;
  headline: string;
  description: string;
  points: string[];
  progress: string;
};

function ScreenshotScene({
  image,
  eyebrow,
  headline,
  description,
  points,
  progress,
}: ScreenshotSceneProps) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, 102, 118], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const copyOffset = interpolate(frame, [0, 24], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        background: palette.background,
        color: palette.text,
        fontFamily,
        opacity,
      }}>
      <div
        style={{
          position: 'absolute',
          inset: 28,
          border: `1px solid ${palette.border}`,
        }}
      />
      <div
        style={{
          display: 'grid',
          height: '100%',
          gridTemplateColumns: 'minmax(0, 1fr) 510px',
          gap: 76,
          alignItems: 'center',
          padding: '54px 92px',
          boxSizing: 'border-box',
        }}>
        <div style={{translate: `0 ${copyOffset}px`}}>
          <div
            style={{
              color: palette.mint,
              fontSize: 18,
              letterSpacing: 2.2,
              textTransform: 'uppercase',
            }}>
            {eyebrow}
          </div>
          <h1
            style={{
              maxWidth: 620,
              margin: '28px 0 0',
              color: palette.text,
              fontSize: 65,
              lineHeight: 1.02,
              letterSpacing: -3.6,
            }}>
            {headline}
          </h1>
          <p
            style={{
              maxWidth: 600,
              margin: '26px 0 0',
              color: palette.muted,
              fontSize: 23,
              lineHeight: 1.5,
            }}>
            {description}
          </p>
          <div style={{display: 'grid', gap: 10, marginTop: 32}}>
            {points.map((point) => (
              <div
                key={point}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  color: palette.text,
                  fontSize: 17,
                }}>
                <span style={{color: palette.mint}}>—</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
          <div style={{marginTop: 38, color: palette.soft, fontSize: 14}}>
            {progress}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            height: 664,
            placeItems: 'center',
            borderLeft: `1px solid ${palette.border}`,
            background: palette.surface,
          }}>
          <Img
            src={staticFile(image)}
            style={{
              display: 'block',
              width: 278,
              height: 624,
              objectFit: 'contain',
              border: `1px solid ${palette.border}`,
              boxShadow: '0 24px 70px rgba(0,0,0,.28)',
              scale: interpolate(frame, [0, 28], [0.975, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
}

function TimedScene({from, children}: {from: number; children: ReactNode}) {
  return (
    <Sequence from={from} durationInFrames={120}>
      {children}
    </Sequence>
  );
}

export function ProductWalkthrough() {
  return (
    <AbsoluteFill style={{background: palette.background}}>
      <TimedScene from={0}>
        <ScreenshotScene
          image="img/product/task-session.webp"
          eyebrow="01 · Chat"
          headline="Start a real OpenCode task."
          description="Choose your agent and model, send the instruction, and stay close to the work."
          points={['Session progress', 'Changed-file count', 'Follow-up controls']}
          progress="01 / 03 · Actual app capture"
        />
      </TimedScene>
      <TimedScene from={120}>
        <ScreenshotScene
          image="img/product/voice-mode.webp"
          eyebrow="02 · Voice"
          headline="Give the next instruction naturally."
          description="Use the foreground conversation loop when typing a follow-up is inconvenient."
          points={['Listening state', 'Last recognized turn', 'Clear stop control']}
          progress="02 / 03 · Actual app capture"
        />
      </TimedScene>
      <TimedScene from={240}>
        <ScreenshotScene
          image="img/product/session-usage.webp"
          eyebrow="03 · Usage"
          headline="Understand the context behind the work."
          description="Review context utilization and model activity without leaving the active session."
          points={['Context pressure', 'Token activity', 'Provider and model']}
          progress="03 / 03 · Actual app capture"
        />
      </TimedScene>
    </AbsoluteFill>
  );
}
