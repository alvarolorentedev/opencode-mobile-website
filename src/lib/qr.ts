import QRCode from 'qrcode';

export async function qrSvg(value: string): Promise<string> {
  return QRCode.toString(value, {
    type: 'svg',
    margin: 4,
    errorCorrectionLevel: 'M',
    width: 240,
  });
}
