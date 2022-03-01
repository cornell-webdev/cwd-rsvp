import { theme } from 'cornell-glue-ui'
import React, { forwardRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ReactSelect, { ActionMeta } from 'react-select'
import styled from 'styled-components'
import ErrorMsg from './ErrorMsg'
import Label from './Label'

export interface ISelectOption {
  label: string
  value: string
}

interface ISelectProps {
  options?: ISelectOption[]
  value?: ISelectOption
  onChange?: (newOption: ISelectOption, actionMeta: ActionMeta<ISelectOption>) => void
  label?: string
  disabled?: boolean
  maxMenuHeight?: number
  width?: string
  isSearchable?: boolean
  placeholder?: string
  error?: string
}

const Select = forwardRef<HTMLSelectElement, ISelectProps>((props: ISelectProps, ref) => {
  const valueObject = props?.options?.find((option) => option.value === props?.value?.value)

  return (
    <div>
      <Label>{props.label}</Label>
      {/* @ts-ignore */}
      <StyledSelect
        isDisabled={props.disabled}
        theme={(defaultStyles: any) => ({
          ...defaultStyles,
          colors: {
            ...defaultStyles.colors,
            primary25: theme.brand[50],
            primary50: theme.background.grey,
            primary: theme.brand[500],
          },
        })}
        value={valueObject}
        key={`select-key-${JSON.stringify(valueObject)}`}
        classNamePrefix='react-select'
        isError={!!props?.error}
        {...props}
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
  isSearchable?: boolean
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
        render={({ field }) => (
          <Select
            {...props}
            {...field}
            options={props.options}
            error={errors[props.name]?.message}
          />
        )}
      />
      <ErrorMsg error={errors[props.name]?.message} />
    </div>
  )
}

interface IStyledSelectProps {
  width?: ISelectProps['width']
  isError?: boolean
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

  & .react-select__control {
    /* isError */
    border-color: ${(props) => props.isError && theme.text.error} !important;
  }
`

Select.displayName = 'Select'

export default Select
