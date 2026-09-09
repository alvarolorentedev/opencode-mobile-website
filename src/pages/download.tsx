import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './download.module.css';

const PLAY_URL = 'https://play.google.com/store/apps/details?id=app.getopencode';
const APK_URL =
  'https://github.com/alvarolorentedev/opencode-mobile/releases/latest/download/opencode-mobile.apk';
const RELEASES_URL =
  'https://github.com/alvarolorentedev/opencode-mobile/releases';

export default function DownloadPage(): ReactNode {
  return (
    <Layout
      title="Download OpenCode Mobile for Android"
      description="Download the OpenCode Android app through Google Play or install the latest OpenCode Mobile APK directly from its public GitHub release.">
      <main className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.kicker}>OpenCode Mobile for Android</p>
          <Heading as="h1">Download OpenCode Mobile for Android.</Heading>
          <p className={styles.lede}>
            Google Play is the recommended way to join and receive
            updates. The latest APK remains available for direct installation.
          </p>
          <div className={styles.actions}>
            <Link
              className={styles.primaryAction}
              href={PLAY_URL}
              target="_blank"
              rel="noopener noreferrer">
              Download From Google Play
            </Link>
            <Link
              className={styles.secondaryAction}
              href={APK_URL}
              target="_blank"
              rel="noopener noreferrer">
              Download latest APK
            </Link>
          </div>
        </header>

        <section className={styles.options} aria-labelledby="install-options">
          <div className={styles.sectionHeading}>
            <span>01</span>
            <div>
              <Heading as="h2" id="install-options">Two supported ways to install</Heading>
              <p>Both options install the same community-built Android companion.</p>
            </div>
          </div>

          <div className={styles.optionGrid}>
            <article>
              <p className={styles.optionLabel}>Recommended</p>
              <Heading as="h3">Google Play</Heading>
              <p className={styles.optionSummary}>
                Best when you want a familiar installation and automatic
                updates through Google Play.
              </p>
              <ol>
                <li>Open the Google Play page with your Google account.</li>
                <li>Install OpenCode Mobile from Google Play.</li>
                <li>Open the app and complete the setup.</li>
              </ol>
              <Link
                className={styles.primaryAction}
                href={PLAY_URL}
                target="_blank"
                rel="noopener noreferrer">
                Download From Google Play
              </Link>
            </article>

            <article>
              <p className={styles.optionLabel}>Manual installation</p>
              <Heading as="h3">Direct APK from GitHub</Heading>
              <p className={styles.optionSummary}>
                Best when Google Play testing is unavailable or you prefer to
                install release files yourself.
              </p>
              <ol>
                <li>Download the latest APK from the project release.</li>
                <li>Allow installs from that source if Android asks.</li>
                <li>Open the APK and confirm the installation.</li>
              </ol>
              <Link
                className={styles.secondaryAction}
                href={APK_URL}
                target="_blank"
                rel="noopener noreferrer">
                Download latest APK
              </Link>
            </article>
          </div>
        </section>

        <section className={styles.requirements} aria-labelledby="requirements">
          <div className={styles.sectionHeading}>
            <span>02</span>
            <div>
              <Heading as="h2" id="requirements">What you need</Heading>
              <p>The app is a client for an OpenCode server you control.</p>
            </div>
          </div>
          <ul>
            <li>An Android device</li>
            <li>A running OpenCode server</li>
            <li>A secure route from your phone to that server</li>
            <li>Your server URL and authentication details</li>
          </ul>
        </section>

        <section className={styles.nextStep}>
          <div>
            <Heading as="h2">Installed? Connect your server next.</Heading>
            <p>
              Follow the onboarding guide to run OpenCode, choose a secure
              connection method, and sign in from Android.
            </p>
          </div>
          <div className={styles.nextLinks}>
            <Link to="/docs/opencode-android-app">Read the Android app setup guide</Link>
            <Link to="/docs/getting-started">Open the setup guide</Link>
            <Link to="/docs/guides/remote-access-security">Review remote-access security</Link>
            <Link href={RELEASES_URL} target="_blank" rel="noopener noreferrer">
              View release notes
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
