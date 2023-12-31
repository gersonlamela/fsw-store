"use client";
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext, useState } from "react";
import { CartContext } from "@/providers/cart";

import { computeProductTotalPrice } from "@/helpers/product";
import { CartItem } from "./CartItem";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { createOrder } from "@/actions/order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ButtonLoading } from "./buttonLoading";

export function Cart() {
  const { data } = useSession();
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleFinishPurchaseClick = async () => {
    setLoading(true);
    if (!data?.user) {
      router.push(
        "./api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F",
      );
    }
    const order = await createOrder(products, (data?.user as any).id);
    const checkout = await createCheckout(products, order.id);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });

    console.log(checkout);
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge variant="heading">
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="flex-1">
          <div className="flex h-full flex-col gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={computeProductTotalPrice(product as any) as any}
                />
              ))
            ) : (
              <p className="text-center font-semibold">Carrinho vazio.</p>
            )}
          </div>
        </ScrollArea>
      </div>

      {products.length > 0 && (
        <div className="flex  flex-col gap-3">
          <Separator />
          <div className="flex items-center justify-between text-xs">
            <p>Subtotal</p>
            <p>{subtotal.toFixed(2)}€</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-xs">
            <p>Entrega</p>
            <p>GRÁTIS</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-xs">
            <p>Descontos</p>
            <p>{totalDiscount.toFixed(2)}€</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-sm font-bold">
            <p>Total</p>
            <p>{total.toFixed(2)}€</p>
          </div>

          {loading ? (
            <ButtonLoading loadingtext=" Finalizando compra" />
          ) : (
            <Button
              className="mt-7 font-bold uppercase"
              onClick={handleFinishPurchaseClick}
            >
              Finalizar compra
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
