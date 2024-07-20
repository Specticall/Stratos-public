import { MouseEvent, useState } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/helper";

/**
 * Since we're passing the width for both the svg and div elements we can reduce repeat code by using this cva style
 */
const styles = cva("", {
  variants: {
    size: {
      ////// Add or edit your own sizes //////
      sm: "w-5",
      md: "w-8",
      lg: "w-10",
    },
  },
});

export default function Checkbox({
  size = "sm",
  defaultValue = false,
  className,
  /**
   * Callback function that gets called when the user clicks the checkbox
   */
  onChange = () => {},
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> & {
  size?: VariantProps<typeof styles>["size"];
  defaultValue?: boolean;
  className?: string;
  onChange?: (value: boolean) => void;
}) {
  const [isChecked, setIsChecked] = useState(defaultValue);

  const handleSelect = (e: MouseEvent) => {
    e.preventDefault();
    setIsChecked((current) => !current);
    onChange(!isChecked);
  };

  return (
    <div
      {...props}
      role="checkbox"
      onClick={handleSelect}
      className={cn(
        "aspect-square border-[1px] border-slate-200 rounded-sm cursor-pointer transition-all duration-100 flex items-center justify-center",
        styles({ size }),

        //// Change the checkbox style here ////
        isChecked ? "bg-accent border-accent" : "hover:bg-slate-100",
        className
      )}
    >
      {/* You can customize the check icon yourself */}

      <svg
        className={cn(
          styles({ size }),

          //// Change the checkbox style here ////
          "fill-slate-50 transition-all duration-2100",

          isChecked ? "opacity-100" : "opacity-0"
        )}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
      </svg>
    </div>
  );
}
