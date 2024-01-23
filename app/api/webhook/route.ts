
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Buffer } from "buffer";
import crypto from "crypto";
import prismadb from "@/lib/prismadb"
import { lemon } from "@/lib/lemon"
import rawBody from "raw-body";
import { Readable } from "stream";




export async function POST(req: Request) {
    const body = await rawBody(Readable.from(Buffer.from(await req.text())));
    const headersList = headers();
    const payload = JSON.parse(body.toString());
    const sigString = headersList.get("x-signature");
    const secret = process.env.LEMONS_SQUEEZY_SIGNATURE_SECRET as string;
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
    const signature = Buffer.from(
      Array.isArray(sigString) ? sigString.join("") : sigString || "",
      "utf8"
    );

  
  if (
    parseInt(payload.data.attributes.product_id) !==
    parseInt(process.env.LEMONS_SQUEEZY_PRODUCT_ID as string)
  ) {
    return NextResponse.json({ message: "Invalid product" }, { status: 403 });
  }

  
  if (!crypto.timingSafeEqual(digest, signature)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 403 });
  }

  const userId = payload.meta.custom_data[0];

  
  if (!userId) {
    return NextResponse.json({ message: "No userId provided" }, { status: 403 });
  }




   if (payload.meta.event_name === "subscription_created") {
    const subscription = await lemon.retrieveSubscription({ id: payload.data.id });



    await prismadb.userSubscription.create({
      data: {
        userId: userId,
        lemonSubscriptionId: `${subscription.data?.id}`,
        lemonCustomerId: `${payload.data?.attributes.customer_id}`,
        lemonVariantId: `${subscription.data.attributes.variant_id}`,
        lemonCurrentPeriodEnd: new Date(
            subscription.data?.attributes.renews_at
        ),
        lemonSubscriptionStatus : `${subscription.data.attributes.status}`
      }
    })
  } 

  if (payload.meta.event_name === "subscription_updated") {
    const subscription = await lemon.retrieveSubscription({ id: payload.data.id });
    

    await prismadb.userSubscription.update({
      where: {
        lemonSubscriptionId:`${subscription.data.id}`,
      },
      data: {
        lemonVariantId: `${subscription.data.attributes.variant_id}`,
        lemonCurrentPeriodEnd: new Date(
            subscription.data.attributes.renews_at
        ),
        lemonSubscriptionStatus : `${subscription.data.attributes.status}`
      },
    })
  } 
  if (payload.meta.event_name === "subscription_cancelled") {
    const subscription = await lemon.retrieveSubscription({ id: payload.data.id });
    

    await prismadb.userSubscription.update({
      where: {
        lemonSubscriptionId:`${subscription.data.id}`,
      },
      data: {
        lemonVariantId: `${subscription.data.attributes.variant_id}`,
        lemonCurrentPeriodEnd: new Date(
            subscription.data.attributes.renews_at
        ),
        lemonSubscriptionStatus : `${subscription.data.attributes.status}`
      },
    })
  } 
  if (payload.meta.event_name === "subscription_paused") {
    const subscription = await lemon.retrieveSubscription({ id: payload.data.id });
    

    await prismadb.userSubscription.update({
      where: {
        lemonSubscriptionId:`${subscription.data.id}`,
      },
      data: {
        lemonVariantId: `${subscription.data.attributes.variant_id}`,
        lemonCurrentPeriodEnd: new Date(
            subscription.data.attributes.renews_at
        ),
        lemonSubscriptionStatus : `${subscription.data.attributes.status}`
      },
    })
  } 
  if (payload.meta.event_name === "subscription_resumed") {
    const subscription = await lemon.retrieveSubscription({ id: payload.data.id });
    

    await prismadb.userSubscription.update({
      where: {
        lemonSubscriptionId:`${subscription.data.id}`,
      },
      data: {
        lemonVariantId: `${subscription.data.attributes.variant_id}`,
        lemonCurrentPeriodEnd: new Date(
            subscription.data.attributes.renews_at
        ),
        lemonSubscriptionStatus : `${subscription.data.attributes.status}`
      },
    })
  } 
  if (payload.meta.event_name === "subscription_unpaused") {
    const subscription = await lemon.retrieveSubscription({ id: payload.data.id });
    

    await prismadb.userSubscription.update({
      where: {
        lemonSubscriptionId:`${subscription.data.id}`,
      },
      data: {
        lemonVariantId: `${subscription.data.attributes.variant_id}`,
        lemonCurrentPeriodEnd: new Date(
            subscription.data.attributes.renews_at
        ),
        lemonSubscriptionStatus : `${subscription.data.attributes.status}`
      },
    })
  } 
  if (payload.meta.event_name === "subscription_expired") {
    const subscription = await lemon.retrieveSubscription({ id: payload.data.id });
    
    await prismadb.userSubscription.update({
      where: {
        lemonSubscriptionId:`${subscription.data.id}`,
      },
      data: {
        lemonVariantId: `${subscription.data.attributes.variant_id}`,
        lemonCurrentPeriodEnd: new Date(
            subscription.data.attributes.renews_at
        ),
        lemonSubscriptionStatus : `${subscription.data.attributes.status}`
      },
    })

 
  } 

  return new NextResponse(null, { status: 200 })
};