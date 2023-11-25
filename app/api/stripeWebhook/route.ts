export async function POST(req: Request) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

  let event = await req.json()
  if (!event) return Response.json('Something went wrong', { status: 500 })

  try {
    const signature = req.headers.get('stripe-signature')
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
    event = stripe.webhooks.constructEvent(event, signature, endpointSecret)
  } catch (err) {
    return Response.json('Something went wrong', { status: 500 })
  }

  // Handle
  if (event.type !== 'payment_intent.succeeded' || 'payment_intent.payment_failed')
    return Response.json('Something went wrong', { status: 500 })

  if (event.type === 'payment_intent.succeeded') handleSuccess
  else if (event.type === 'payment_intent.payment_failed') handleFailure

  return Response.json({ success: true }, { status: 200 })
}

function handleSuccess() {}
function handleFailure() {}
