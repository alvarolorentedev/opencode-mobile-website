import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './index.module.css';

const APK_URL =
  'https://github.com/alvarolorentedev/opencode-mobile/releases/latest/download/opencode-mobile.apk';
const GITHUB_URL = 'https://github.com/alvarolorentedev/opencode-mobile';
const OPENCODE_URL = 'https://opencode.ai/';

const productScreens = [
  {
    image: 'img/product/task-session.webp',
    alt: 'OpenCode Mobile task screen showing a new coding session, task suggestions, model controls, and workspace navigation',
    label: 'Task control',
    title: 'Start, watch, and redirect',
    description:
      'Send the task, see what OpenCode is doing, answer blocking requests, and review the result.',
  },
  {
    image: 'img/product/voice-mode.webp',
    alt: 'OpenCode Mobile conversation mode listening for a spoken instruction',
    label: 'Voice mode',
    title: 'Give the next instruction naturally',
    description:
      'Speak a follow-up while away from the keyboard, then return to the same session and context.',
  },
  {
    image: 'img/product/session-usage.webp',
    alt: 'OpenCode Mobile session usage screen showing context utilization and model token usage',
    label: 'Usage visibility',
    title: 'Know what the session is using',
    description:
      'Check context utilization, token activity, and the active model without leaving the task.',
  },
];

const featureRows = [
  ['01', 'Start a task', 'Choose the agent and model, send useful context, then follow the work.', '/docs/guides/tasks'],
  ['02', 'Review safely', 'Answer permissions deliberately and inspect every changed file.', '/docs/guides/approvals-and-changes'],
  ['03', 'Reach the project', 'Find a file, make a focused patch, or run a short terminal command.', '/docs/guides/workspace-files'],
  ['04', 'Speak a follow-up', 'Dictate one prompt or use the foreground conversation loop.', '/docs/guides/voice'],
  ['05', 'Understand usage', 'Read context pressure, token activity, steps, and cost estimates.', '/docs/guides/usage'],
];

const faqItems = [
  {
    question: 'Which devices are supported?',
    answer:
      'The current beta is distributed as an Android APK. An iOS build is not available at this time.',
  },
  {
    question: 'Do I need an existing OpenCode setup?',
    answer:
      'Yes. OpenCode Mobile connects to an OpenCode server and works with its sessions and workspaces; it does not replace the server.',
  },
  {
    question: 'How should I expose my OpenCode server?',
    answer:
      'Keep OpenCode bound locally, enable username and password authentication, and use a secure HTTPS tunnel or reverse proxy. The setup guide covers the recommended flow.',
  },
  {
    question: 'Is OpenCode Mobile an official OpenCode product?',
    answer:
      'No. It is an open-source, community-built companion that works with OpenCode. OpenCode and its trademarks belong to their respective owners.',
  },
  {
    question: 'Where can I report a problem or contribute?',
    answer:
      'The source, releases, and issue tracker are public on GitHub. Stars, bug reports, and pull requests all help the project grow.',
  },
];

type ProductScreen = (typeof productScreens)[number];

function ActionLinks({compact = false}: {compact?: boolean}) {
  return (
    <div className={compact ? styles.actionLinksCompact : styles.actionLinks}>
      <Link
        className={styles.primaryAction}
        href={APK_URL}
        target="_blank"
        rel="noopener noreferrer">
        Download Android beta
      </Link>
      <Link
        className={styles.secondaryAction}
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer">
        Star on GitHub
      </Link>
    </div>
  );
}

function HeroSection() {
  const heroImage = useBaseUrl('img/product/task-session.webp');

  return (
    <header className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>Community-built companion for OpenCode</p>
        <Heading as="h1">Your OpenCode sessions, from anywhere.</Heading>
        <p className={styles.heroDescription}>
          Start tasks, check progress, use the terminal, and manage workspaces
          from Android—without reopening your laptop.
        </p>
        <ActionLinks />
        <p className={styles.releaseMeta}>Android APK · Beta · Apache-2.0</p>
      </div>

      <figure className={styles.heroMedia}>
        <div className={styles.mediaHeader}>
          <span>OpenCode Mobile</span>
          <span>Live session control</span>
        </div>
        <img
          src={heroImage}
          width={720}
          height={1616}
          alt="OpenCode Mobile task screen showing a new session, task suggestions, model controls, and workspace navigation"
          className={styles.heroImage}
          loading="eager"
          fetchPriority="high"
        />
        <figcaption>Start, inspect, and redirect real OpenCode work.</figcaption>
      </figure>
    </header>
  );
}

function TrustStrip() {
  return (
    <section className={styles.trustStrip} aria-label="Product facts">
      <span>Community-built</span>
      <span>Open source</span>
      <span>Android beta</span>
      <span>Works with OpenCode server</span>
    </section>
  );
}

function WalkthroughSection() {
  const video = useBaseUrl('media/opencode-mobile-walkthrough.mp4');
  const poster = useBaseUrl('img/product/walkthrough-poster.png');

  return (
    <section className={styles.walkthroughSection} aria-labelledby="walkthrough-title">
      <div>
        <p className={styles.sectionIndex}>60 seconds to understand the app</p>
        <Heading as="h2" id="walkthrough-title">From instruction to inspected result.</Heading>
        <p>
          See three real app screens with simple explanations of what each one
          helps you accomplish.
        </p>
        <Link to="/docs/features">Choose a capability guide</Link>
      </div>
      <video controls playsInline preload="metadata" poster={poster} className={styles.walkthroughVideo}>
        <source src={video} type="video/mp4" />
        Your browser does not support embedded video.
      </video>
    </section>
  );
}

function ProductScreenCard({screen}: {screen: ProductScreen}) {
  const image = useBaseUrl(screen.image);

  return (
    <article className={styles.galleryItem}>
      <div className={styles.galleryCopy}>
        <span>{screen.label}</span>
        <Heading as="h3">{screen.title}</Heading>
        <p>{screen.description}</p>
      </div>
      <div className={styles.screenshotFrame}>
        <img
          src={image}
          width={720}
          height={1616}
          alt={screen.alt}
          loading="lazy"
        />
      </div>
    </article>
  );
}

function ProductGallery() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionIntro}>
        <p className={styles.sectionIndex}>01 / Product</p>
        <div>
          <Heading as="h2" id="product">
            See the work, not just a notification.
          </Heading>
          <p>
            These are the approved app captures, shown at a size where the real
            controls and information hierarchy remain understandable.
          </p>
        </div>
      </div>

      <div className={styles.galleryGrid}>
        {productScreens.map((screen) => (
          <ProductScreenCard screen={screen} key={screen.image} />
        ))}
      </div>
    </section>
  );
}

function SetupSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionIntro}>
        <p className={styles.sectionIndex}>02 / Setup</p>
        <div>
          <Heading as="h2" id="setup">
            Connect in three deliberate steps.
          </Heading>
          <p>
            Your code stays on your machine. The mobile app connects to the
            OpenCode server you control.
          </p>
        </div>
      </div>

      <ol className={styles.setupGrid}>
        <li>
          <span className={styles.stepNumber}>01</span>
          <Heading as="h3">Run OpenCode</Heading>
          <p>Start a headless server on the machine that owns your workspace.</p>
          <code>opencode serve --port 4096</code>
        </li>
        <li>
          <span className={styles.stepNumber}>02</span>
          <Heading as="h3">Expose it securely</Heading>
          <p>Add authentication and route it through an HTTPS tunnel or proxy.</p>
          <code>cloudflared tunnel --url localhost:4096</code>
        </li>
        <li>
          <span className={styles.stepNumber}>03</span>
          <Heading as="h3">Connect Android</Heading>
          <p>Enter the protected server URL, choose a workspace, and continue.</p>
          <Link to="/docs/getting-started">Open the complete setup guide</Link>
        </li>
      </ol>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionIntro}>
        <p className={styles.sectionIndex}>03 / Control surface</p>
        <div>
          <Heading as="h2">The useful parts of your workflow, kept close.</Heading>
          <p>
            Built for quick interventions and honest visibility—not for squeezing
            a desktop IDE onto a smaller screen.
          </p>
        </div>
      </div>

      <div className={styles.featureList}>
        {featureRows.map(([number, title, description, href]) => (
          <article key={number}>
            <span>{number}</span>
            <Heading as="h3">{title}</Heading>
            <div>
              <p>{description}</p>
              <Link to={href}>How to use it</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function RelationshipSection() {
  return (
    <section className={styles.relationshipSection}>
      <div>
        <p className={styles.sectionIndex}>04 / Relationship</p>
        <Heading as="h2">Built for OpenCode. Not a replacement for it.</Heading>
      </div>
      <div>
        <p>
          OpenCode Mobile is an independent, community-built client. It connects
          to the open-source coding agent you already run and keeps that work
          reachable when you step away from your desk.
        </p>
        <Link href={OPENCODE_URL} target="_blank" rel="noopener noreferrer">
          Explore the original OpenCode product
        </Link>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className={styles.section} id="faq">
      <div className={styles.sectionIntro}>
        <p className={styles.sectionIndex}>05 / FAQ</p>
        <div>
          <Heading as="h2">Before you install.</Heading>
          <p>The practical details about platform support, access, and ownership.</p>
        </div>
      </div>

      <div className={styles.faqList}>
        {faqItems.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className={styles.finalCta}>
      <div>
        <p className={styles.sectionIndex}>Ready when your server is.</p>
        <Heading as="h2">Take your next OpenCode session with you.</Heading>
        <p>
          Install the Android beta, or visit GitHub to inspect the code and help
          shape what comes next.
        </p>
      </div>
      <ActionLinks compact />
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Android companion for OpenCode"
      description="OpenCode Mobile is a community-built Android companion for starting tasks, monitoring sessions, using the terminal, and managing OpenCode workspaces remotely.">
      <main className={styles.landingPage}>
        <HeroSection />
        <TrustStrip />
        <WalkthroughSection />
        <ProductGallery />
        <SetupSection />
        <FeaturesSection />
        <RelationshipSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
    </Layout>
  );
}
