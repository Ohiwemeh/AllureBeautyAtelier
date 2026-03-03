export interface ShippingAddress {
  fullName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface BillingAddress extends ShippingAddress {}

export interface CheckoutFormData {
  shipping: ShippingAddress
  billing: BillingAddress
  sameAsShipping: boolean
}

export interface OrderSummary {
  subtotal: number
  tax: number
  shipping: number
  total: number
}
