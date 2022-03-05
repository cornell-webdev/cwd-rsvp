import React, { forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import ErrorMsg from './ErrorMsg'
import Label from './Label'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onEnterPress?: () => void
  width?: string | number
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
    <InputContainer width={props?.width}>
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

interface HookedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
    <InputContainer width={props?.width}>
      <Label>{props.label}</Label>
      <div>
        <StyledInput {...props} {...register(props.name)} error={errors[props.name] != null} />
      </div>
      <ErrorMsg error={errors[props.name]?.message} />
    </InputContainer>
  )
}

export interface IInputContainerProps {
  width: InputProps['width']
}

const InputContainer = styled.div<IInputContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;

  /* width */
  width: ${(props) => props.width && `${props.width}px`};
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
  background: ${(props) => props.disabled && props.theme.background.wash};

  // width
  width: ${(props) => props.width && `${props.width}px`};

  // error
  border-color: ${(props) => props.error && props.theme.text.error};

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
