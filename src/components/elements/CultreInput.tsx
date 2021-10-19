import React, { LegacyRef } from "react";
import { Path, UseFormRegister } from "react-hook-form";

type InputProps = {
  label: Path<any>;
  register: UseFormRegister<any>;
  required: boolean;
};

export const Input = ({ label, register, required }: InputProps) => (
  <>
    <label>{label}</label>
    <input {...register(label, { required })} />
  </>
);

export const Select = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<any>>
>(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </>
));

export const Checkbox = React.forwardRef(
  (
    { label, name, value, onChange, defaultChecked, ...rest }: any,
    forwardedRef: LegacyRef<HTMLInputElement> | undefined
  ) => {
    const [checked, setChecked] = React.useState(defaultChecked);

    React.useEffect(() => {
      if (onChange) {
        onChange(checked);
      }
    }, [checked]);

    return (
      <div onClick={() => setChecked(!checked)} style={{ cursor: "pointer" }}>
        <input
          style={{ display: "none" }}
          ref={forwardedRef}
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />
        [{checked ? "X" : " "}]{label}
      </div>
    );
  }
);
