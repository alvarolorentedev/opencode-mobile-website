import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const features = [
  {
    title: 'Run the loop from mobile',
    description:
      'Start, inspect, and steer agent-based coding work without opening a laptop.',
  },
  {
    title: 'Review outputs in context',
    description:
      'Check plans, diffs, logs, and generated results in a phone-friendly workflow.',
  },
  {
    title: 'Track work in progress',
    description:
      'See what an agent is doing now, what changed, and what needs your input next.',
  },
  {
    title: 'Stay connected away from your desk',
    description:
      'Keep momentum during commutes, between meetings, and outside normal desk time.',
  },
  {
    title: 'Built for developers',
    description:
      'This is a workflow surface for coding agents, not a generic chat app with code pasted into it.',
  },
  {
    title: 'Async by default',
    description:
      'Hand work off, come back later, and move projects forward without blocking on a desktop session.',
  },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Connect to your OpenCode workspace',
    description:
      'Point the mobile app at an existing OpenCode setup and pick the workspace that backs the session.',
  },
  {
    step: '02',
    title: 'Kick off or monitor agent work',
    description:
      'Send a task, review progress updates, and keep an eye on work happening in the background.',
  },
  {
    step: '03',
    title: 'Review and respond quickly',
    description:
      'Check outputs, approve the next move, or redirect the task before you are back at your desk.',
  },
];

const useCases = [
  'Commuting: check whether a task finished and tee up the next step before you arrive.',
  'Between meetings: review agent output and leave clear guidance without context switching to desktop.',
  'Incident follow-up: watch progress while a fix is being prepared and stay available for quick decisions.',
  'Task progress checks: confirm that work is moving, inspect blockers, and keep async execution on track.',
  'Async coordination: stay aligned with your workflow even when you are away from the main workstation.',
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>OpenCode Mobile</div>
            <Heading as="h1" className={styles.heroTitle}>
              Your coding agents, from your phone.
            </Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <p className={styles.heroDescription}>
              Review progress, inspect outputs, and manage agent-based coding
              workflows while you are away from your desk. Fast, minimal, and
              built for developers who already work with OpenCode.
            </p>
            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" to="/docs/introduction">
                Read the docs
              </Link>
              <Link className="button button--outline button--lg" to="/docs/getting-started">
                Download status
              </Link>
            </div>
          </div>
          <div className={styles.previewPanel}>
            <div className={styles.previewHeader}>
              <span>Mobile session</span>
              <span>Active workspace</span>
            </div>
            <div className={styles.previewTitle}>opencode-mobile-website</div>
            <div className={styles.previewMeta}>Connected to an OpenCode workflow</div>
            <div className={styles.previewCard}>
              <div className={styles.previewLabel}>Current task</div>
              <p>Implement the feature request and keep me updated as you work.</p>
            </div>
            <div className={styles.previewTimeline}>
              <div>
                <strong>Agent status</strong>
                <span>Reviewing workspace and preparing changes</span>
              </div>
              <div>
                <strong>Recent output</strong>
                <span>3 files changed, docs updated, build ready to verify</span>
              </div>
              <div>
                <strong>Next action</strong>
                <span>Approve, redirect, or leave the task running async</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function FeatureSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>What you can do</div>
          <Heading as="h2">A mobile-first surface for real coding workflows</Heading>
          <p>
            OpenCode Mobile keeps the workflow tight: check what is happening,
            review what changed, and move the work forward.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {features.map((feature) => (
            <article key={feature.title} className={styles.featureCard}>
              <Heading as="h3">{feature.title}</Heading>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section className={styles.sectionAlt}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>How it works</div>
          <Heading as="h2">Stay in the loop without recreating your desktop setup</Heading>
          <p>
            OpenCode Mobile extends the workflows you already use. It is meant
            for monitoring, reviewing, and directing work on the go.
          </p>
        </div>
        <div className={styles.workflowGrid}>
          {workflowSteps.map((item) => (
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

function UseCasesSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.useCaseLayout}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>Use cases</div>
            <Heading as="h2">Designed for the moments when desktop access is inconvenient</Heading>
            <p>
              The goal is not to replace your full development environment. The
              goal is to keep decision-making, visibility, and momentum in your pocket.
            </p>
          </div>
          <div className={styles.useCaseList}>
            {useCases.map((item) => (
              <article key={item} className={styles.useCaseItem}>
                {item}
              </article>
            ))}
          </div>
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
            <div className={styles.sectionLabel}>Coming soon</div>
            <Heading as="h2">Keep OpenCode within reach</Heading>
            <p>
              The first release is focused on a clean mobile workflow for monitoring,
              reviewing, and guiding agent work. Use the docs now, then wire in your
              download and release flow when the app is ready.
            </p>
          </div>
          <Link className="button button--primary button--lg" to="/docs/getting-started">
            Start with the docs
          </Link>
          <Link className="button button--outline button--lg" to="https://github.com/your-org/opencode-mobile">
            View GitHub
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
        <FeatureSection />
        <WorkflowSection />
        <UseCasesSection />
        <FinalCtaSection />
      </main>
    </Layout>
  );
}
