import {
  FormControl,
  FormHelperText,
  FormLabel,
  forwardRef,
  Input,
  Textarea,
} from '@chakra-ui/react';
import {
  ChangeHandler,
  FieldError,
  UseFormRegister,
} from 'react-hook-form';

export type InputFieldProps = {
  type?: 'text' | 'email' | 'password' | 'textarea' | 'number' | 'button' | 'submit';
  label?: string;
  name: string;
  error?: FieldError;
  onChange?: ChangeHandler
} & Partial<
  ReturnType<UseFormRegister<Record<string, unknown>>>
>;

export const InputField = forwardRef(
  (props: InputFieldProps, ref) => {
    const {
      type = 'number',
      label,
      error,
      ...inputProps
    } = props;

    return (
      <FormControl>
        {label && <FormLabel>{label}</FormLabel>}
        {type === 'textarea' ? (
          <Textarea
            bg="white"
            rows={8}
            {...inputProps}
            ref={ref}
          />
        ) : (
          <Input
            bg="white"
            type={type}
            {...inputProps}
            ref={ref}
          />
        )}
        {error && (
          <FormHelperText color="red">
            {error?.message}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);
