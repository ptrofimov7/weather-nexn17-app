import {
  MultiSelect,
  MultiSelectProps,
  useMultiSelect,
} from "chakra-multiselect";
import { FC } from "react";

export type MultipleSelectProps = {
  name: string;
  handleChange: (v: string | number | (string | number)[]) => void;
};

export const MultipleSelect: FC<
  Omit<MultiSelectProps, "onChange" | "value"> &
    Partial<Pick<MultiSelectProps, "onChange" | "value">> &
    MultipleSelectProps
> = ({
  handleChange,
  name,
  onChange: _onChange,
  value: _value,
  options: _options,
  ...props
}) => {
  const { value, options, onChange } = useMultiSelect({
    value: _value ? _value : [],
    options: _options!,
    onChange: _onChange,
  });

  return (
    <MultiSelect
      name={name}
      value={value}
      options={options}
      onChange={(val: string | number | Array<string | number>) => {
        onChange?.(val);
        handleChange(val);
      }}
      {...props}
    />
  );
};
