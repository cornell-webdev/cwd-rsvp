import React, { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import ErrorMsg from './ErrorMsg'
import styled from 'styled-components'

interface IOption {
  label: string
  value: any
}

interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  value: any
  setValue: (newValue: string) => void
  options: IOption[]
}

const RadioGroup = (props: RadioGroupProps) => {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    if ((e.target as HTMLInputElement).checked) {
      if (value === props.value) {
        // already checked, uncheck
        props.setValue('')
      } else {
        // check
        props.setValue(value)
      }
    }
  }

  return (
    <RadioGroupContainer>
      {props.options.map(({ value, label }) => (
        <RadioLabel key={value}>
          <input
            type='radio'
            value={value}
            checked={props.value === value}
            onChange={(e) => handleRadioChange(e)}
          />
          <span>{label}</span>
        </RadioLabel>
      ))}
    </RadioGroupContainer>
  )
}

interface HookedRadioGroupProps {
  name: string
  options: IOption[]
}

export const HookedRadioGroup = (props: HookedRadioGroupProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <RadioGroupContainer>
      {props.options.map(({ value, label }) => (
        <RadioLabel key={value}>
          <input {...register(props.name)} value={value} type='radio' readOnly />
          <span>{label}</span>
        </RadioLabel>
      ))}
      <ErrorMsg error={errors[props.name]?.message} />
    </RadioGroupContainer>
  )
}

const RadioGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const RadioLabel = styled.label`
  z-index: 0;
  position: relative;
  display: inline-block;
  color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
  font-family: var(
    --pure-material-font,
    'Roboto',
    'Segoe UI',
    BlinkMacSystemFont,
    system-ui,
    -apple-system
  );
  font-size: 16px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  margin: 0.2rem 0;

  /* Input */
  & > input {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    z-index: -1;
    position: absolute;
    left: -10px;
    top: -8px;
    display: block;
    margin: 0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    outline: none;
    opacity: 0;
    transform: scale(1);
    pointer-events: none;
    transition: opacity 0.3s, transform 0.2s;
  }

  /* Span */
  & > span {
    display: inline-block;
    width: 100%;
    cursor: pointer;
  }

  /* Circle */
  & > span::before {
    content: '';
    display: inline-block;
    box-sizing: border-box;
    margin: 2px 10px 2px 0;
    border: solid 2px; /* Safari */
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    vertical-align: top;
    transition: border-color 0.2s;
  }

  /* Check */
  & > span::after {
    content: '';
    display: block;
    position: absolute;
    top: 2px;
    left: 0;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: ${(props) => props.theme.brand[500]};
    transform: translate(5px, 5px) scale(0);
    transition: transform 0.2s;
  }

  /* Checked */
  & > input:checked {
    background-color: ${(props) => props.theme.brand[500]};
  }

  & > input:checked + span::before {
    border-color: ${(props) => props.theme.brand[500]};
  }

  & > input:checked + span::after {
    transform: translate(5px, 5px) scale(1);
  }

  /* Hover, Focus */
  &:hover > input {
    /* opacity: 0.04; */
  }

  & > input:focus {
    /* opacity: 0.12; */
  }

  &:hover > input:focus {
    /* opacity: 0.1; */
  }

  /* Active */
  & > input:active {
    opacity: 1;
    transform: scale(0);
    transition: transform 0s, opacity 0s;
  }

  & > input:active + span::before {
    border-color: ${(props) => props.theme.brand[500]};
  }

  /* Disabled */
  & > input:disabled {
    opacity: 0;
  }

  & > input:disabled + span {
    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
    cursor: initial;
  }

  & > input:disabled + span::before {
    border-color: currentColor;
  }

  & > input:disabled + span::after {
    background-color: currentColor;
  }
`

export default RadioGroup
