import { Button, FlexContainer, Spacer } from 'cornell-glue-ui'
import React, { useState } from 'react'
import DatePicker from 'src/components/form-elements/DatePicker'
import Select from 'src/components/form-elements/Select'
import { IEventDate } from 'src/types/event.type'
import styled from 'styled-components'

interface IDateAndTimeProps {}

const DateAndTime = ({}: IDateAndTimeProps) => {
  const [dates, setDates] = useState<IEventDate[]>([
    {
      date: new Date(),
      startTime: '0000',
      endTime: '0000',
    },
  ])

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

  // TODO: generate time options
  const timeOptions = [
    {
      label: '12:00am',
      value: '0000',
    },
  ]

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

  return (
    <Container>
      {dates.map(({ date, startTime, endTime }, idx) => (
        <div key={`${date.toString()}${startTime}${endTime}`}>
          <FlexContainer alignCenter justifySpaceBetween key={date.toString()}>
            <DatePicker date={date} onChange={(date) => changeDate(idx, date)} />
            <Select value={startTime} options={timeOptions} />
            <Select value={endTime} options={timeOptions} />
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
