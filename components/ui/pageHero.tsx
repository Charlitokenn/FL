"use client";

import { useTenantContext } from "@/lib/context-provider";
import { Button } from "./button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import ReusableDialog from "../reusable-dialog";

type PageHeroProps = {
  title?: string;
  subtitle: string;
  type: "greeting" | "hero";
  buttonText?: string;
  showButton?: boolean;
  dialog?: React.ReactNode; // Accepts JSX
  dialogTitle: string;
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
  dialogDescription,
}: PageHeroProps) => {
  const sessionClaims = useTenantContext();
//TODO - ADD a bulk add functionality
  return (
    <div className="flex items-center justify-between gap-4 -mt-3 mb-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">
          {type === "hero" ? title : `Hello ${sessionClaims?.firstName}`}
        </h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {showButton && 
        <ReusableDialog 
          trigger={<Button className="cursor-pointer"><Plus/>{buttonText}</Button>} 
          title={dialogTitle} 
          description={dialogDescription}
          dialog={dialog}     
        />
      }
    </div>
  );
};

export default PageHero;
