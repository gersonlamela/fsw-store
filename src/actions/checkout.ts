"use server";

import { CartProduct } from "@/providers/cart";
import Stripe from "stripe";

export const createCheckout = async (products: CartProduct[]) => {
  // CRIAR CHECKOUT
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url:
      "https://www.google.com/search?sca_esv=575652145&sxsrf=AM9HkKkI0OeFA86QSRtOciDU_ruH-jcI-g:1698013979416&q=image+g740&tbm=isch&source=lnms&sa=X&ved=2ahUKEwj8_MOA24qCAxWSUaQEHVwkA5kQ0pQJegQICxAB&biw=842&bih=1875&dpr=1#imgrc=FwZmrDzD6gqmYM",
    cancel_url: process.env.HOST_URL,
    line_items: products.map((product) => {
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: product.name,
            description: product.description,
            images: product.imageUrls,
          },
          unit_amount: product.totalPrice * 100,
        },
        quantity: product.quantity,
      };
    }),
  });

  return checkout;
};
