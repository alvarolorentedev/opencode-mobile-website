import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './index.module.css';

const APK_URL =
  'https://github.com/alvarolorentedev/opencode-mobile/releases/latest/download/opencode-mobile.apk';
const PLAY_URL = 'https://play.google.com/store/apps/details?id=app.getopencode';
const GITHUB_URL = 'https://github.com/alvarolorentedev/opencode-mobile';
const OPENCODE_URL = 'https://opencode.ai/';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://getopencode.app/#website',
      url: 'https://getopencode.app/',
      name: 'OpenCode Mobile',
      description:
        'Documentation and downloads for the community-built OpenCode Android app.',
      inLanguage: 'en',
      publisher: {'@id': 'https://getopencode.app/#organization'},
    },
    {
      '@type': 'Organization',
      '@id': 'https://getopencode.app/#organization',
      name: 'OpenCode Mobile',
      url: 'https://getopencode.app/',
      logo: 'https://getopencode.app/img/logo.png',
      founder: {'@id': 'https://getopencode.app/#maintainer'},
      sameAs: [GITHUB_URL],
    },
    {
      '@type': 'Person',
      '@id': 'https://getopencode.app/#maintainer',
      name: 'Alvaro Lorente',
      url: 'https://github.com/alvarolorentedev',
      sameAs: ['https://github.com/alvarolorentedev'],
    },
    {
      '@type': 'MobileApplication',
      '@id': 'https://getopencode.app/#app',
      name: 'OpenCode Mobile',
      description:
        'A community-built Android companion for controlling sessions on an OpenCode server.',
      operatingSystem: 'Android',
      applicationCategory: 'DeveloperApplication',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      downloadUrl: 'https://getopencode.app/download/',
      codeRepository: GITHUB_URL,
      author: {'@id': 'https://getopencode.app/#maintainer'},
    },
  ],
};

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
      'The current release is available for Android through Google Play or as a direct APK. An iOS build is not available at this time.',
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
        href={PLAY_URL}
        target="_blank"
        rel="noopener noreferrer">
        Download From Google Play
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
        <Heading as="h1">OpenCode Mobile for Android.</Heading>
        <p className={styles.heroDescription}>
          Start tasks, check progress, use the terminal, and manage workspaces
          from Android—without reopening your laptop.
        </p>
        <ActionLinks />
        <p className={styles.releaseMeta}>Android release · Google Play · Apache-2.0</p>
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
      <span>Android</span>
      <span>Works with OpenCode server</span>
    </section>
  );
}

function WalkthroughSection() {
  const video = useBaseUrl('media/opencode-mobile-walkthrough.mp4');
  const poster = useBaseUrl('img/product/walkthrough-poster.avif');

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
      <video
        controls
        playsInline
        preload="none"
        width={1280}
        height={720}
        poster={poster}
        className={styles.walkthroughVideo}>
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
      <nav className={styles.topicLinks} aria-label="OpenCode Mobile setup guides">
        <Link to="/docs/opencode-android-app">Android app setup and download</Link>
        <Link to="/docs/guides/use-opencode-from-phone">Use OpenCode from a phone</Link>
        <Link to="/docs/guides/tailscale">Connect with Tailscale</Link>
        <Link to="/docs/guides/cloudflare-tunnel">Connect with Cloudflare Tunnel</Link>
        <Link to="/docs/guides/mobile-vs-web">Compare the app with OpenCode Web</Link>
      </nav>
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

function DownloadSection() {
  return (
    <section className={styles.section} id="download">
      <div className={styles.sectionIntro}>
        <p className={styles.sectionIndex}>05 / Download</p>
        <div>
          <Heading as="h2">Choose how you want to install.</Heading>
          <p>
            Join through Google Play for the easiest updates, or download the
            latest APK directly from GitHub for a manual installation.
          </p>
        </div>
      </div>

      <div className={styles.downloadOptions}>
        <article>
          <span className={styles.downloadLabel}>Recommended</span>
          <Heading as="h3">Google Play</Heading>
          <p>
            Enroll with your Google account, then install and receive
            updates through the Play Store.
          </p>
          <Link
            className={styles.primaryAction}
            href={PLAY_URL}
            target="_blank"
            rel="noopener noreferrer">
            Download From Google Play
          </Link>
        </article>
        <article>
          <span className={styles.downloadLabel}>Direct install</span>
          <Heading as="h3">GitHub APK</Heading>
          <p>
            Download the latest release yourself. Android may ask you to allow
            installation from your browser or file manager.
          </p>
          <Link
            className={styles.secondaryAction}
            href={APK_URL}
            target="_blank"
            rel="noopener noreferrer">
            Download latest APK
          </Link>
        </article>
      </div>

      <div className={styles.downloadGuideLink}>
        <Link to="/download">Compare installation methods and requirements</Link>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className={styles.section} id="faq">
      <div className={styles.sectionIntro}>
        <p className={styles.sectionIndex}>06 / FAQ</p>
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
          Join through Google Play for automatic updates, or visit GitHub
          to inspect the code and help shape what comes next.
        </p>
      </div>
      <ActionLinks compact />
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <Layout
        title="OpenCode Android App"
        description="Use OpenCode from Android to start tasks, monitor sessions, review changes, access files, and run focused terminal commands on your own OpenCode server.">
        <main className={styles.landingPage}>
          <HeroSection />
          <TrustStrip />
          <WalkthroughSection />
          <ProductGallery />
          <SetupSection />
          <FeaturesSection />
          <RelationshipSection />
          <DownloadSection />
          <FaqSection />
          <FinalCtaSection />
        </main>
      </Layout>
    </>
  );
}
