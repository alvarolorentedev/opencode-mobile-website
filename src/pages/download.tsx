import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './download.module.css';

const PLAY_URL = 'https://play.google.com/store/apps/details?id=app.getopencode';
const APK_URL =
  'https://github.com/alvarolorentedev/opencode-mobile/releases/latest/download/opencode-mobile.apk';
const TESTFLIGHT_URL = 'https://testflight.apple.com/';
const RELEASES_URL =
  'https://github.com/alvarolorentedev/opencode-mobile/releases';

export default function DownloadPage(): ReactNode {
  return (
    <Layout
      title="Download OpenCode Mobile for Android and iOS"
      description="Download OpenCode Mobile through Google Play or GitHub on Android, or join the iOS beta through TestFlight.">
      <main className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.kicker}>OpenCode Mobile for Android and iOS</p>
          <Heading as="h1">Download OpenCode Mobile.</Heading>
          <p className={styles.lede}>
            Install on Android through Google Play or a direct APK, or join the
            iOS beta through TestFlight.
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
            <Link
              className={styles.secondaryAction}
              href={TESTFLIGHT_URL}
              target="_blank"
              rel="noopener noreferrer">
              Join iOS TestFlight
            </Link>
          </div>
        </header>

        <section className={styles.options} aria-labelledby="install-options">
          <div className={styles.sectionHeading}>
            <span>01</span>
            <div>
              <Heading as="h2" id="install-options">Three ways to install</Heading>
              <p>Choose the Android release path or join the iOS beta.</p>
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
              <p className={styles.optionLabel}>iOS beta</p>
              <Heading as="h3">TestFlight</Heading>
              <p className={styles.optionSummary}>
                Best when you use an iPhone or iPad and want to receive the
                current beta build and its updates.
              </p>
              <ol>
                <li>Install TestFlight from the App Store if needed.</li>
                <li>Open the OpenCode Mobile TestFlight release.</li>
                <li>Install the beta and complete the same server setup.</li>
              </ol>
              <Link
                className={styles.secondaryAction}
                href={TESTFLIGHT_URL}
                target="_blank"
                rel="noopener noreferrer">
                Join iOS TestFlight
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
            <li>An Android device or iPhone/iPad</li>
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
              connection method, and sign in from the app.
            </p>
          </div>
          <div className={styles.nextLinks}>
            <Link to="/docs/opencode-android-app">Read the mobile app setup guide</Link>
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
