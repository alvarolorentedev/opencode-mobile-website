export async function copyAddress(
  address,
  clipboard = globalThis.navigator?.clipboard,
) {
  if (typeof clipboard?.writeText !== 'function') {
    throw new Error('Clipboard access is unavailable');
  }

  await clipboard.writeText(address);
}
