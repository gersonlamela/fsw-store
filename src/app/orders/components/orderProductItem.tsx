import { computeProductTotalPrice } from "@/helpers/product";
import { OrderProduct, Prisma } from "@prisma/client";
import Image from "next/image";

interface OrderPorductItemsProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
}

export function OrderProductItem({ orderProduct }: OrderPorductItemsProps) {
  const productWithTotalPrice = computeProductTotalPrice(orderProduct.product);
  return (
    <div className="flex items-center  gap-4">
      <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={orderProduct.product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%]  w-auto max-w-[80%]"
          alt={orderProduct.product.name}
        />
      </div>

      <div className="flex  w-full  flex-col gap-1">
        <div className="flex w-fit rounded-[5px] bg-accent px-3 py-1">
          <p className="text-[10px]">
            Vendido e entregue por
            <span className="font-bold"> FSW Store</span>
          </p>
        </div>
        <p className="text-xs">{orderProduct.product.name}</p>
        <div className="flex w-full  items-center justify-between gap-1 ">
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold">
              {productWithTotalPrice.totalPrice.toFixed(2)}€
            </p>
            {productWithTotalPrice.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-60 ">
                {Number(productWithTotalPrice.basePrice).toFixed(2)}€
              </p>
            )}
          </div>

          <p className="text-xs opacity-60">Qntd: {orderProduct.quantity}</p>
        </div>
      </div>
    </div>
  );
}
