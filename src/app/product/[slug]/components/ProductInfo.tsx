"use client";

import { DiscountBadge } from "@/components/ui/DiscountBadge";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";

import { MinusIcon, PlusIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface ProductInfoProps {
  product: ProductWithTotalPrice;
}
export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const { addProductToCart } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };

  const { toast } = useToast();

  const handleAddToCartClick = () => {
    toast({
      title: "Produto adicionado!",
      description: "Produto adicionado no carrinho",
      action: <ToastAction altText="Fechar">Fechar</ToastAction>,
    });

    addProductToCart({ ...product, quantity });
  };

  return (
    <div className="mt-7 flex flex-col px-5 lg:mt-0 lg:max-w-[392px] lg:rounded-xl lg:bg-accent lg:p-10">
      <h2 className="text-lg font-light">{product.name}</h2>
      <div className="item-center flex gap-2">
        <h1 className="text-xl font-bold">{product.totalPrice.toFixed(2)}€</h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge>{product.discountPercentage}</DiscountBadge>
        )}
      </div>

      {product.discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          {Number(product.basePrice).toFixed(2)}€
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecreaseQuantityClick}
        >
          <MinusIcon size={16} />
        </Button>

        <span>{quantity}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={handleIncreaseQuantityClick}
        >
          <PlusIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3 ">
        <h3 className="text-base font-bold">Descrição</h3>
        <p className=" overflow-scroll text-justify text-sm opacity-60 lg:max-h-[140px]">
          {product.description}
        </p>
      </div>

      <Button
        className="mt-8 font-bold uppercase"
        onClick={handleAddToCartClick}
      >
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex  items-center justify-between rounded-lg  bg-accent px-5 py-2">
        <div className="flex items-center gap-2">
          <TruckIcon />
          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold">FSPacket®</span>
            </p>
            <p className="text-xs text-[#8162ff]">
              Envio para <span className="font-bold">todo Portugal</span>
            </p>
          </div>
        </div>
        <p className="text-xs font-bold uppercase">Transporte GRÁTIS</p>
      </div>
    </div>
  );
}
