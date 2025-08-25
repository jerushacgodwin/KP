import { Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { FieldError, Control } from "react-hook-form";

type DropDownProps = {
  label: string;
  value: any;
  name: string;
  control?: Control<any>;
  setSelected: (value: { selected: any }) => void;
  options: any[];
  optionValue?: string;
  optionLabel?: string;
  placeholder?: string;
  error?: FieldError;
};

const DropDownField = ({
  label,
  name,
  control,
  setSelected,
  options,
  optionValue = "value",
  optionLabel = "label",
  placeholder = "Select an option",
  error,
}: DropDownProps) => {
  return (
    <div className="flex flex-col gap-2 w-full ">
      <label className="text-xs text-gray-500">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            value={field.value}
            onChange={(e) => {
              field.onChange(e.value);
              setSelected({ selected: e.value });
            }}
            options={options}
            optionLabel={optionLabel}
            optionValue={optionValue}
            placeholder={placeholder}
            className={`ring-[1.5px] ring-gray-300 rounded-md text-sm w-full ${
              error ? "p-invalid" : ""
            }`}
          />
        )}
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error.message}</p>
      )}
    </div>
  );
};

export default DropDownField;
