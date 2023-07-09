"use client";

import React, { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Icons } from "./Icons";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

type Props = { children: ReactNode };

const MobileChatLayout = ({ children }: Props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };

  const pathName = usePathname();

  //
  return (
    <>
      {show || pathName.includes("chat") ? null : (
        <Button
          onClick={handleOpen}
          variant="secondary"
          className=" md:hidden fixed right-6 top-6 rounded-full flex  items-center justify-center aspect-square w-14 h-14 z-20 "
        >
          <Menu />
        </Button>
      )}
      {pathName.includes("chat") ? (
        <Button
          onClick={handleOpen}
          className=" md:hidden fixed right-0 top-0  flex  items-center justify-center  h-14 z-20 "
        >
          <Menu />
        </Button>
      ) : null}
      <div
        className={cn(
          !show
            ? "max-md:sr-only"
            : "max-md:fixed  inset-y-0 left-0 bg-white z-20",
          "duration-300"
        )}
        onClick={handleClose}
      >
        {show ? <div className="fixed inset-0  bg-[#87878778]"></div> : null}
        <div className=" relative  w-full h-full max-w-xs flex flex-col gap-y-6 border-r border-r-gray-200  bg-white p-4 lg:p-6 ">
          <div className="flex  items-center justify-between">
            <Link href={"/dashboard"} className="flex h-16 w-fit items-center">
              <Icons.Logo className="h-8 text-indigo-600" />
            </Link>
            <Button
              onClick={handleClose}
              variant="outline"
              className=" aspect-square md:hidden"
            >
              <X className="h-6 w-6 shrink-0" />
            </Button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default MobileChatLayout;
