/*
  Warnings:

  - You are about to drop the column `stripe_current_period_end` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_customer_id` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_price_id` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_subscription_id` on the `UserSubscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lemon_customer_id]` on the table `UserSubscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lemon_subscription_id]` on the table `UserSubscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `UserSubscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planId` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserSubscription_stripe_customer_id_key";

-- DropIndex
DROP INDEX "UserSubscription_stripe_subscription_id_key";

-- AlterTable
ALTER TABLE "UserSubscription" DROP COLUMN "stripe_current_period_end",
DROP COLUMN "stripe_customer_id",
DROP COLUMN "stripe_price_id",
DROP COLUMN "stripe_subscription_id",
ADD COLUMN     "lemon_current_period_end" TIMESTAMP(3),
ADD COLUMN     "lemon_customer_id" TEXT,
ADD COLUMN     "lemon_price_id" TEXT,
ADD COLUMN     "lemon_subscription_id" TEXT,
ADD COLUMN     "orderId" INTEGER NOT NULL,
ADD COLUMN     "planId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "variantId" INTEGER NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "variantName" TEXT NOT NULL,
    "sort" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "interval" TEXT NOT NULL,
    "intervalCount" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebhookEvent" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventName" TEXT NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "body" JSONB NOT NULL,
    "processingError" TEXT,

    CONSTRAINT "WebhookEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plan_variantId_key" ON "Plan"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_lemon_customer_id_key" ON "UserSubscription"("lemon_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_lemon_subscription_id_key" ON "UserSubscription"("lemon_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_orderId_key" ON "UserSubscription"("orderId");

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
