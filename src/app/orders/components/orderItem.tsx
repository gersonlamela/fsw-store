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
  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              Pedido com {order.orderProducts.length} produto(s)
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="font-bold ">
                  <p>Status</p>
                  <span className="text-[#8162ff]">{order.status}</span>
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
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
