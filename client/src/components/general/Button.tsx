import { ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/helper";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";

const styles = cva(
  "cursor-pointer transition-all duration-200 flex items-center justify-center gap-2",
  {
    variants: {
      variant: {
        primary:
          "bg-white text-slate-800 px-8 py-2 rounded-md font-medium hover:opacity-80 bg-accent text-white transition-all duration-200 disabled:opacity-70",
        secondary:
          "bg-white text-slate-800 px-8 py-2 rounded-md font-medium hover:opacity-80 transition-all duration-200 bg-dark  text-white disabled:opacity-70 ",
        tertiary:
          "bg-black px-8 py-2 rounded-md text-white hover:opacity-80 transition-all duration-200",
      },
    },
  }
);

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  children: ReactNode;
  isLoading?: boolean;
  variant?: VariantProps<typeof styles>["variant"];
  to?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  disabled,
  children,
  variant = "primary",
  isLoading = false,
  className,
  onClick,
  to,
  ...props
}: ButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      {...props}
      className={cn(styles({ variant }), className)}
      disabled={disabled || isLoading}
      onClick={(e) => {
        if (to) {
          navigate(to);
        }
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {children}

      {/* Add your custom loading component here */}
      {isLoading && <LoadingSpinner color="#fff" size={"sm"} />}
    </button>
  );
}
