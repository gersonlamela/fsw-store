import { prismaClient } from "@/lib/prisma";
import CategoryItem from "./categoryItem";

const Categories = async () => {
  const categories = await prismaClient.category.findMany({});

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:inline-flex lg:w-full lg:justify-between">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;
