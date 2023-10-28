import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Order, Prisma } from "@prisma/client";

import { format } from "date-fns";
import { OrderProductItem } from "./orderProductItem";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { computeProductTotalPrice } from "@/helpers/product";
import { getOrderStatus } from "@/hooks/orderStatus";
import pt from "date-fns/locale/pt";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: { product: true };
      };
    };
  }>;
}

export function OrderItem({ order }: OrderItemProps) {
  const subtotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    }, 0);
  }, [order.orderProducts]);

  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      const productWithTotalPrice = computeProductTotalPrice(
        orderProduct.product,
      );
      return acc + productWithTotalPrice.totalPrice * orderProduct.quantity;
    }, 0);
  }, [order.orderProducts]);

  const totalDiscount = subtotal - total;
  return (
    <Card className="px-5">
      <Accordion
        type="single"
        className="w-full"
        collapsible
        defaultValue={order.id}
      >
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p className="text-sm font-bold uppercase">
                Pedido com {order.orderProducts.length} produto(s)
              </p>
              <span className="text-xs opacity-60">
                Feito em {format(order.createdAt, "d/MM/y 'ás' HH:mm")}
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="font-bold ">
                  <p>Status</p>
                  <span className="text-[#8162ff]">
                    {getOrderStatus(order.status)}
                  </span>
                </div>

                <div>
                  <p className="font-bold">Data</p>
                  <span className="opacity-60">
                    {format(order.createdAt, "dd/MM/y")}
                  </span>
                </div>

                <div>
                  <p className="font-bold">Pagamento</p>
                  <span className="opacity-60">Cartão</span>
                </div>
              </div>
              {order.orderProducts.map((orderProduct) => (
                <OrderProductItem
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                />
              ))}

              <div className="flex w-full flex-col gap-1 text-xs">
                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>SubTotal</p>
                  <p>{subtotal.toFixed(2)}€</p>
                </div>
                <Separator />
                <div className="flex w-full justify-between py-3">
                  <p>Entrega</p>
                  <p>GRÁTIS</p>
                </div>
                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Descontos</p>
                  <p>-{totalDiscount.toFixed(2)} €</p>
                </div>
                <Separator />
                <div className="flex w-full justify-between py-3 text-sm font-bold">
                  <p>Total</p>
                  <p>{total.toFixed(2)}€</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
