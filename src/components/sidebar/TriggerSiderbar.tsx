"use client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";

export function TriggerSidebar() {
  const { toggleSidebar, state } = useSidebar();

  return (
    <button
      className={cn(
        `absolute top-7 -right-[0px] py-2 bg-white dark:bg-background dark:py-2 z-50 ${
          state === "collapsed" && "-right-[5px]"
        }`
      )}
      onClick={toggleSidebar}>
      {state !== "collapsed" ? (
        <FaChevronLeft size={20} color="destructive" />
      ) : (
        <FaChevronRight size={20} color="destructive" />
      )}
    </button>
  );
}
