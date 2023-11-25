import Stripe from "stripe";

export async function POST(req: Request) {
  const { email, name } = await req.json();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });
    return Response.json({
      success: true,
      id: customer.id,
      customer,
    });
  } catch (error) {
    console.log(error, "ERROR_CREATE_CUSTOMER");
    return Response.json({
      success: false,
    });
  }
}
