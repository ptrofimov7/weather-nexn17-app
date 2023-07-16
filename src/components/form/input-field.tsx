import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  forwardRef,
  Input,
  InputGroup,
  InputRightElement,
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
            bg="gray"
            rows={8}
            {...inputProps}
            ref={ref}
          />
        ) : ((type === 'number') ?
          <InputGroup>
            <Input
              bg="gray"
              color='white'
              type={type}
              {...inputProps}
              ref={ref}

            />
            <InputRightElement>
              <ChevronDownIcon color="white" />
            </InputRightElement>
          </InputGroup> :
          <Input
            bg="gray"
            color='white'
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
