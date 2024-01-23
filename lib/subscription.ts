import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";


//One day grace period
const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      lemonSubscriptionId: true,
      lemonCurrentPeriodEnd: true,
      lemonCustomerId: true,
      lemonVariantId: true,
      lemonSubscriptionStatus : true
    },
  })

  if (!userSubscription) {
    return false;
  }

  if(userSubscription.lemonSubscriptionStatus === 'expired'){
    return false;
  }
  if(userSubscription.lemonSubscriptionStatus === 'paused'){
    return false;
  }

  

  const isValid =
    userSubscription.lemonVariantId &&
    userSubscription.lemonCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return !!isValid;
};