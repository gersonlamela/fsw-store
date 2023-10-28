import { prismaClient } from "@/lib/prisma";
import { ProductImages } from "./components/ProductImages";
import { ProductInfo } from "./components/ProductInfo";
import { computeProductTotalPrice } from "@/helpers/product";
import { ProductList } from "@/components/ui/ProductList";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailsPage({
  params: { slug },
}: ProductDetailsPageProps) {
  const product = await prismaClient.product.findFirst({
    where: { slug: slug },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) return null;
  return (
    <div className=" flex flex-col gap-8 pb-8 lg:px-[100px] lg:py-10">
      <div className="w-full gap-8 lg:flex lg:justify-between">
        <ProductImages imageUrls={product.imageUrls} name={product.name} />
        <ProductInfo product={computeProductTotalPrice(product)} />
      </div>

      <div>
        <SectionTitle>PRODUTOS RECOMENDADOS</SectionTitle>
        <ProductList products={product.category.products} />
      </div>
    </div>
  );
}
