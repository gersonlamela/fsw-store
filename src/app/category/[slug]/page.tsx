import { ProductItem } from "@/components/ui/ProductItem";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICON } from "@/constants/CategoryIcon";

import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { ShapesIcon } from "lucide-react";

export default async function CategoryProducts({ params }: any) {
  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      products: true,
    },
  });
  if (!category) {
    return null;
  }

  return (
    <div className="mx-auto flex max-w-[1024px] flex-col gap-8 p-5">
      <Badge variant="heading">
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {category.name}
      </Badge>

      <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
        {category.products.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
          />
        ))}
      </div>
    </div>
  );
}
