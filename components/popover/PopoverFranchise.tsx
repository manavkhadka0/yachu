"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function PopoverFranchise() {
  const pathname = usePathname();
  const [showPopover, setShowPopover] = useState(false);

  const updateLocalStorage = () => {
    sessionStorage.setItem("franchise", "true");
    setShowPopover(false);
  };

  useEffect(() => {
    const sessionStorageValue = sessionStorage.getItem("franchise");
    console.log("sessionStorageValue", sessionStorageValue);
    if (!sessionStorageValue || sessionStorageValue === null) {
      setShowPopover(true);
    }
  }, [pathname]);

  return (
    <Dialog open={showPopover} onOpenChange={setShowPopover}>
      <DialogTrigger asChild>
        <div
          className="fixed bottom-0 cursor-pointer left-0 p-5 h-[140px] w-[140px] bg-orange-800 z-20 "
          style={{
            clipPath: "polygon(0% 0%, 0% 100%, 100% 100%)",
          }}
          onClick={() => setShowPopover(true)}
        >
          <Label className="text-white text-2xl text-center self-center rotate-45 bottom-8 left-3 absolute z-49">
            Join Us
          </Label>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle className=" text-3xl sm:text-4xl text-center">
            Join our Franchise
          </DialogTitle>
          <DialogDescription className="text-center">
            To join our franchise, click on the button below and fill out the
            form.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center">
            <Image
              src="/franchiseIllustration.png"
              width={600}
              height={600}
              alt="Franchise Proposal Image"
              className="pb-10 object-contain w-full"
            />
            <Button
              size={"lg"}
              variant={"default"}
              asChild
              onClick={() => updateLocalStorage()}
              className=" py-6 sm:py-10 bg-amber-700 text-white w-full font-extrabold text-2xl sm:text-3xl hover:bg-amber-800"
            >
              <Link href={"/proposal"}>Join Us</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
