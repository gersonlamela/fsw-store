"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";

import Link from "next/link";
import { DiscountBadge } from "./DiscountBadge";
import { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}
export function ProductItem({ product }: ProductItemProps) {
  const [imageLoad, setImageLoad] = useState(false);

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex  flex-col gap-4">
        {imageLoad ? (
          <Skeleton className="h-[170px] w-full " />
        ) : (
          <div className="relative flex  aspect-square h-[170px] w-full  items-center justify-center rounded-lg bg-accent">
            <Image
              src={product.imageUrls[0]}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
              alt={product.name}
              onLoad={() => setImageLoad(true)}
              onLoadingComplete={() => setImageLoad(false)}
            />
            {product.discountPercentage > 0 && (
              <DiscountBadge className="absolute left-3 top-3">
                {product.discountPercentage}
              </DiscountBadge>
            )}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {product.discountPercentage > 0 ? (
            <>
              <p className="text-base font-semibold">
                {product.totalPrice.toFixed(2)}€
              </p>
              <p className="text-xs line-through opacity-75">
                {Number(product.basePrice).toFixed(2)}€
              </p>
            </>
          ) : (
            <p className="text-base font-semibold">
              {Number(product.basePrice).toFixed(2)}€
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
