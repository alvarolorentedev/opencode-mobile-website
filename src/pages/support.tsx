import {useEffect, useState, type ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {QRCodeSVG} from 'qrcode.react';

import cryptoDonations from '../data/cryptoDonations.json';
import {copyAddress} from '../utils/copyAddress.mjs';
import styles from './support.module.css';

type SupportLinks = {
  githubSponsorsUrl: string | null;
  kofiUrl: string | null;
  kofiEmbedUrl: string | null;
};

type CryptoDonation = (typeof cryptoDonations)[number];

function trackEvent(name: string, parameters?: Record<string, string>) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, parameters);
  }
}

function CryptoIcon({symbol}: {symbol: string}): ReactNode {
  if (symbol === 'BTC') {
    return (
      <svg className={styles.bitcoinIcon} viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="23" />
        <text x="24" y="33" textAnchor="middle">₿</text>
      </svg>
    );
  }

  return (
    <svg className={styles.ethereumIcon} viewBox="0 0 48 48" aria-hidden="true">
      <path d="m24 1 15 24-15 9L9 25 24 1Z" />
      <path d="m24 37 15-9-15 19L9 28l15 9Z" />
    </svg>
  );
}

function CryptoDonationCard({wallet}: {wallet: CryptoDonation}): ReactNode {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  async function handleCopy() {
    try {
      await copyAddress(wallet.address);
      setCopyState('copied');
      trackEvent('crypto_address_copy', {asset: wallet.symbol});
    } catch {
      setCopyState('failed');
    }
  }

  return (
    <article className={`${styles.cryptoCard} ${styles[wallet.symbol.toLowerCase()]}`}>
      <header className={styles.cryptoHeader}>
        <CryptoIcon symbol={wallet.symbol} />
        <div>
          <Heading as="h3">{wallet.name}</Heading>
          <span className={styles.symbol}>{wallet.symbol}</span>
        </div>
      </header>

      <div className={styles.qrFrame}>
        <QRCodeSVG
          value={wallet.paymentUri}
          size={240}
          level="M"
          marginSize={4}
          title={`${wallet.name} donation QR code`}
        />
      </div>

      <p className={styles.network}>{wallet.network} network only</p>
      <code className={styles.address}>{wallet.address}</code>
      <button className={styles.copyButton} type="button" onClick={handleCopy}>
        {copyState === 'copied'
          ? 'Copied'
          : copyState === 'failed'
            ? 'Copy failed'
            : 'Copy address'}
      </button>
      <span className={styles.copyStatus} role="status" aria-live="polite">
        {copyState === 'copied'
          ? `${wallet.symbol} address copied.`
          : copyState === 'failed'
            ? 'Clipboard access failed. Please try again.'
            : ''}
      </span>
    </article>
  );
}

export default function SupportPage(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const {githubSponsorsUrl, kofiUrl, kofiEmbedUrl} =
    siteConfig.customFields as SupportLinks;

  useEffect(() => {
    trackEvent('crypto_support_view');
  }, []);

  return (
    <Layout
      title="Support OpenCode Mobile"
      description="Support the development of OpenCode Mobile through GitHub Sponsors, Ko-fi, or direct cryptocurrency donations.">
      <main className={styles.page}>
        <header className={styles.intro}>
          <p className={styles.kicker}>Community supported</p>
          <Heading as="h1">Support OpenCode Mobile.</Heading>
          <p>
            OpenCode Mobile is independently maintained, free, and open source.
            Your support helps sustain ongoing development and maintenance.
          </p>
        </header>

        <section className={styles.primaryOptions} aria-label="Easy ways to support">
          <article className={styles.primaryCard}>
            <p className={styles.label}>Direct support</p>
            <Heading as="h2">GitHub Sponsors</Heading>
            <p>
              Help fund development, maintenance, Android and iOS releases,
              testing, infrastructure, and related project costs.
            </p>
            {githubSponsorsUrl ? (
              <a
                className={styles.primaryAction}
                href={githubSponsorsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('support_github_sponsor_click')}>
                Sponsor on GitHub
              </a>
            ) : (
              <p className={styles.unavailable}>GitHub Sponsors link unavailable.</p>
            )}
          </article>

          <article className={styles.primaryCard}>
            <p className={styles.label}>One-time or recurring</p>
            <Heading as="h2">Ko-fi</Heading>
            <p>Support the project through Ko-fi.</p>
            {kofiUrl && kofiEmbedUrl ? (
              <>
                <iframe
                  className={styles.kofiPanel}
                  title="Ko-fi tip panel for OpenCode Mobile"
                  src={kofiEmbedUrl}
                  loading="lazy"
                />
                
              </>
            ) : (
              <p className={styles.unavailable}>Ko-fi link unavailable.</p>
            )}
          </article>
        </section>

        <section className={styles.cryptoSection} id="crypto" aria-labelledby="crypto-title">
          <div className={styles.cryptoIntro}>
            <p className={styles.sectionIndex}>Alternative support</p>
            <Heading as="h2" id="crypto-title">Support with crypto</Heading>
            <p>Prefer a direct donation? Choose the asset and network carefully.</p>
          </div>

          <div className={styles.cryptoGrid}>
            {cryptoDonations.map((wallet) => (
              <CryptoDonationCard key={wallet.symbol} wallet={wallet} />
            ))}
          </div>

          <p className={styles.irreversibleWarning}>
            Crypto transactions are irreversible. Please verify the network and
            wallet address before sending.
          </p>
        </section>
      </main>
    </Layout>
  );
}
