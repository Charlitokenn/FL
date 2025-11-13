"use client";

import { useTenantContext } from "@/lib/context-provider";

type PageHeroProps = {
  title?: string;
  subtitle: string;
  type: "greeting" | "hero";
  buttonText?: string;
  showButton?: boolean;
  dialog?: React.ReactNode; // Accepts JSX
};

const PageHero = ({
  title,
  subtitle,
  type,
  dialog,
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
      {dialog ? dialog : ""}
    </div>
  );
};

export default PageHero;
