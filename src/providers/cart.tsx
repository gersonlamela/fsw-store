"use client";

import { ProductWithTotalPrice } from "@/helpers/product";

import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartBasePrice: number;
  cartTotalPrice: number;
  cartTotalDiscount: number;
  addProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  cartTotalPrice: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: CartProduct) => {
    // se o produto já estiver no carrinho, apenas aumente a sua quantidade
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }

          return cartProduct;
        }),
      );

      return;
    }

    // se não, adicione o produto à lista
    setProducts((prev) => [...prev, product]);
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }

          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
    );
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        cartTotalPrice: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
