import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ButtonLoadingProps {
  loadingtext: string;
}

export function ButtonLoading({ loadingtext }: ButtonLoadingProps) {
  return (
    <Button disabled className="font-bold uppercase">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {loadingtext}
    </Button>
  );
}
