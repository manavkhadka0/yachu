"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

interface AccordionProps {
  className?: string;
  children?: React.ReactNode;
  type?: "single" | "multiple";
  collapsible?: boolean;
  [key: string]: any;
}

function Accordion({
  className,
  type = "single",
  ...props
}: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      type={type}
      className={cn("flex w-full flex-col", className)}
      {...props} />
  );
}

interface AccordionItemProps {
  className?: string;
  children?: React.ReactNode;
  value?: string;
  [key: string]: any;
}

function AccordionItem({
  className,
  value = "",
  ...props
}: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      value={value}
      className={cn("not-last:border-b", className)}
      {...props} />
  );
}

interface AccordionTriggerProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className
        )}
        {...props}>
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

interface AccordionContentProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}>
      <div
        className={cn(
          "h-(--radix-accordion-content-height) pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
