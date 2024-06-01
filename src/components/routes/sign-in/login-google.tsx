"use client"

import { Button } from "@/components/ui/button";
import { PrivateRoutes } from "@/constants/routes/private-routes";
import { signIn } from "next-auth/react";

export function LoginGoogle() {
  async function handleSignIn() {
    await signIn("google", {
      callbackUrl: PrivateRoutes.HOME
    })
  }

  return (
    <Button onClick={handleSignIn} variant="secondary" className="gap-2 w-full bg-gray-200 text-textPrimary dark:text-black">
      <img className="w-4 h-4" src="./google-icon.png" />
      Fazer login com Google
    </Button>
  )
}