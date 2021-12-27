import React, { forwardRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ReactSelect, { CommonProps } from 'react-select'
import { theme } from 'cornell-glue-ui'
import ErrorMsg from './ErrorMsg'
import Label from './Label'
import styled from 'styled-components'

export interface ISelectOption {
  label: string
  value: string
}

interface SelectProps
  extends Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
    'onChange'
  > {
  options?: ISelectOption[]
  value?: string
  onChange?: (selectedOption: ISelectOption) => void
  label?: string
  disabled?: boolean
  maxMenuHeight?: number
  width?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props: SelectProps, ref) => {
  const valueObject = props?.options?.find((option) => option.value === props.value)

  return (
    <div>
      <Label>{props.label}</Label>
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
        classNamePrefix='react-select'
      />
    </div>
  )
})

interface HookedSelectProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  name: string
  options?: ISelectOption[]
  label?: string
  width?: string
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
        render={({ field }) => <Select {...props} {...field} options={props.options} />}
      />
      <ErrorMsg error={errors[props.name]?.message} />
    </div>
  )
}

interface IStyledSelectProps extends CommonProps<any, false, any> {
  width?: SelectProps['width']
}

const StyledSelect = styled(ReactSelect)<IStyledSelectProps>`
  & * {
    cursor: pointer !important;
    line-height: 1.5 !important;
  }

  & .react-select__control {
    /* width */
    width: ${(props) => props.width && props.width};
  }

  & .react-select__indicator-separator {
    display: none;
  }

  & .react-select__indicator {
    padding-left: 0;
  }

  & .react-select__value-container {
    padding-right: 0;
  }
`

Select.displayName = 'Select'

export default Select
