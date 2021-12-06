import React, { forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import ErrorMsg from './ErrorMsg'
import Label from './Label'

interface InputProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onEnterPress?: () => void
  width?: number
  label?: string
  value?: any
  placeholder?: string
  autoFocus?: boolean
  error?: string
  className?: string
  isSmall?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && props?.onEnterPress) {
      e.preventDefault()
      props?.onEnterPress()
    }
  }

  const passedProps = { ...props }
  delete passedProps.onEnterPress

  return (
    <InputContainer>
      {props.label && <Label>{props.label}</Label>}
      <div>
        <StyledInput
          {...passedProps}
          ref={ref}
          onKeyPress={handleKeyPress}
          error={props.error != null}
        />
      </div>
      <ErrorMsg error={props.error} />
    </InputContainer>
  )
})

Input.displayName = 'Input'

interface HookedInputProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  width?: number
  label: string
  name: string
}

export const HookedInput = (props: HookedInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <InputContainer>
      <Label>{props.label}</Label>
      <div>
        <StyledInput {...props} {...register(props.name)} error={errors[props.name] != null} />
      </div>
      <ErrorMsg error={errors[props.name]?.message} />
    </InputContainer>
  )
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

interface StyledInputProps {
  error?: boolean
  isSmall?: boolean
}

const StyledInput = styled.input<StyledInputProps>`
  flex: 1 0 auto;
  font-weight: normal;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 0.4rem;
  transition: border 0.1s ease-in-out;
  box-shadow: none;
  width: 100%;

  // disabled
  background: ${(props) => props.disabled && props.theme.bg.wash};

  // width
  width: ${(props) => props.width && `${props.width}px`};

  // error
  border-color: ${(props) => props.error && props.theme.danger[500]};

  &:focus {
    border-color: ${(props) => props.theme.brand[500]};
  }

  &::placeholder {
    color: ${(props) => props.theme.textPlaceholder};
  }

  // isSmall
  padding: ${(props) => props.isSmall && '1px 4px'};
`

export default Input
