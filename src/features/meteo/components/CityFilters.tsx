import { InputField } from '@/components/form'
import React from 'react'
import { Box, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { CityFilters } from '../types';
import { MultipleSelect } from '@/components/multy-select';
import { useCountries } from '../api/get-countries';
import { Loading } from '@/components/loading';
import { Button } from '@/components/button';

type CityFiltersForm = {
   onChange: (value: CityFilters) => void;
}

export const CityFiltersForm = ({ onChange }: CityFiltersForm) => {

   const { register, handleSubmit, formState, getValues, clearErrors, setValue } =
      useForm<CityFilters>({
         mode: 'onBlur',
         defaultValues: {
            temperature_min: -80,
            temperature_max: 80,
            country_code: undefined
         }
      });

   const countries = useCountries()

   const onSubmit = (data: CityFilters) => {
      console.log("Отправка формы", JSON.stringify(data));
      onChange(data)
   }

   const handleChange = (val: string | number | (string | number)[]) => {
      setValue('country_code', val)
   }

   return (
      <Box w="full">
         <form  onSubmit={handleSubmit(onSubmit)}>
         <Stack
            as="fieldset"
            w="full"
            spacing="8"

         >
            {!countries.isLoading ?
               <MultipleSelect
                  label="Country"
                  options={countries.data}
                  placeholder='Select ...'
                  searchPlaceholder='Search ...'
                  name='country_code'
                  handleChange={handleChange}
               />
               : <Loading />}
            <InputField
               type="number"
               id="min"
               label="Min"
               {...register('temperature_min', {
                  min: {
                     value: -80,
                     message: `Min value is -80`
                  },
                  max: {
                     value: 80,
                     message: `Max value is 80`
                  },
                  valueAsNumber: true,
                  validate: (value) => Number(value) <= Number(getValues("temperature_max")) || 'Min should be less max!',
                  onChange: () => {
                     if (formState.errors.temperature_min) {
                        clearErrors('temperature_min')
                     }
                  }
               })}
               error={formState.errors['temperature_min']}
            />

            <InputField
               type="number"
               id="max"
               label="Max"
               {...register('temperature_max', {
                  min: {
                     value: -80,
                     message: `Min value is -80`
                  },
                  max: {
                     value: 80,
                     message: `Max value is 80`
                  },
                  valueAsNumber: true,
                  validate: (value) => Number(getValues("temperature_min")) <= Number(value) || 'Max should be more min',
                  onChange: () => {
                     if (formState.errors.temperature_max) {
                        clearErrors('temperature_max')
                     }
                  }
               })}
               error={formState.errors['temperature_max']}
            />
         </Stack>
         <Button type='submit' isDisabled={Object.keys(formState.errors).length > 0}>Apply</Button>
         </form>
      </Box>
   );
};
