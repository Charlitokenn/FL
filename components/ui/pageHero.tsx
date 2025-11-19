"use client";

import { useTenantContext } from "@/lib/context-provider";
import { Button } from "./button";
import { Plus } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Label } from "@radix-ui/react-select";
import { Input } from "./input";

type PageHeroProps = {
  title?: string;
  subtitle: string;
  type: "greeting" | "hero";
  buttonText?: string;
  showButton?: boolean;
  dialog?: React.ReactNode; // Accepts JSX
  dialogTitle?: string;
  dialogDescription?: string;
};

const PageHero = ({
  title,
  subtitle,
  type,
  buttonText,
  showButton,
  dialog,
  dialogTitle,
  dialogDescription
}: PageHeroProps) => {
  const sessionClaims = useTenantContext();

  return (
    <div className="flex items-center justify-between gap-4 -mt-3 mb-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">
          {type === "hero" ? title : `Hello ${sessionClaims?.firstName}`}
        </h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {showButton && 
        <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary cursor-pointer"><Plus/>{buttonText}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogDescription>{dialogDescription}</DialogDescription>
              </DialogHeader>
                {dialog}
            </DialogContent>
        </Dialog>
      }
      {dialog ? dialog : ""}
    </div>
  );
};

export default PageHero;
