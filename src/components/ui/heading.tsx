
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
}

export function Heading({ level = 1, children, className }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const styles = {
    1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    4: "scroll-m-20 text-xl font-semibold tracking-tight",
    5: "scroll-m-20 text-lg font-semibold tracking-tight",
    6: "scroll-m-20 text-base font-semibold tracking-tight",
  }[level];
  
  return (
    <Tag className={cn(styles, className)}>
      {children}
    </Tag>
  );
}
