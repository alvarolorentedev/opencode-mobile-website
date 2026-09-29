export function copyAddress(
  address: string,
  clipboard?: Pick<Clipboard, 'writeText'>,
): Promise<void>;
