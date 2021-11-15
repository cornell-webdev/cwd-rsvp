import React from 'react'
import { Calendar, OnChangeProps } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { Controller, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import ErrorMsg from '../fonts/ErrorMsg'

interface DatePickerProps {
  date: Date
  setDate: (date: Date) => void
}

const DatePicker = (props: DatePickerProps) => {
  const handleChange = (range: OnChangeProps) => {
    const date = new Date(range as Date)
    props.setDate(date)
  }

  return (
    <StyledCalendar
      date={props.date}
      onChange={handleChange}
    />
  )
}

interface HookDatePickerProps {
  name: string
}

export const HookedDatePicker = (props: HookDatePickerProps) => {
  const { control, formState: { errors } } = useFormContext()

  return (
    <div>
      <Controller
        name={props.name}
        control={control}
        render={({ field }) => {
          return (
            <StyledCalendar
              {...field}
              date={field.value}
            />
          )
        }}
      />
      <ErrorMsg error={errors[props.name]?.message} />
    </div>
  )
}

const StyledCalendar = styled(Calendar)`
  & .rdrDay {
    color: ${props => props.theme.brand[500]} !important;
  }
  & .rdrSelected {
    color: ${props => props.theme.brand[500]} !important;
  }
  & .rdrDayStartPreview {
    color: ${props => props.theme.brand[500]} !important;
  }
  & .rdrDayEndPreview {
    color: ${props => props.theme.brand[500]} !important;
  }
  & .rdrDayToday {
    color: ${props => props.theme.brand[500]} !important;
  }
  & .rdrDayToday span:after {
    background: ${props => props.theme.brand[500]} !important;
    opacity: .5;
  }
`

export default DatePicker
