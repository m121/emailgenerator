"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative w-14 h-14  mr-4">
          <Image fill alt="Logo" src="/logo.png" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Email Generator
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/email-generator" : "/sign-up"}>
        <Button >Get Started</Button>
        </Link>
      </div>
    </nav>
  )
}