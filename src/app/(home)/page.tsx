"use client";

import Image from "next/image";
import { Categories } from "./components/categories";

export default function Home() {
  return (
    <div className="p-5">
      <Image
        src="/banner-home-01.png"
        height={0}
        width={0}
        className="h-auto w-full"
        sizes="100vw"
        alt="até 55% desconto esse mês "
      />
      <Categories />
    </div>
  );
}
