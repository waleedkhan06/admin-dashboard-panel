import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export async function GET() {
  try {
   
    const orders = await client.fetch(`
      *[_type == "order"] | order(createdAt desc) {
        _id,
        userName,
        userEmail,
        userPhone,
        car->{
          _id,
          name,
          image
        },
        pickupLocation,
        dropOffLocation,
        rentalDays,
        totalPrice,
        status,
        createdAt
      }
    `)
    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ message: "Error fetching orders" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { orderId, status } = await request.json()
    const updatedOrder = await client.patch(orderId).set({ status }).commit()
    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ message: "Error updating order" }, { status: 500 })
  }
}

