import { forwardRef } from "react";

const FormTextArea = forwardRef(
  (
    {
      label,
      name,
      required = false,
      placeholder = "",
      error = "",
      ...rest
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={name}
          className="font-semibold text-slate-700"
        >
          {label} {required && "*"}
        </label>

        <textarea
          ref={ref}
          id={name}
          name={name}
          required={required}
          placeholder={placeholder}
          rows="5"
          className="border border-slate-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-sky-400"
          {...rest}
        />

        {error && (
          <span className="text-sm text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  }
);

export default FormTextArea;