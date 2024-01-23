import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { lemon } from "@/lib/lemon";
import { absoluteUrl } from "@/lib/utils";
// @ts-ignore
import { CreateCheckoutResult } from "lemonsqueezy.ts/dist/types";
import axios from "axios";

const settingsUrl = absoluteUrl("/settings");

export type CreateCheckoutResponse = {
  checkoutURL: string;
};

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    if (userSubscription && userSubscription.lemonCustomerId) {
      const lemonSession = await axios.get(
        `https://api.lemonsqueezy.com/v1/subscriptions/${userSubscription.lemonSubscriptionId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
          },
        }
      );
      return new NextResponse(
        JSON.stringify({
          url: lemonSession.data.data.attributes.urls.customer_portal,
        })
      );
    }

    const variant = (
      await lemon.listAllVariants({
        productId: process.env.LEMONS_SQUEEZY_PRODUCT_ID,
      })
    ).data[0];

    const checkout = (await axios
      .post(
        "https://api.lemonsqueezy.com/v1/checkouts",
        {
          data: {
            type: "checkouts",
            attributes: {
              checkout_data: {
                email: user.emailAddresses[0].emailAddress,
                custom: [userId],
              },
              product_options: {
                redirect_url: settingsUrl,
              },
            },
            relationships: {
              store: {
                data: { type: "stores", id: process.env.LEMONSQUEEZY_STORE_ID },
              },
              variant: { data: { type: "variants", id: variant.id } },
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
          },
        }
      )
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      })) as CreateCheckoutResult;

    return new NextResponse(
      JSON.stringify({ url: checkout.data.data.attributes.url })
    );
  } catch (error) {
    console.log("[LEMON_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
