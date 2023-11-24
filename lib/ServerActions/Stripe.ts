'use server'

import { permanentRedirect } from 'next/navigation'
import { sanityFetch } from '../sanity'
import { product } from '@/types'
import { urlFor } from '../sanity'

export default async function pay(product_id: string) {
  const product: product | null = await sanityFetch(`*[_type == "product" && _id == "${product_id}"][0]`)
  if (!product) return
  const { name, description, image } = product
  const imageURL = urlFor(image).url()

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
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
    mode: 'payment',
    success_url: `${process.env.URL}/Result/?success=true`,
    cancel_url: `${process.env.URL}/Result/?canceled=true`,
  })
  permanentRedirect(session.url)
}
