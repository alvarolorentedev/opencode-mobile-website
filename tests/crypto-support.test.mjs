import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {QRCodeSVG} from 'qrcode.react';

import {copyAddress} from '../src/utils/copyAddress.mjs';

const wallets = JSON.parse(
  await readFile(new URL('../src/data/cryptoDonations.json', import.meta.url), 'utf8'),
);

test('Bitcoin config has the public address and amount-free Bitcoin URI', () => {
  const bitcoin = wallets.find(({symbol}) => symbol === 'BTC');
  assert.ok(bitcoin);
  assert.equal(bitcoin.name, 'Bitcoin');
  assert.equal(bitcoin.address, 'bc1qsp889wm0ehu5xrsq9zv6607qkxzvxgkvxnfsux');
  assert.equal(bitcoin.network, 'Bitcoin');
  assert.equal(bitcoin.paymentUri, `bitcoin:${bitcoin.address}`);
  assert.doesNotMatch(bitcoin.paymentUri, /amount=/i);
});

test('Ethereum config has the public address and amount-free Ethereum URI', () => {
  const ethereum = wallets.find(({symbol}) => symbol === 'ETH');
  assert.ok(ethereum);
  assert.equal(ethereum.name, 'Ethereum');
  assert.equal(ethereum.address, '0x99d784b3844A883030332D690a7A2ef59aaA547e');
  assert.equal(ethereum.network, 'Ethereum');
  assert.equal(ethereum.paymentUri, `ethereum:${ethereum.address}`);
  assert.doesNotMatch(ethereum.paymentUri, /amount=/i);
});

test('QRs render locally from the configured payment URIs', () => {
  for (const wallet of wallets) {
    const markup = renderToStaticMarkup(
      createElement(QRCodeSVG, {
        value: wallet.paymentUri,
        size: 240,
        level: 'M',
        marginSize: 4,
      }),
    );
    assert.match(markup, /^<svg/);
    assert.match(markup, /<path/);
  }
});

test('copyAddress writes the complete wallet address', async () => {
  let copied;
  await copyAddress(wallets[0].address, {
    async writeText(value) {
      copied = value;
    },
  });
  assert.equal(copied, wallets[0].address);
});

test('copyAddress reports an unavailable clipboard', async () => {
  await assert.rejects(copyAddress(wallets[0].address, {}), /Clipboard access/);
});
