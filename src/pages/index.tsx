import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './index.module.css';

const howSteps = [
  {
    step: '01',
    title: 'Connect',
    description: 'Point the app at your OpenCode server and select a workspace.',
  },
  {
    step: '02',
    title: 'Inspect',
    description: 'See task state, plans, diffs, and logs in a compact view.',
  },
  {
    step: '03',
    title: 'Act',
    description: 'Approve, rerun, or append instructions and let agents continue asynchronously.',
  },
];

const useCases = [
  'Incident triage — follow logs and authorize a fix while away from your desk.',
  'PR gating — review a generated diff and confirm or revert a change from your phone.',
  'Async handoff — leave precise next steps so agents continue while you switch contexts.',
  'Progress checks — validate task completion and queue the next job between meetings.',
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <Heading as="h1" className={styles.heroTitle}>
              Take control of agent work from your phone
            </Heading>
            <p className={styles.heroSubtitle}>
              Inspect running tasks, approve or redirect changes, and keep
              progress moving without opening a laptop.
            </p>
            <div className={styles.heroActions}>
              <Link
                className="button button--primary button--lg"
                href="https://github.com/alvarolorentedev/opencode-mobile/releases/download/v1.0.0-beta/opencode-mobile.apk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download APK (beta)
              </Link>
              <Link className="button button--outline button--lg" to="/docs/introduction">
                Read the docs
              </Link>
            </div>
          </div>

          <div className={styles.heroImageWrap}>
            {/* Right-side hero image: use the static/img path so Docusaurus serves it correctly */}
            <img
              src={useBaseUrl('img/hero.png')}
              alt="OpenCode mobile screenshot"
              className={styles.heroScreenshot}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function ProblemSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Why it exists</div>
          <Heading as="h2">Laptops block fast decisions</Heading>
          <p>
            Agent workflows produce plans, diffs, and logs that need context-aware
            approvals or small nudges. If you must open a desktop to act, work stalls.
          </p>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className={styles.sectionAlt}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>How it works</div>
          <Heading as="h2">Three steps to stay in the loop</Heading>
          <p>Connect, inspect, and act — then let agents continue asynchronously.</p>
        </div>
        <div className={styles.workflowGrid}>
          {howSteps.map((item) => (
            <article key={item.step} className={styles.workflowCard}>
              <div className={styles.stepNumber}>{item.step}</div>
              <Heading as="h3">{item.title}</Heading>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DifferentiatorSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Single idea</div>
          <Heading as="h2">Workspace-aware control, not chat with code</Heading>
          <p>
            The app exposes the workspace, task state, and generated artifacts so your
            actions apply to the same context agents use. Approve, retry, or attach
            files — no detached prompts or pasted snippets.
          </p>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Use cases</div>
          <Heading as="h2">Built for quick, developer decisions</Heading>
          <p />
        </div>
        <div className={styles.useCaseList}>
          {useCases.map((item) => (
            <article key={item} className={styles.useCaseItem}>
              {item}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className={styles.sectionAlt}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Integrations</div>
          <Heading as="h2">Runs with your OpenCode setup</Heading>
          <p>
            Works with self-hosted OpenCode and standard tunnels (Cloudflare, SSH).
            Workspace scoping and authentication keep access explicit. Code and
            releases on GitHub; quick-start docs cover secure exposure.
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className={styles.finalCtaSection}>
      <div className="container">
        <div className={styles.finalCtaCard}>
          <div>
            <div className={styles.sectionLabel}>Get started</div>
            <Heading as="h2">Try the beta or follow the quick start</Heading>
            <p>
              Install the APK and point it at an existing OpenCode server, or read
              the quick-start to set up secure remote access.
            </p>
          </div>
          <Link
            className="button button--primary button--lg"
            href="https://github.com/alvarolorentedev/opencode-mobile/releases/download/v1.0.0-beta/opencode-mobile.apk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download APK (beta)
          </Link>
          <Link className="button button--outline button--lg" to="/docs/getting-started">
            Quick start / Docs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="OpenCode Mobile is a developer-first mobile interface for reviewing, monitoring, and managing coding agent workflows on the go.">
      <HomepageHeader />
      <main>
        <ProblemSection />
        <HowItWorksSection />
        <DifferentiatorSection />
        <UseCasesSection />
        <TrustSection />
        <FinalCtaSection />
      </main>
    </Layout>
  );
}
