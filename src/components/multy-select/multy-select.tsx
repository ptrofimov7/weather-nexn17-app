import { MultiSelect, MultiSelectProps, Option, useMultiSelect } from 'chakra-multiselect'
import { FC, useState } from 'react'
import { Loading } from '../loading';
import { ChangeHandler, UseFormRegister } from 'react-hook-form';
import { forwardRef } from '@chakra-ui/react';


export type MultipleSelectProps = {
  name: string;
  handleChange: (v: any) => void,
}

export const MultipleSelect: FC<
  Omit<MultiSelectProps, 'onChange' | 'value'> &
  Partial<Pick<MultiSelectProps, 'onChange' | 'value'>> & MultipleSelectProps
> = ({
  handleChange,
  name, onChange: _onChange, onBlur: _onBlur, value: _value, options: _options, ...props }) => {

  const { value, options, onChange } = useMultiSelect({
    value: _value ? _value : [],
    options: _options!,
    onChange: _onChange,
  })

  console.log({ value, options, props });

  return (
    <MultiSelect
      name={name}
      value={value}
      options={options}
      onChange={(val: any) => {
        onChange?.(val)
        handleChange(val)
      }}
      {...props}
    />
  )
}
