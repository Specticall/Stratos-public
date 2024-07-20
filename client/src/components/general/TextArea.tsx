import { HTMLAttributes, forwardRef } from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
  label: string;
  placeholder: string;
  className?: string;
  hint?: string;
  isLoading?: boolean;
};

const TextArea = forwardRef<
  HTMLTextAreaElement,
  Props & HTMLAttributes<HTMLTextAreaElement>
>(function (
  {
    label,
    placeholder,
    isLoading,
    className,
    hint,
    onChange,
    onBlur,
    ...props
  },
  ref
) {
  return (
    <div className={className}>
      <label className="">{label}</label>
      {isLoading ? (
        <Skeleton height={"12.5rem"} />
      ) : (
        <textarea
          {...props}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          className="border-[1px] border-slate-200 rounded-md w-full px-6 py-4 mt-2 resize-none h-48"
          placeholder={placeholder}
        ></textarea>
      )}
      <p className="text-slate-500 mt-3 leading-[200%]">{hint}</p>
    </div>
  );
});

export default TextArea;
