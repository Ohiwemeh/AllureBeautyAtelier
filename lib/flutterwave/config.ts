export const flutterwaveConfig = {
  publicKey: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY!,
  secretKey: process.env.FLW_SECRET_KEY!,
  encryptionKey: process.env.FLW_ENCRYPTION_KEY!,
  baseUrl: 'https://api.flutterwave.com/v3',
  get appUrl() {
    return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  },
}

export function validateFlutterwaveConfig() {
  const missing: string[] = []
  if (!flutterwaveConfig.publicKey) missing.push('NEXT_PUBLIC_FLW_PUBLIC_KEY')
  if (!flutterwaveConfig.secretKey) missing.push('FLW_SECRET_KEY')
  if (!flutterwaveConfig.encryptionKey) missing.push('FLW_ENCRYPTION_KEY')
  if (missing.length > 0) {
    throw new Error(`Missing Flutterwave config: ${missing.join(', ')}`)
  }
}
