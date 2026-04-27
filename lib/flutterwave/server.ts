import { flutterwaveConfig, validateFlutterwaveConfig } from './config'

interface InitializePaymentParams {
  tx_ref: string
  amount: number
  currency: string
  customer: {
    email: string
    name: string
    phone_number?: string
  }
  customizations: {
    title: string
    description: string
    logo?: string
  }
  redirect_url: string
  meta?: Record<string, unknown>
}

interface FlutterwaveResponse {
  status: string
  message: string
  data?: {
    link?: string
    id?: number
    tx_ref?: string
    amount?: number
    currency?: string
    status?: string
    [key: string]: unknown
  }
}

export async function initializePayment(
  params: InitializePaymentParams
): Promise<FlutterwaveResponse> {
  validateFlutterwaveConfig()

  const response = await fetch(`${flutterwaveConfig.baseUrl}/payments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${flutterwaveConfig.secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to initialize payment')
  }

  return data
}

export async function verifyPayment(
  transactionId: string
): Promise<FlutterwaveResponse> {
  validateFlutterwaveConfig()

  const response = await fetch(
    `${flutterwaveConfig.baseUrl}/transactions/${transactionId}/verify`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${flutterwaveConfig.secretKey}`,
        'Content-Type': 'application/json',
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to verify payment')
  }

  return data
}
