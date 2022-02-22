import DeleteIcon from '@mui/icons-material/Delete'
import { Button, FlexContainer, IconButton, Spacer } from 'cornell-glue-ui'
import React from 'react'
import DatePicker from 'src/components/form-elements/DatePicker'
import Select, { ISelectOption } from 'src/components/form-elements/Select'
import useIsMobile from 'src/hooks/useIsMobile'
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

  let timeOptions: ISelectOption[] = []

  for (let i = 0; i <= 1425; i += 5) {
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

  const endTimes = timeOptions.slice(96)
  const startTimes = timeOptions.slice(0, 96)
  timeOptions = [...endTimes, ...startTimes]

  const handleAddDate = () => {
    setDates([
      ...dates,
      {
        date: new Date(),
        startTime: '0800',
        endTime: '0800',
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

  const isMobile = useIsMobile()

  const handleDelete = (targetIdx: number) => {
    setDates(dates.filter((_, idx) => idx !== targetIdx))
  }

  return (
    <Container>
      {dates.map(({ date, startTime, endTime }, idx) => (
        <div key={`${date.toString()}${startTime}${endTime}`}>
          <DateRow alignCenter justifySpaceBetween={isMobile}>
            <DatePicker
              isHideYear={isMobile}
              date={new Date(date)}
              onChange={(date) => changeDate(idx, date)}
            />
            <Select
              value={timeOptions?.find((option) => option.value === startTime)}
              options={timeOptions}
              onChange={(selectedOption) =>
                handleTimeChange('start', selectedOption as ISelectOption, idx)
              }
              width={isMobile ? '105px' : '120px'}
              placeholder='Start'
            />
            <Select
              value={timeOptions?.find((option) => option.value === endTime)}
              options={timeOptions}
              onChange={(selectedOption) =>
                handleTimeChange('end', selectedOption as ISelectOption, idx)
              }
              width={isMobile ? '105px' : '120px'}
              placeholder='End'
            />
            {idx !== 0 ? (
              <IconButton type='button' icon={<DeleteIcon />} onClick={() => handleDelete(idx)} />
            ) : (
              <SpacePlaceholder />
            )}
          </DateRow>
          <Spacer y={1} />
        </div>
      ))}
      <Button variant='text' onClick={handleAddDate} type='button' size='small'>
        Add another date
      </Button>
    </Container>
  )
}

const Container = styled.div``

const SpacePlaceholder = styled.div`
  width: 40px;
`

const DateRow = styled(FlexContainer)`
  @media (min-width: ${(props) => props.theme.small}) {
    & > * {
      margin-right: 1rem;
    }
  }
`

export default DateAndTime
