import type {CSSProperties, ReactNode} from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
} from 'remotion';

const colors = {
  background: '#131111',
  surface: '#191717',
  raised: '#201d1d',
  border: '#393434',
  text: '#f2eded',
  muted: '#aaa3a3',
  soft: '#777070',
  mint: '#78e5c1',
  mintDark: '#10291f',
  danger: '#ff8a86',
};

const mono: CSSProperties = {
  fontFamily: 'IBM Plex Mono, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
};

function TinyIcon({children, active = false}: {children: ReactNode; active?: boolean}) {
  return (
    <span
      style={{
        display: 'grid',
        width: 36,
        height: 36,
        placeItems: 'center',
        border: `1px solid ${active ? colors.mint : colors.border}`,
        borderRadius: 4,
        color: active ? colors.mint : colors.muted,
        fontSize: 16,
      }}>
      {children}
    </span>
  );
}

function Phone({children}: {children: ReactNode}) {
  return (
    <div
      style={{
        width: 370,
        height: 650,
        overflow: 'hidden',
        border: `1px solid ${colors.border}`,
        borderRadius: 28,
        background: '#0e1714',
        boxShadow: '0 32px 90px rgba(0,0,0,.34)',
        color: colors.text,
        ...mono,
      }}>
      <div
        style={{
          display: 'flex',
          height: 30,
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 18px',
          color: colors.muted,
          fontSize: 10,
        }}>
        <span>09:41</span>
        <span>● ●●  82%</span>
      </div>
      {children}
    </div>
  );
}

function BottomNav({active}: {active: 'chat' | 'terminal' | 'workspace' | 'settings'}) {
  return (
    <div
      style={{
        display: 'grid',
        height: 62,
        gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: `1px solid ${colors.border}`,
        background: '#111b18',
      }}>
      {(['chat', 'terminal', 'workspace', 'settings'] as const).map((item) => (
        <div
          key={item}
          style={{
            display: 'grid',
            placeItems: 'center',
            color: item === active ? colors.mint : colors.soft,
            fontSize: 10,
            textTransform: 'capitalize',
          }}>
          <span style={{fontSize: 17}}>{item === 'chat' ? '▤' : item === 'terminal' ? '>_' : item === 'workspace' ? '□' : '⚙'}</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function ChatPhone({animated = false}: {animated?: boolean}) {
  const frame = useCurrentFrame();
  const progress = animated
    ? interpolate(frame, [18, 84], [0.14, 0.72], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      })
    : 0.72;
  const replyOpacity = animated
    ? interpolate(frame, [52, 72], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : 1;

  return (
    <Phone>
      <div style={{display: 'flex', height: 58, alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', borderBottom: `1px solid ${colors.border}`}}>
        <div>
          <div style={{fontSize: 14, fontWeight: 700}}>Improve onboarding</div>
          <div style={{marginTop: 5, color: colors.muted, fontSize: 9}}>Working · 3 files changed</div>
        </div>
        <div style={{display: 'flex', gap: 8}}><TinyIcon>+</TinyIcon><TinyIcon active>◉</TinyIcon></div>
      </div>
      <div style={{display: 'grid', height: 38, gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${colors.border}`, fontSize: 11}}>
        <div style={{display: 'grid', placeItems: 'center', borderBottom: `2px solid ${colors.mint}`}}>Session</div>
        <div style={{display: 'grid', placeItems: 'center', color: colors.muted}}>3 Files Changed</div>
      </div>
      <div style={{height: 434, padding: 16, boxSizing: 'border-box'}}>
        <div style={{border: `1px solid ${colors.border}`, borderRadius: 6, padding: 15, background: colors.surface}}>
          <div style={{color: colors.mint, fontSize: 10}}>YOU · NOW</div>
          <div style={{marginTop: 9, fontSize: 13, lineHeight: 1.5}}>Make the onboarding clearer and verify the docs build.</div>
        </div>
        <div style={{marginTop: 14, padding: 15, borderLeft: `2px solid ${colors.mint}`, background: colors.raised, opacity: replyOpacity}}>
          <div style={{fontSize: 12, fontWeight: 700}}>OpenCode is updating the guide</div>
          <div style={{marginTop: 9, color: colors.muted, fontSize: 10, lineHeight: 1.55}}>Reviewed navigation · Added user workflows · Running validation</div>
          <div style={{height: 5, marginTop: 15, overflow: 'hidden', background: colors.border}}>
            <div style={{width: `${progress * 100}%`, height: '100%', background: colors.mint}} />
          </div>
        </div>
        <div style={{display: 'flex', gap: 8, marginTop: 14}}>
          <span style={{padding: '7px 9px', border: `1px solid ${colors.border}`, color: colors.muted, fontSize: 9}}>3 files</span>
          <span style={{padding: '7px 9px', border: `1px solid ${colors.border}`, color: colors.muted, fontSize: 9}}>2.4k tokens</span>
          <span style={{padding: '7px 9px', border: `1px solid ${colors.border}`, color: colors.mint, fontSize: 9}}>live</span>
        </div>
      </div>
      <div style={{height: 66, padding: '9px 14px', boxSizing: 'border-box', borderTop: `1px solid ${colors.border}`}}>
        <div style={{display: 'flex', height: 45, alignItems: 'center', justifyContent: 'space-between', padding: '0 13px', border: `1px solid ${colors.border}`, borderRadius: 5, color: colors.soft, fontSize: 11}}>
          <span>Ask a follow-up…</span><span style={{color: colors.mint}}>Send</span>
        </div>
      </div>
      <BottomNav active="chat" />
    </Phone>
  );
}

function WorkspacePhone() {
  return (
    <Phone>
      <div style={{display: 'flex', height: 58, alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', borderBottom: `1px solid ${colors.border}`}}>
        <div><div style={{fontSize: 14, fontWeight: 700}}>sample-project</div><div style={{marginTop: 5, color: colors.muted, fontSize: 9}}>main · 3 changed files</div></div>
        <TinyIcon>↻</TinyIcon>
      </div>
      <div style={{display: 'grid', margin: 14, gridTemplateColumns: 'repeat(3,1fr)', border: `1px solid ${colors.border}`, fontSize: 10}}>
        {['Chats', 'Files', 'Tools'].map((item) => <div key={item} style={{padding: 10, textAlign: 'center', color: item === 'Files' ? colors.mint : colors.muted, background: item === 'Files' ? colors.mintDark : 'transparent'}}>{item}</div>)}
      </div>
      <div style={{height: 458, padding: '4px 16px 16px', boxSizing: 'border-box'}}>
        <div style={{fontSize: 18}}>Workspace files</div>
        <div style={{marginTop: 5, color: colors.muted, fontSize: 10}}>Search, inspect, and make a focused patch.</div>
        <div style={{display: 'flex', gap: 8, marginTop: 16}}>
          <div style={{flex: 1, padding: 10, border: `1px solid ${colors.border}`, color: colors.soft, fontSize: 10}}>Search files</div>
          <div style={{padding: 10, background: colors.mint, color: '#0c1713', fontSize: 10}}>Search</div>
        </div>
        <div style={{marginTop: 16, border: `1px solid ${colors.border}`, background: colors.surface}}>
          {['docs/getting-started.md', 'docs/user-manual.md', 'src/pages/index.tsx'].map((file, index) => (
            <div key={file} style={{display: 'flex', justifyContent: 'space-between', padding: 14, borderTop: index ? `1px solid ${colors.border}` : 'none', fontSize: 10}}><span>{file}</span><span style={{color: index < 2 ? colors.mint : colors.muted}}>{index < 2 ? 'modified' : 'open'}</span></div>
          ))}
        </div>
        <div style={{marginTop: 16, padding: 14, borderLeft: `2px solid ${colors.mint}`, background: colors.raised}}>
          <div style={{fontSize: 11, fontWeight: 700}}>Conflict-safe editing</div>
          <div style={{marginTop: 7, color: colors.muted, fontSize: 9, lineHeight: 1.5}}>The server copy is checked again before a patch is saved.</div>
        </div>
      </div>
      <BottomNav active="workspace" />
    </Phone>
  );
}

function ConnectionPhone() {
  return (
    <Phone>
      <div style={{display: 'flex', height: 58, alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', borderBottom: `1px solid ${colors.border}`}}>
        <div><div style={{fontSize: 14, fontWeight: 700}}>Settings</div><div style={{marginTop: 5, color: colors.muted, fontSize: 9}}>Connected to OpenCode</div></div>
        <TinyIcon>↻</TinyIcon>
      </div>
      <div style={{height: 520, padding: 16, boxSizing: 'border-box'}}>
        <div style={{padding: 16, border: `1px solid ${colors.border}`, background: colors.surface}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, color: colors.mint, fontSize: 12}}><span>●</span><strong>Connected</strong></div>
          <div style={{marginTop: 8, color: colors.muted, fontSize: 9}}>Private HTTPS endpoint · checked now</div>
        </div>
        {[
          ['Connection', 'Authenticated server access'],
          ['AI & providers', '2 configured · models enabled'],
          ['Notifications', 'Task completion enabled'],
          ['Voice & responses', 'On-device recognition preferred'],
          ['Advanced', 'MCP and diagnostics'],
        ].map(([title, description], index) => (
          <div key={title} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 3px', borderBottom: `1px solid ${colors.border}`}}>
            <div><div style={{fontSize: 11, color: index === 0 ? colors.mint : colors.text}}>{title}</div><div style={{marginTop: 5, color: colors.muted, fontSize: 8}}>{description}</div></div>
            <span style={{color: colors.soft}}>›</span>
          </div>
        ))}
        <div style={{marginTop: 16, padding: 13, border: `1px solid ${colors.border}`, color: colors.muted, fontSize: 9, lineHeight: 1.55}}>Use Tailscale, Cloudflare Tunnel, a trusted LAN, reverse proxy, or SSH forwarding.</div>
      </div>
      <BottomNav active="settings" />
    </Phone>
  );
}

type SceneProps = {
  eyebrow: string;
  headline: string;
  description: string;
  visual: ReactNode;
  progress: string;
  animated?: boolean;
};

function Scene({eyebrow, headline, description, visual, progress, animated = false}: SceneProps) {
  const frame = useCurrentFrame();
  const opacity = animated
    ? interpolate(frame, [0, 15, 98, 118], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : 1;
  const translate = animated
    ? interpolate(frame, [0, 22], [34, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)})
    : 0;

  return (
    <AbsoluteFill style={{background: colors.background, color: colors.text, ...mono}}>
      <div style={{position: 'absolute', inset: 28, border: `1px solid ${colors.border}`}} />
      <div style={{position: 'absolute', top: 28, bottom: 28, left: 638, width: 1, background: colors.border}} />
      <div style={{display: 'grid', height: '100%', gridTemplateColumns: '1fr 1fr', alignItems: 'center', padding: '52px 76px', boxSizing: 'border-box', opacity}}>
        <div style={{paddingRight: 70, translate: `0 ${translate}px`}}>
          <div style={{color: colors.mint, fontSize: 17, letterSpacing: 2.1, textTransform: 'uppercase'}}>{eyebrow}</div>
          <h1 style={{margin: '30px 0 0', color: colors.text, fontSize: 64, lineHeight: 1.03, letterSpacing: -3.5}}>{headline}</h1>
          <p style={{maxWidth: 480, margin: '28px 0 0', color: colors.muted, fontSize: 23, lineHeight: 1.55}}>{description}</p>
          <div style={{display: 'flex', gap: 10, marginTop: 42}}>
            {['Android', 'Open source', 'Your server'].map((item) => <span key={item} style={{padding: '10px 12px', border: `1px solid ${colors.border}`, color: colors.muted, fontSize: 13}}>{item}</span>)}
          </div>
          <div style={{marginTop: 50, color: colors.soft, fontSize: 14}}>{progress}</div>
        </div>
        <div style={{display: 'grid', placeItems: 'center', translate: `0 ${-translate * 0.35}px`}}>{visual}</div>
      </div>
    </AbsoluteFill>
  );
}

export function ProductWalkthrough() {
  return (
    <AbsoluteFill style={{background: colors.background}}>
      <Sequence durationInFrames={120}><Scene animated eyebrow="01 · Sessions" headline="Start the work." description="Choose the agent and model, send a task, and follow real OpenCode progress from Android." visual={<ChatPhone animated />} progress="01 / 03" /></Sequence>
      <Sequence from={120} durationInFrames={120}><Scene animated eyebrow="02 · Workspace" headline="Review the result." description="Inspect sessions, changed files, focused patches, worktrees, and project context without opening an IDE." visual={<WorkspacePhone />} progress="02 / 03" /></Sequence>
      <Sequence from={240} durationInFrames={120}><Scene animated eyebrow="03 · Connection" headline="Keep control." description="Connect through the private route you choose, then manage providers, voice, notifications, MCP, and health." visual={<ConnectionPhone />} progress="03 / 03" /></Sequence>
    </AbsoluteFill>
  );
}

export const ChatControlStill = () => <Scene eyebrow="Session control" headline="Start. Watch. Redirect." description="Send focused tasks, follow progress, answer blocking requests, and review the resulting changes." visual={<ChatPhone />} progress="Chat · approvals · usage" />;
export const WorkspaceStill = () => <Scene eyebrow="Workspace tools" headline="The project stays close." description="Move between chats, inspect files, make a small conflict-safe patch, or open a project terminal." visual={<WorkspacePhone />} progress="Sessions · files · terminal · worktrees" />;
export const ConnectionStill = () => <Scene eyebrow="Your infrastructure" headline="Connect your way." description="Use an authenticated LAN, Tailscale, Cloudflare Tunnel, reverse proxy, or SSH forwarding." visual={<ConnectionPhone />} progress="Private by design · server controlled" />;
