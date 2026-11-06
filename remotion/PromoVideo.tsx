import type {ReactNode} from 'react';
import {useEffect, useState} from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const palette = {
  background: '#0B1110',
  surface: '#111A17',
  text: '#EAF3EF',
  muted: '#9AADA8',
  soft: '#6F817C',
  mint: '#7AE7C0',
  mintDim: '#2E6B5A',
  border: '#2B3C38',
};

const sans = 'Inter, "DejaVu Sans", "Liberation Sans", Arial, sans-serif';
const mono = '"DejaVu Sans Mono", "Liberation Mono", monospace';

// 1280x720 renders looked soft on the site's 1920x1080 video slot, so the
// composition renders at the delivery size directly.
const width = 1920;
const height = 1080;
const fps = 30;

type FeatureScene = {
  kind: 'feature';
  duration: number;
  image: string;
  eyebrow: string;
  headline: string;
  description: string;
  points: string[];
};

type IntroScene = {kind: 'intro'; duration: number};
type OutroScene = {kind: 'outro'; duration: number};
type Scene = FeatureScene | IntroScene | OutroScene;

const scenes: Scene[] = [
  {kind: 'intro', duration: 95},
  {
    kind: 'feature',
    duration: 100,
    image: 'promo-chat.webp',
    eyebrow: '02 · CHAT',
    headline: 'Start a real task.',
    description: 'Pick an agent and model, send the instruction, and stay close to the work.',
    points: ['Session progress', 'Changed-file count', 'Follow-up controls'],
  },
  {
    kind: 'feature',
    duration: 100,
    image: 'promo-activity.webp',
    eyebrow: '03 · PROGRESS',
    headline: 'Watch every step.',
    description: 'Reasoning, tool calls, and file changes stream into the transcript as they happen.',
    points: ['Tool activity', 'Plan updates', 'Live status'],
  },
  {
    kind: 'feature',
    duration: 100,
    image: 'promo-diff.webp',
    eyebrow: '04 · REVIEW',
    headline: 'Review before you accept.',
    description: 'Open the changed-file list, inspect the diff, and decide what happens next.',
    points: ['Turn, uncommitted, or branch scope', 'Per-file diffs', 'Approve or intervene'],
  },
  {
    kind: 'feature',
    duration: 100,
    image: 'promo-terminal.webp',
    eyebrow: '05 · TERMINAL',
    headline: 'A terminal in your pocket.',
    description: 'Run the command you need without reopening your laptop.',
    points: ['Interactive PTY', 'Terminal keys', 'Copy output'],
  },
  {
    kind: 'feature',
    duration: 95,
    image: 'promo-files.webp',
    eyebrow: '06 · FILES',
    headline: 'Browse and patch files.',
    description: 'Move through the workspace, preview files, and make targeted changes from mobile.',
    points: ['Project tree', 'File preview', 'Changed files'],
  },
  {
    kind: 'feature',
    duration: 95,
    image: 'promo-plugin-gui.webp',
    eyebrow: '07 · PLUGINS',
    headline: 'See what your plugins build.',
    description: 'Plugin visualizations run in an isolated view, with live panels rendered inside the app.',
    points: ['Installed plugin panels', 'Live workflow graphs', 'Open a node\'s session'],
  },
  {
    kind: 'feature',
    duration: 95,
    image: 'promo-server-settings.webp',
    eyebrow: '08 · SERVER',
    headline: 'Tune the server from your phone.',
    description: 'Manage agents, MCP servers, plugins, skills, commands, and other server settings.',
    points: ['Agents & MCP servers', 'Plugins, skills & commands', 'Project or global scope'],
  },
  {
    kind: 'feature',
    duration: 95,
    image: 'promo-voice.webp',
    eyebrow: '09 · VOICE',
    headline: 'Keep the conversation going.',
    description: 'Use conversation mode when typing a follow-up is inconvenient.',
    points: ['Wake phrase', 'Hands-free follow-ups', 'Clear stop control'],
  },
  {kind: 'outro', duration: 115},
];

const sceneStarts = scenes.reduce<number[]>((starts, scene, index) => {
  starts.push(index === 0 ? 0 : starts[index - 1] + scenes[index - 1].duration);
  return starts;
}, []);

const totalFrames = scenes.reduce((total, scene) => total + scene.duration, 0);

function useInterFont() {
  const [handle] = useState(() => delayRender('Loading Inter'));
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@font-face{font-family:'Inter';font-style:normal;font-weight:100 900;font-display:block;src:url(${staticFile(
      'fonts/inter-latin.woff2',
    )}) format('woff2')}`;
    document.head.appendChild(style);
    const done = () => continueRender(handle);
    Promise.all([document.fonts.load('400 20px Inter'), document.fonts.load('700 80px Inter')]).then(done).catch(done);
    return () => style.remove();
  }, [handle]);
}

function Backdrop() {
  const frame = useCurrentFrame();
  const drift = (frame * 0.18) % 64;

  return (
    <AbsoluteFill style={{backgroundColor: palette.background}}>
      <AbsoluteFill
        style={{
          backgroundImage: [
            'radial-gradient(circle at 72% 34%, rgba(122,231,192,0.14), transparent 46%)',
            'radial-gradient(circle at 18% 82%, rgba(23,91,73,0.38), transparent 52%)',
            'linear-gradient(145deg, #0B1110 0%, #0D1513 52%, #09100E 100%)',
          ].join(','),
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.55,
          backgroundImage: [
            'repeating-linear-gradient(0deg, rgba(234,243,239,0.045) 0 1px, transparent 1px 64px)',
            'repeating-linear-gradient(90deg, rgba(234,243,239,0.045) 0 1px, transparent 1px 64px)',
          ].join(','),
          backgroundPosition: `${drift}px ${drift}px`,
          maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.46) 100%)',
        }}
      />
    </AbsoluteFill>
  );
}

function Eyebrow({children}: {children: ReactNode}) {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{width: 30, height: 1, backgroundColor: palette.mint}} />
      <div
        style={{
          color: palette.mint,
          fontFamily: mono,
          fontSize: 17,
          letterSpacing: 3,
          textTransform: 'uppercase',
        }}>
        {children}
      </div>
    </div>
  );
}

function Points({points, frame, start = 20}: {points: string[]; frame: number; start?: number}) {
  return (
    <div style={{display: 'grid', gap: 13, marginTop: 34}}>
      {points.map((point, index) => (
        <div
          key={point}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 13,
            color: palette.text,
            fontFamily: sans,
            fontSize: 19,
            opacity: interpolate(frame, [start + index * 6, start + 12 + index * 6], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `translateX(${interpolate(
              frame,
              [start + index * 6, start + 12 + index * 6],
              [-12, 0],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            )}px)`,
          }}>
          <span style={{color: palette.mint, fontFamily: mono, fontSize: 16}}>—</span>
          <span>{point}</span>
        </div>
      ))}
    </div>
  );
}

function Phone({
  frame,
  duration,
  image,
}: {
  frame: number;
  duration: number;
  image: string;
}) {
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const lift = interpolate(frame, [0, 26], [64, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });
  const scale = interpolate(frame, [0, 30], [0.94, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });
  const zoom = interpolate(frame, [0, duration], [1, 1.045], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const float = Math.sin(frame / 26) * 2.5;

  return (
    <div
      style={{
        position: 'relative',
        transform: `translateY(${lift + float}px) scale(${scale})`,
      }}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 660,
          height: 660,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(122,231,192,0.20), transparent 64%)',
          filter: 'blur(8px)',
        }}
      />
      <div
        style={{
          position: 'relative',
          width: 380,
          height: 800,
          padding: 10,
          boxSizing: 'border-box',
          borderRadius: 54,
          border: '1px solid #40544D',
          background: 'linear-gradient(160deg, #1B2925, #050807 55%)',
          boxShadow:
            '0 44px 110px rgba(0,0,0,0.58), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 1px 0 rgba(255,255,255,0.16) inset',
        }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 44,
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: palette.background,
          }}>
          <Img
            src={staticFile(`img/product/${image}`)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(118deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 24%, transparent 44%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)',
              borderRadius: 44,
            }}
          />
        </div>
      </div>
      <div style={{position: 'absolute', left: -2, top: 158, width: 3, height: 30, borderRadius: 2, backgroundColor: '#34443F'}} />
      <div style={{position: 'absolute', left: -2, top: 212, width: 3, height: 50, borderRadius: 2, backgroundColor: '#34443F'}} />
      <div style={{position: 'absolute', left: -2, top: 276, width: 3, height: 50, borderRadius: 2, backgroundColor: '#34443F'}} />
      <div style={{position: 'absolute', right: -2, top: 230, width: 3, height: 80, borderRadius: 2, backgroundColor: '#34443F'}} />
    </div>
  );
}

function FeatureScene({
  scene,
  frame,
  duration,
}: {
  scene: FeatureScene;
  frame: number;
  duration: number;
}) {
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const fade = interpolate(frame, [0, 14, duration - 14, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const copyOffset = interpolate(frame, [0, 26], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });
  const copyOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{opacity: fade}}>
      <div
        style={{
          display: 'flex',
          height: '100%',
          padding: '132px 100px 112px',
          boxSizing: 'border-box',
          gap: 64,
        }}>
        <div
          style={{
            width: 790,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            transform: `translateY(${copyOffset}px)`,
            opacity: copyOpacity,
          }}>
          <Eyebrow>{scene.eyebrow}</Eyebrow>
          <h1
            style={{
              margin: '24px 0 0',
              color: palette.text,
              fontFamily: sans,
              fontSize: 76,
              lineHeight: 1.02,
              letterSpacing: -3.4,
              fontWeight: 700,
              maxWidth: 760,
            }}>
            {scene.headline}
          </h1>
          <p
            style={{
              margin: '24px 0 0',
              color: palette.muted,
              fontFamily: sans,
              fontSize: 26,
              lineHeight: 1.5,
              fontWeight: 400,
              maxWidth: 680,
            }}>
            {scene.description}
          </p>
          <Points frame={frame} points={scene.points} />
        </div>
        <div
          style={{
            flex: 1,
            display: 'grid',
            placeItems: 'center',
            borderLeft: `1px solid ${palette.border}`,
            position: 'relative',
          }}>
          <Phone duration={duration} frame={frame} image={scene.image} />
        </div>
      </div>
    </AbsoluteFill>
  );
}

function IntroScene({frame, duration}: {frame: number; duration: number}) {
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const fade = interpolate(frame, [0, 18, duration - 10, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rise = interpolate(frame, [0, 32], [36, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });
  const logoScale = interpolate(frame, [0, 34], [0.82, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });

  return (
    <AbsoluteFill style={{opacity: fade}}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 160px',
          boxSizing: 'border-box',
          textAlign: 'center',
          transform: `translateY(${rise}px)`,
        }}>
        <Img
          src={staticFile('img/app-icon.png')}
          style={{
            width: 104,
            height: 104,
            borderRadius: 24,
            transform: `scale(${logoScale})`,
            boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
          }}
        />
        <div
          style={{
            marginTop: 34,
            color: palette.mint,
            fontFamily: mono,
            fontSize: 16,
            letterSpacing: 4,
          }}>
          OPENCODE MOBILE
        </div>
        <h1
          style={{
            margin: '26px 0 0',
            color: palette.text,
            fontFamily: sans,
            fontSize: 128,
            lineHeight: 0.98,
            letterSpacing: -6,
            fontWeight: 700,
          }}>
          Your desk.
          <br />
          <span style={{color: palette.mint}}>Optional.</span>
        </h1>
        <p
          style={{
            margin: '30px 0 0',
            color: palette.muted,
            fontFamily: sans,
            fontSize: 28,
            lineHeight: 1.45,
            maxWidth: 980,
          }}>
          Start, steer, and review OpenCode sessions from your phone.
        </p>
        <div
          style={{
            marginTop: 46,
            display: 'flex',
            gap: 18,
            alignItems: 'center',
            color: palette.soft,
            fontFamily: mono,
            fontSize: 14,
            letterSpacing: 2.4,
          }}>
          <span>ANDROID</span>
          <span style={{color: palette.mintDim}}>·</span>
          <span>IOS</span>
          <span style={{color: palette.mintDim}}>·</span>
          <span>FREE &amp; OPEN SOURCE</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

function OutroScene({frame, duration}: {frame: number; duration: number}) {
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const fade = interpolate(frame, [0, 20, duration - 16, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rise = interpolate(frame, [0, 32], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });

  return (
    <AbsoluteFill style={{opacity: fade}}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 120px',
          boxSizing: 'border-box',
          textAlign: 'center',
          transform: `translateY(${rise}px)`,
        }}>
        <Img
          src={staticFile('img/app-icon.png')}
          style={{width: 86, height: 86, borderRadius: 20, boxShadow: '0 20px 50px rgba(0,0,0,0.45)'}}
        />
        <h1
          style={{
            margin: '30px 0 0',
            color: palette.text,
            fontFamily: sans,
            fontSize: 86,
            lineHeight: 1.02,
            letterSpacing: -4,
            fontWeight: 700,
            maxWidth: 900,
          }}>
          Take your next session with you.
        </h1>
        <p
          style={{
            margin: '24px 0 0',
            color: palette.muted,
            fontFamily: sans,
            fontSize: 26,
            lineHeight: 1.5,
            maxWidth: 720,
          }}>
          OpenCode Mobile is an independent, community-built companion for your self-hosted OpenCode server.
        </p>
        <div style={{display: 'flex', gap: 14, marginTop: 40}}>
          {['Google Play', 'TestFlight'].map((label) => (
            <div
              key={label}
              style={{
                padding: '15px 26px',
                borderRadius: 999,
                border: `1px solid ${palette.border}`,
                backgroundColor: palette.surface,
                color: palette.text,
                fontFamily: sans,
                fontSize: 19,
                fontWeight: 600,
              }}>
              {label}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 40,
            color: palette.mint,
            fontFamily: mono,
            fontSize: 22,
            letterSpacing: 1.2,
          }}>
          getopencode.app
        </div>
        <div
          style={{
            marginTop: 14,
            color: palette.soft,
            fontFamily: mono,
            fontSize: 13,
            letterSpacing: 2.4,
          }}>
          FREE &amp; OPEN SOURCE · ANDROID + IOS
        </div>
      </div>
    </AbsoluteFill>
  );
}

function Chrome({frame}: {frame: number}) {
  const reveal = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  let index = 0;
  for (let i = 0; i < sceneStarts.length; i += 1) {
    if (frame >= sceneStarts[i]) index = i;
  }
  const number = `${String(index + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')}`;
  const progress = Math.min(1, frame / totalFrames);

  return (
    <AbsoluteFill style={{opacity: reveal, pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          top: 48,
          left: 100,
          right: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <div style={{display: 'flex', alignItems: 'center', gap: 13}}>
          <Img src={staticFile('img/app-icon.png')} style={{width: 30, height: 30, borderRadius: 7}} />
          <span
            style={{
              color: palette.text,
              fontFamily: mono,
              fontSize: 14,
              letterSpacing: 2.6,
            }}>
            OPENCODE MOBILE
          </span>
        </div>
        <span
          style={{
            color: palette.soft,
            fontFamily: mono,
            fontSize: 13,
            letterSpacing: 1.8,
          }}>
          getopencode.app
        </span>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 44,
          left: 100,
          right: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <span
          style={{
            color: palette.soft,
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: 2.4,
          }}>
          COMMUNITY-BUILT FOR OPENCODE
        </span>
        <span
          style={{
            color: palette.muted,
            fontFamily: mono,
            fontSize: 13,
            letterSpacing: 1.6,
          }}>
          {number}
        </span>
      </div>
      <div style={{position: 'absolute', bottom: 30, left: 100, right: 100, height: 1, backgroundColor: palette.border}}>
        <div style={{height: 1, width: `${progress * 100}%`, backgroundColor: palette.mint}} />
      </div>
    </AbsoluteFill>
  );
}

export function PromoVideo() {
  useInterFont();
  const frame = useCurrentFrame();
  useVideoConfig();

  const sequences = [];
  let cursor = 0;
  for (const scene of scenes) {
    const from = cursor;
    cursor += scene.duration;
    sequences.push(
      <Sequence key={from} from={from} durationInFrames={scene.duration}>
        <SceneContent scene={scene} />
      </Sequence>,
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: palette.background}}>
      <Backdrop />
      <Audio src={staticFile('media/opencode-mobile-promo-audio.m4a')} volume={0.8} />
      {sequences}
      <Chrome frame={frame} />
    </AbsoluteFill>
  );
}

function SceneContent({scene}: {scene: Scene}) {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  if (scene.kind === 'intro') {
    return <IntroScene duration={durationInFrames} frame={frame} />;
  }
  if (scene.kind === 'outro') {
    return <OutroScene duration={durationInFrames} frame={frame} />;
  }
  return <FeatureScene duration={durationInFrames} frame={frame} scene={scene} />;
}
