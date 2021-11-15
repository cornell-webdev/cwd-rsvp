import React, { forwardRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ReactSelect, { CommonProps } from 'react-select'
import theme from 'src/app/theme'
import ErrorMsg from 'src/components/fonts/ErrorMsg'
import Label from 'src/components/fonts/Label'
import styled from 'styled-components'

export interface ISelectOption {
  label: string
  value: string
}

interface SelectProps {
  options: ISelectOption[]
  value?: string
  onChange?: (option: ISelectOption) => void
  label?: string
  disabled?: boolean
  maxMenuHeight?: number
}

const Select = forwardRef<HTMLInputElement, SelectProps>(
  (props: SelectProps, ref) => {
    const valueObject = props.options.find(
      (option) => option.value === props.value
    )
    return (
      <div>
        <Label {...props}>{props.label}</Label>
        <StyledSelect
          ref={ref}
          isDisabled={props.disabled}
          theme={(defaultStyles: any) => ({
            ...defaultStyles,
            colors: {
              ...defaultStyles.colors,
              primary25: theme.brand[50],
              primary50: theme.bg.grey,
              primary: theme.brand[500],
            },
          })}
          {...props}
          value={valueObject}
          key={`select-key-${JSON.stringify(valueObject)}`}
          isSearchable={false}
        />
      </div>
    )
  }
)

interface HookedSelectProps {
  name: string
  options: ISelectOption[]
}

export const HookedSelect = (props: HookedSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <div>
      <Controller
        name={props.name}
        control={control}
        render={({ field }) => <Select {...field} options={props.options} />}
      />
      <ErrorMsg error={errors[props.name]?.message} />
    </div>
  )
}

const StyledSelect = styled(ReactSelect)<CommonProps<any, false, any>>`
  & * {
    cursor: pointer !important;
    line-height: 1.5 !important;
  }

  & .css-1okebmr-indicatorSeparator {
    display: none;
  }
`

Select.displayName = 'Select'

export default Select
