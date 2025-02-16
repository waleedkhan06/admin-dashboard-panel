import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

interface Car {
  _id: string
  name: string
  type?: string
  image: SanityImageSource
}

export interface Order {
  _id: string
  car: Car
  userName: string
  userEmail: string
  userPhone: string
  pickupLocation: string
  dropOffLocation: string
  rentalDays: number
  totalPrice: number
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed"
  createdAt: string
  isReimbursed?: boolean
}

