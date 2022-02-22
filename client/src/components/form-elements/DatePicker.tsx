import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined'
import React, { useState } from 'react'
import { Calendar, OnChangeProps } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { Controller, useFormContext } from 'react-hook-form'
import { formatDate } from 'src/util/date'
import styled from 'styled-components'
import OutsideClickListener from '../util/OutsideClickListener'
import ErrorMsg from './ErrorMsg'

interface DatePickerProps {
  date: Date
  onChange: (date: Date) => void
  isHideYear?: boolean
}

const DatePicker = ({ date, onChange, isHideYear }: DatePickerProps) => {
  const [isShowing, setIsShowing] = useState<boolean>(false)

  const handleChange = (range: OnChangeProps) => {
    const date = new Date(range as Date)
    onChange(date)
  }

  return (
    <Container>
      <InputContainer onClick={() => setIsShowing(!isShowing)} isHideYear={isHideYear}>
        <DatepickerInput disabled value={formatDate(date, { isHideYear })} />
        <StyledCalendarIcon />
      </InputContainer>
      {isShowing && (
        <OutsideClickListener onOutsideClick={() => setIsShowing(!isShowing)}>
          <StyledCalendar date={date} onChange={handleChange} />
        </OutsideClickListener>
      )}
    </Container>
  )
}

interface HookDatePickerProps {
  name: string
}

export const HookedDatePicker = (props: HookDatePickerProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <div>
      <Controller
        name={props.name}
        control={control}
        render={({ field }) => {
          return <DatePicker {...field} date={field.value} />
        }}
      />
      <ErrorMsg error={errors[props.name]?.message} />
    </div>
  )
}

const Container = styled.div`
  position: relative;
`

interface IInputContainerProps {
  isHideYear?: DatePickerProps['isHideYear']
}

const InputContainer = styled.div<IInputContainerProps>`
  position: relative;
  width: 130px;
  cursor: pointer;

  /* isHideYear */
  width: ${(props) => props.isHideYear && '90px'};
`

const StyledCalendarIcon = styled(CalendarIcon)`
  position: absolute;
  right: 5px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  fill: ${(props) => props.theme.grey[700]} !important;
`

const DatepickerInput = styled.input`
  cursor: pointer;
  flex: 1 0 auto;
  font-weight: 500;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 0.4rem;
  transition: border 0.1s ease-in-out;
  box-shadow: none;
  width: 100%;

  &:hover {
    border-color: ${(props) => props.theme.brand[500]};
  }
`

const StyledCalendar = styled(Calendar)`
  position: absolute;
  top: 35px;
  z-index: 99;

  & .rdrDay {
    color: ${(props) => props.theme.brand[500]} !important;
  }
  & .rdrSelected {
    color: ${(props) => props.theme.brand[500]} !important;
  }
  & .rdrDayStartPreview {
    color: ${(props) => props.theme.brand[500]} !important;
  }
  & .rdrDayEndPreview {
    color: ${(props) => props.theme.brand[500]} !important;
  }
  & .rdrDayToday {
    color: ${(props) => props.theme.brand[500]} !important;
  }
  & .rdrDayToday span:after {
    background: ${(props) => props.theme.brand[500]} !important;
    opacity: 0.5;
  }

  & .rdrDayNumber span {
    color: ${(props) => props.theme.text.default};
    font-weight: 500;
  }
`

export default DatePicker
