import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ShapesIcon } from "lucide-react";
import CatalogItems from "../category/components/CatalogItems";

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany({});

  return (
    <div className="mx-auto flex max-w-[1024px] flex-col gap-8 p-5">
      <Badge variant="heading">
        <ShapesIcon size={16} />
        Catálogo
      </Badge>

      <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
        {categories.map((category) => (
          <CatalogItems key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
