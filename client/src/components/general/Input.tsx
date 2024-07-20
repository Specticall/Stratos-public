import { UseFormRegister } from "react-hook-form";
import { UserProfileFormValues } from "../settings/UserProfileSettings";
import { HTMLAttributes, forwardRef } from "react";
import Skeleton from "react-loading-skeleton";
import { cn } from "../../utils/helper";

type Props = {
  label: string;
  placeholder: string;
  className?: string;
  hint?: string;
  disabled?: boolean;
  value?: string;
  type?: string;
  register?: UseFormRegister<UserProfileFormValues>;
  isLoading?: boolean;
  errorMessage?: string;
};

const Input = forwardRef<
  HTMLInputElement,
  Props & HTMLAttributes<HTMLInputElement>
>(function (
  {
    label,
    disabled,
    isLoading,
    placeholder,
    type = "text",
    className,
    errorMessage,
    hint,
    onChange,
    onBlur,
    ...props
  },
  ref
) {
  return (
    <div className={className}>
      <div className="flex justify-between">
        <label className="">{label}</label>
        {errorMessage && <p className="text-red-400">{errorMessage}</p>}
      </div>
      {!isLoading ? (
        <input
          {...props}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          type={type}
          className={cn(
            "border-[1px] border-slate-200 rounded-md w-full px-6 py-3 mt-2 disabled:text-slate-500",
            errorMessage && "border-red-400"
          )}
          placeholder={placeholder}
        />
      ) : (
        <Skeleton height={"2.75rem"} className="mt-2" />
      )}
      <p className="text-slate-500 mt-3 leading-[200%]">{hint}</p>
    </div>
  );
});

export default Input;
