import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputTextarea } from 'primereact/inputtextarea';
import { FieldError } from "react-hook-form";

const TextArea = ({
  label,
  name,
  register,
  error,
  ...props
}: {
  label: string;
  name: string;
  register: any;
  error: FieldError | undefined;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs text-gray-500" htmlFor={name}>
        {label}
      </label>
      <InputTextarea id={name} {...register(name)} rows={5} cols={30}  className='ring-[1.5px] ring-gray-300 p-3 rounded-md text-sm w-full'/>
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default TextArea;
