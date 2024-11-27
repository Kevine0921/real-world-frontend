"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "../../../public/icon.jpg";

export default function MatrixLogin() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const chars = "01";
    const drops: number[] = new Array(columns).fill(0);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-black text-white">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-50"
      />

      <div className="relative z-10 flex flex-col items-center space-y-8">
        <div className="w-32 h-32 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-300 to-gray-100">
            <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
              <Image src={Logo} className="object-contain" alt="signin" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-wider">THE REAL WORLD</h1>

        <div className="flex flex-col items-center space-y-4 w-full max-w-sm px-4">
          <Link href={"/public_pages/signup"}>
            <p className="text-gray-400">I don&apos;t have an account</p>
          </Link>

          <Link href={"/public_pages/signin"} className="w-full">
            <Button className="w-full bg-[#FDB347] hover:bg-[#E69F35] text-black font-semibold py-6">
              LOG IN
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
