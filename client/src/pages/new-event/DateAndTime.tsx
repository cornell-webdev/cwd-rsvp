import { Button, FlexContainer, Spacer } from 'cornell-glue-ui'
import React from 'react'
import DatePicker from 'src/components/form-elements/DatePicker'
import Select, { ISelectOption } from 'src/components/form-elements/Select'
import { IEventDate } from 'src/types/event.type'
import styled from 'styled-components'

interface IDateAndTimeProps {
  dates: IEventDate[]
  setDates: React.Dispatch<React.SetStateAction<IEventDate[]>>
}

const DateAndTime = ({ dates, setDates }: IDateAndTimeProps) => {
  const changeDate = (idx: number, newDate: Date) => {
    const newDates = dates.map((dateObj, i) => {
      if (i === idx) {
        return {
          ...dateObj,
          date: newDate,
        }
      }
      return dateObj
    })
    setDates(newDates)
  }

  const timeOptions: ISelectOption[] = []

  for (let i = 0; i <= 1425; i += 15) {
    let hours = Math.floor(i / 60)
    const minutesValue = i % 60
    const minutes = ('0' + minutesValue).slice(-2)

    const ampm = hours % 24 < 12 ? 'am' : 'pm'
    const value = ('0' + hours).slice(-2) + minutes
    hours = hours % 12
    if (hours === 0) {
      hours = 12
    }
    timeOptions.push({
      label: hours + ':' + minutes + ampm,
      value,
    })
  }

  const handleAddDate = () => {
    setDates([
      ...dates,
      {
        date: new Date(),
        startTime: '0000',
        endTime: '0000',
      },
    ])
  }

  const handleTimeChange = (
    variant: 'start' | 'end',
    selectedOption: ISelectOption,
    targetIdx: number
  ) => {
    const newDates = dates.map((date, idx) => {
      if (idx !== targetIdx) return date
      if (variant === 'start') {
        date.startTime = selectedOption.value
      } else {
        date.endTime = selectedOption.value
      }
      return date
    })
    setDates(newDates)
  }

  return (
    <Container>
      {dates.map(({ date, startTime, endTime }, idx) => (
        <div key={`${date.toString()}${startTime}${endTime}`}>
          <FlexContainer alignCenter justifySpaceBetween key={date.toString()}>
            <DatePicker date={date} onChange={(date) => changeDate(idx, date)} />
            <Select
              value={startTime}
              options={timeOptions}
              onChange={(selectedOption) => handleTimeChange('start', selectedOption, idx)}
            />
            <Select
              value={endTime}
              options={timeOptions}
              onChange={(selectedOption) => handleTimeChange('end', selectedOption, idx)}
            />
          </FlexContainer>
          <Spacer y={2} />
        </div>
      ))}
      <Button variant='text' onClick={handleAddDate}>
        Add another date
      </Button>
    </Container>
  )
}

const Container = styled.div``

export default DateAndTime
