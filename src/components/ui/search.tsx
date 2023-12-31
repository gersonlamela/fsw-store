import React, { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";

interface SearchComponentProps {
  isSearchOpen: boolean;
  toggleSearch: () => void;
}

const SearchComponent = ({
  isSearchOpen,
  toggleSearch,
}: SearchComponentProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      toggleSearch(); // Fechar a pesquisa quando clicar fora
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <div className="relative flex w-full justify-end   ">
      <div
        className=" relative flex w-full flex-1   items-center justify-end"
        ref={inputRef}
      >
        <div
          className={`flex flex-row ${
            isSearchOpen ? " flex w-full lg:w-[600px]  " : "hidden "
          }`}
        >
          <Input
            type="text"
            placeholder="Search..."
            className="ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        {isSearchOpen ? (
          <>
            <Search className="absolute right-14" />
            <Button variant="outline" onClick={toggleSearch} className="p-2">
              <X />
            </Button>
          </>
        ) : (
          <Button variant="outline" onClick={toggleSearch} className="p-2">
            <Search />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
