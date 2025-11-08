import { cn } from "@/shared/lib/utils";

interface IProps {
  children: React.ReactNode;
  className?: string;
  component?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
export const Text: React.FC<IProps> = ({
  children,
  className,
  component = "span",
  ...props
}) => {
  const Component = component;
  return (
    <Component className={cn(className)} {...props}>
      {children}
    </Component>
  );
};
