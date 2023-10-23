"use client";

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
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
import { Badge } from "./badge";

export function Header() {
  const { data, status } = useSession();
  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogOutClick = async () => {
    await signOut();
  };

  return (
    <Card className="flex items-center justify-between p-[1.875rem] md:px-[6.25rem]">
      <div className="md:hidden">
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
        <h1 className="text-lg font-semibold ">
          <span className="text-primary">FSW</span> Store
        </h1>
      </Link>

      <div className="hidden h-full flex-row items-center justify-center gap-8 md:flex">
        <Link href={"/"}>Início</Link>
        <Separator orientation="vertical" />
        <Link href={"/catalog"}>Catálogo</Link>
        <Separator orientation="vertical" />
        <Link href={"/deals"}>Ofertas</Link>
      </div>

      <div className="  flex flex-row items-center justify-center gap-8">
        {status === "authenticated" && data?.user && (
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
        )}

        {status === "unauthenticated" && (
          <Button
            onClick={handleLoginClick}
            variant="outline"
            className="hidden md:flex"
          >
            <LogInIcon size={16} />
            Fazer Login
          </Button>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant={"outline"}
              className="h-[36px] w-[36px]"
            >
              <ShoppingCartIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[350px]">
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </Card>
  );
}
