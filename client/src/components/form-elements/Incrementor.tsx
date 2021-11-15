import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import ErrorMsg from 'src/components/fonts/ErrorMsg'
import useIsMobile from 'src/hooks/useIsMobile'
import styled from 'styled-components'
import Text from '../fonts/Text'
import { FlexRow } from '../layout/Flex'
import Space from '../layout/Space'

interface IncrementorProps {
  value: number
  label: string
  onChange: (newValue: number) => void
  minValue?: number
  maxValue?: number
  step?: number
}

const Incrementor = ({
  value,
  label,
  onChange,
  minValue,
  maxValue,
  step = 1,
}: IncrementorProps) => {
  const isMobile = useIsMobile()
  const handleMinusClick = () => {
    const newValue = value - step
    if (minValue !== undefined) {
      onChange(Math.max(minValue, newValue))
    } else {
      onChange(newValue)
    }
  }

  const handlePlusClick = () => {
    const newValue = value + step
    if (maxValue !== undefined) {
      onChange(Math.min(maxValue, newValue))
    } else {
      onChange(newValue)
    }
  }

  return (
    <FlexRow
      alignCenter
      justifySpaceBetween
      fullWidth
    >
      <Text
        variant={isMobile ? 'h4' : 'p'}
        fontWeight={500}
      >
        {label}
      </Text>
      <FlexRow alignCenter>
        <IconButton onClick={handleMinusClick}>
          <StyledRemove />
        </IconButton>
        <Space padding='0 .5rem' />
        <div style={{ width: '20px' }}>
          <FlexRow justifyCenter>
            <Text variant='h4'>{value}</Text>
          </FlexRow>
        </div>
        <Space padding='0 .5rem' />
        <IconButton onClick={handlePlusClick}>
          <StyledAdd />
        </IconButton>
      </FlexRow>
    </FlexRow>
  )
}

interface HookedIncrementorProps {
  name: string
  label: string
}

export const HookedIncrementor = (props: HookedIncrementorProps) => {
  const { register, setValue, formState: { errors }, watch } = useFormContext()

  useEffect(() => {
    register(props.name)
  }, [register])

  const handleChange = (newValue: number) => {
    setValue(props.name, newValue)
  }

  return (
    <div>
      <Incrementor
        value={watch(props.name)}
        onChange={handleChange}
        label={props.label}
      />
      <ErrorMsg error={errors[props.name]?.message} />
    </div>
  )
}

const StyledRemove = styled(RemoveCircleOutlineOutlinedIcon)`
  color: ${props => props.theme.brand[500]};
`

const StyledAdd = styled(AddCircleOutlineOutlinedIcon)`
  color: ${props => props.theme.brand[500]};
`

export default Incrementor
