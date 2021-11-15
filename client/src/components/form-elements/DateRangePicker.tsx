import { watch } from 'fs'
import React, { useEffect } from 'react'
import { DateRange, OnChangeProps, RangeWithKey } from 'react-date-range'
import { useFormContext } from 'react-hook-form'
import theme from 'src/app/theme'
import styled from 'styled-components'
import ErrorMsg from '../fonts/ErrorMsg'

interface IRangeProp {
  selection: RangeWithKey
}

export interface IDates {
  startDate?: Date
  endDate?: Date
}

interface DateRangePickerProps {
  dates: IDates
  setDates: (newDates: IDates) => void
}

const DateRangePicker = (props: DateRangePickerProps) => {
  const handleChange = (range: OnChangeProps) => {
    const newDates = (range as IRangeProp).selection
    props.setDates({
      startDate: newDates.startDate,
      endDate: newDates.endDate,
    })
  }

  return (
    <StyledDateRange
      onChange={handleChange}
      moveRangeOnFirstSelection={false}
      ranges={[{ ...props.dates, key: 'selection' }]}
      rangeColors={[theme.brand[500]]}
    />
  )
}

interface HookDateRangePickerProps {
  name: string
}

export const HookedDateRangePicker = (props: HookDateRangePickerProps) => {
  const { register, watch, setValue, formState: { errors } } = useFormContext()

  useEffect(() => {
    register(props.name)
  }, [register])

  const handleChange = (range: OnChangeProps) => {
    const values = { ...(range as IRangeProp).selection }
    setValue(props.name, {
      startDate: values.startDate,
      endDate: values.endDate,
    })
  }

  return (
    <div>
      <StyledDateRange
        onChange={handleChange}
        moveRangeOnFirstSelection={false}
        ranges={[{ ...watch(props.name), key: 'selection' }]}
        rangeColors={[theme.brand[500]]}
      />
      <ErrorMsg error={errors[props.name]?.message} />
    </div>
  )
}

const StyledDateRange = styled(DateRange)`
  & .rdrDayToday span:after {
    background: ${props => props.theme.brand[500]} !important;
    opacity: .5;
  }
`

export default DateRangePicker
