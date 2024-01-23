import { Settings } from "lucide-react";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function SettingsPage() {
  const isPro = await checkSubscription();

  return ( 
    <div>
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          
        </div>
       
      </div>
      <main className="p-6 flex flex-col gap-8">
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Current Plan</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <div className="font-medium">{isPro ? "Pro plan." : "Free plan."}</div>
            <ul className="list-disc list-inside space-y-1">
              <li>Total messages: 1500</li>
              <li>24/7 customer support</li>
              <li>Free updates and upgrades</li>
            </ul>
            <div className="mt-2 font-medium">
              Subscription Cost: <span className="text-green-600">$5/month</span>
            </div>
            <div className="mt-2 font-medium">
            <SubscriptionButton isPro={isPro} />
            </div>

          </CardContent>
        </Card>
     
      </main>

    </div>
   );
}
 

