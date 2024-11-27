"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function MatrixLogin() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        <div className="bg-[#1c2127] rounded-lg p-6 space-y-6">
          <div className="flex items-center">
            <Link href={"/"} className="flex items-center">
              <button className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">Back</span>
              </button>
            </Link>

            <h1 className="text-xl font-semibold text-center flex-1 mr-6">
              Sign in to your account
            </h1>
          </div>

          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              defaultValue="reissfrostmth@gmail.com"
              className="w-full bg-white text-black"
            />

            <Input
              type="password"
              placeholder="Password"
              defaultValue="••••••••••"
              className="w-full bg-white text-black"
            />

            <button className="text-[#6366f1] hover:text-[#818cf8] text-sm">
              Forgot your password?
            </button>
            <div>
              <Link href={"/"}>
                <Button className="w-full bg-[#FDB347] hover:bg-[#E69F35] text-black font-semibold py-6">
                  LOG IN
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <button className="fixed bottom-4 right-4 bg-[#FDB347] hover:bg-[#E69F35] rounded-full p-3 text-black">
          <HelpCircle className="h-6 w-6" />
          <span className="sr-only">Help</span>
        </button>
      </div>
    </div>
  );
}
