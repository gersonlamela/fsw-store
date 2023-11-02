import Image from "next/image";

import { prismaClient } from "@/lib/prisma";
import { PromoBanner } from "./components/PromoBanner";

import { ProductList } from "@/components/ui/ProductList";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Categories from "./components/categories";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });
  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });
  return (
    <div className="flex flex-col gap-8 py-8">
      <PromoBanner src="/banner-home-01.png" alt="até 55% desconto esse mês " />
      <div className="mx-auto max-w-screen-size px-5">
        <Categories />
      </div>

      <div>
        <div className="mx-auto max-w-screen-size">
          <SectionTitle>Ofertas</SectionTitle>
          <ProductList products={deals} />
        </div>
      </div>

      <PromoBanner
        src="/banner-home-02.png"
        alt="até 55% desconto em mouses!"
      />

      <div>
        <div className="mx-auto max-w-screen-size">
          <SectionTitle>Teclados</SectionTitle>
          <ProductList products={keyboards} />
        </div>
      </div>

      <PromoBanner
        src="/banner-home-03.png"
        alt="até 55% desconto em mouses!"
      />

      <div>
        <div className="mx-auto max-w-screen-size">
          <SectionTitle>Mouses</SectionTitle>
          <ProductList products={mouses} />
        </div>
      </div>
    </div>
  );
}
