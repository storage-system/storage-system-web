"use client"

import { Button } from "@/components/ui/button";
import { PrivateRoutes } from "@/constants/routes/private-routes";
import { signIn } from "next-auth/react";

export default async function SignInPage() {
  async function handleSignIn() {
    await signIn("google", {
      callbackUrl: PrivateRoutes.HOME
    })
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="shadow-default bg-accent w-[400px] h-[300px] flex flex-col justify-center items-center space-y-4 p-4 rounded-lg">
        <div className="w-full flex flex-col items-center border-b border-[#F4F7FE] dark:border-white/10">
          <h1 className="font-extrabold text-textPrimary dark:text-white text-3xl">
            STOR<span className="font-normal">AGE</span>
          </h1>
        </div>
        <Button onClick={handleSignIn} variant="secondary" className="gap-2 w-full">
          <img className="w-4 h-4" src="./google-icon.png" />
          Fazer login com Google
        </Button>
      </div>
    </div>
  );
}
