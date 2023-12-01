'use server'

import { redirect } from 'next/navigation'
import { sanityFetch } from '../sanity'
import { product } from '@/types'
import { urlFor } from '../sanity'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function pay(product_id: string) {
  const userSession = await getServerSession(authOptions)
  if (!userSession?.user?.email) return redirect('/api/auth/signin')

  const product: product | null = await sanityFetch(`*[_type == "product" && _id == "${product_id}"][0]`)
  if (!product) return
  const { name, description, image } = product
  const imageURL = urlFor(image).url()

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: product.price * 100,
          product_data: { name, description, images: [imageURL] },
        },
        quantity: 1,
      },
    ],
    customer_email: userSession.user.email,
    mode: 'payment',
    success_url: `${process.env.URL}/Success`,
    cancel_url: `${process.env.URL}`,
  })
  redirect(session.url)
}
