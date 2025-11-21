import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "./ui/separator";

interface Props {
    trigger: React.ReactNode
    title: string;
    description: React.ReactNode
}

const ReusableDialog = ({ trigger, title, description }: Props) => (
<Dialog>
  <DialogTrigger>{trigger}</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle className="-my-1">{title}</DialogTitle>
      <Separator className="my-2.5"/>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
  </DialogPopup>
</Dialog>
)

export default ReusableDialog