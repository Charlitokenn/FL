import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Props {
   trigger: React.ReactNode;
   title: string;
   description?: string;
   formContent?: React.ReactNode;
   isInset: boolean;
}

export default function ReusableSheet({ trigger, title, description, formContent, isInset }: Props) {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        {trigger}
      </SheetTrigger>
      <SheetPopup inset={isInset}>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 px-4">
            {formContent}
          </div>
          <SheetFooter>
            <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
            <Button type="submit">Save</Button>
          </SheetFooter>
      </SheetPopup>
    </Sheet>
  );
}
