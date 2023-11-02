"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PackageSearchIcon,
  PercentIcon,
  Search,
  ShoppingCartIcon,
  User,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./avatar";
import { Separator } from "./separator";
import Link from "next/link";
import { Cart } from "./cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

import { CartContext } from "@/providers/cart";
import SearchComponent from "./search";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Estado para controlar a abertura/fechamento do componente de pesquisa
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const { data, status } = useSession();
  const { products } = useContext(CartContext);

  const cartQuantityItems = products.length;

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogOutClick = async () => {
    await signOut();
  };

  useEffect(() => {
    if (isSearchOpen) {
      setIsSubMenuOpen(false); // Fecha a div com o id "submenu" quando a pesquisa estiver aberta
    } else {
      setIsSubMenuOpen(true);
    }
  }, [isSearchOpen]);

  return (
    <Card className="flex items-center justify-between p-[1.875rem] md:px-[6.25rem]">
      <div className={`${!isSearchOpen ? "flex md:hidden" : "hidden  "}`}>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant={"outline"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <SheetHeader className="text-left text-lg font-semibold">
              Menu
            </SheetHeader>
            {status === "authenticated" && data?.user && (
              <div className="flex flex-col">
                <div className="flex items-center gap-2 py-4">
                  <Avatar>
                    <AvatarFallback>
                      {data.user.name?.[0].toUpperCase()}
                    </AvatarFallback>
                    {data.user.image && <AvatarImage src={data.user.image} />}
                  </Avatar>

                  <div className="flex flex-col">
                    <p className="font-medium">{data.user.name}</p>
                    <p className="text-sm  opacity-75">Boas compras!</p>
                  </div>
                </div>
                <Separator />
              </div>
            )}
            <div className="mt-4 flex flex-col gap-2">
              {status === "unauthenticated" && (
                <Button
                  onClick={handleLoginClick}
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <LogInIcon size={16} />
                  Fazer Login
                </Button>
              )}

              {status === "authenticated" && (
                <Button
                  onClick={handleLogOutClick}
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <LogOutIcon size={16} />
                  Logout
                </Button>
              )}

              <SheetClose asChild>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <HomeIcon size={16} />
                    Início
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/orders">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <PackageSearchIcon size={16} />
                    Meus Pedidos
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href={"/deals"}>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <PercentIcon size={16} />
                    Ofertas
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/catalog">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <ListOrderedIcon size={16} />
                    Catálogo
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <Link href="/">
        <h1 className="flex flex-1  text-lg font-semibold ">
          <span className="text-primary">FSW</span> Store
        </h1>
      </Link>

      <div
        className={`${
          !isSearchOpen
            ? " hidden  h-full flex-1  flex-row items-center justify-center gap-8 transition-opacity duration-300 md:flex"
            : "hidden "
        }`}
      >
        <Link href={"/"}>Início</Link>
        <Separator orientation="vertical" />
        <Link href={"/catalog"}>Catálogo</Link>
        <Separator orientation="vertical" />
        <Link href={"/deals"}>Ofertas</Link>
      </div>

      <div
        className={`flex flex-row items-center justify-end gap-2 sm:gap-4 md:gap-8 ${
          !isSearchOpen ? "" : "ml-2 flex-1 md:ml-4"
        }`}
      >
        <SearchComponent
          isSearchOpen={isSearchOpen}
          toggleSearch={() => setIsSearchOpen(!isSearchOpen)} // Passando a função para abrir/fechar o componente de pesquisa
        />

        {status === "authenticated" && data?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="hidden flex-col md:flex">
                <div className="flex items-center gap-2 ">
                  <Avatar className="h-[36px] w-[36px]">
                    <AvatarFallback>
                      {data.user.name?.[0].toUpperCase()}
                    </AvatarFallback>
                    {data.user.image && <AvatarImage src={data.user.image} />}
                  </Avatar>
                </div>
              </div>
              <DropdownMenuContent>
                <DropdownMenuLabel>{data?.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/orders" className="w-full justify-start gap-2">
                    <PackageSearchIcon size={16} />
                    Meus Pedidos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    onClick={handleLogOutClick}
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <LogOutIcon size={16} />
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuTrigger>
          </DropdownMenu>
        )}

        {status === "unauthenticated" && (
          <Button
            onClick={handleLoginClick}
            size="icon"
            variant={"outline"}
            className="h-[36px] w-[36px]"
          >
            <User />
          </Button>
        )}

        <div className={`${!isSearchOpen ? "flex" : "hidden md:flex "}`}>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant={"outline"}
                className="relative h-[36px] w-[36px]"
              >
                <ShoppingCartIcon />
                {cartQuantityItems > 0 && (
                  <span className="absolute right-[calc(-1.25rem/2)] top-[calc(-1.25rem/2)] flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-sm font-bold">
                    {cartQuantityItems}
                  </span>
                )}
              </Button>
            </SheetTrigger>

            <SheetContent className="w-[350px]">
              <Cart />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </Card>
  );
}
