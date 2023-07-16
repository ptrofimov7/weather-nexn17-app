import { InputField } from "@/components/form";
import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { CityFilters } from "../types";
import { MultipleSelect } from "@/components/multy-select";
import { useCountries } from "../api/get-countries";
import { Loading } from "@/components/loading";
import { Button } from "@/components/button";

type CityFiltersForm = {
  onChange: (value: CityFilters) => void;
};

export const CityFiltersForm = ({ onChange }: CityFiltersForm) => {
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    clearErrors,
    setValue,
  } = useForm<CityFilters>({
    mode: "onBlur",
    defaultValues: {
      temperature_min: undefined,
      temperature_max: undefined,
      country_code: undefined,
    },
  });

  const countries = useCountries();

  const onSubmit = (data: CityFilters) => {
    console.log("Отправка формы", JSON.stringify(data));
    onChange(data);
  };

  const handleChange = (val: string | number | (string | number)[]) => {
    setValue("country_code", val);
  };

  return (
    <Box w="full" h={"fit-content"}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ marginBlock: "20", display: "flex", flexDirection: "column" }}
      >
        <Stack
          as="fieldset"
          direction={["column", "column", "row"]}
          spacing="6"
          marginBlockEnd={4}
        >
          {!countries.isLoading ? (
            <MultipleSelect
              options={countries.data}
              placeholder="Country"
              searchPlaceholder="Search ..."
              name="country_code"
              handleChange={handleChange}
            />
          ) : (
            <Loading />
          )}
          <InputField
            type="number"
            id="min"
            placeholder="Min"
            {...register("temperature_min", {
              min: {
                value: -80,
                message: `Min value is -80`,
              },
              max: {
                value: 80,
                message: `Max value is 80`,
              },
              valueAsNumber: true,
              validate: () =>
                Number(getValues("temperature_min")) <=
                  Number(getValues("temperature_max")) ||
                "Min should be less max!",
              onChange: () => {
                if (
                  formState.errors["temperature_max"] ||
                  formState.errors["temperature_min"]
                ) {
                  clearErrors(["temperature_min", "temperature_max"]);
                }
              },
            })}
            error={formState.errors["temperature_min"]}
          />

          <InputField
            type="number"
            id="max"
            placeholder="Max"
            {...register("temperature_max", {
              min: {
                value: -80,
                message: `Min value is -80`,
              },
              max: {
                value: 80,
                message: `Max value is 80`,
              },
              valueAsNumber: true,
              validate: () =>
                Number(getValues("temperature_min")) <=
                  Number(getValues("temperature_max")) ||
                "Max should be more min",
              onChange: () => {
                if (
                  formState.errors["temperature_max"] ||
                  formState.errors["temperature_min"]
                ) {
                  clearErrors(["temperature_min", "temperature_max"]);
                }
              },
            })}
            error={formState.errors["temperature_max"]}
          />
        </Stack>
        <Button
          type="submit"
          isDisabled={Object.keys(formState.errors).length > 0}
          marginInline="auto"
        >
          Apply
        </Button>
      </form>
    </Box>
  );
};
