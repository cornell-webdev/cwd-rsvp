import React, { InputHTMLAttributes, forwardRef } from 'react'

import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import ErrorMsg from '../fonts/ErrorMsg'
import Label from '../fonts/Label'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onEnterPress?: () => void
  width?: number
  fullWidth?: boolean
  label?: string
  value?: any
  placeholder?: string
  autoFocus?: boolean
  error?: string
  className?: string
  isSmall?: boolean
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props: TextFieldProps, ref) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && props?.onEnterPress) {
        e.preventDefault()
        props?.onEnterPress()
      }
    }

    const passedProps = { ...props }
    delete passedProps.onEnterPress

    return (
      <TextFieldContainer>
        {props.label && <Label {...props}>{props.label}</Label>}
        <div>
          <StyledTextField
            {...passedProps}
            ref={ref}
            onKeyPress={handleKeyPress}
            error={props.error != null}
          />
        </div>
        <ErrorMsg error={props.error} />
      </TextFieldContainer>
    )
  }
)

TextField.displayName = 'TextField'

interface HookedTextFieldProps {
  width?: number
  fullWidth?: boolean
  label: string
  name: string
}

export const HookedInput = (props: HookedTextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <TextFieldContainer>
      <Label {...props}>{props.label}</Label>
      <div>
        <StyledTextField
          {...register(props.name)}
          error={errors[props.name] != null}
        />
      </div>
      <ErrorMsg error={errors[props.name]?.message} />
    </TextFieldContainer>
  )
}

const TextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

interface StyledTextFieldProps {
  fullWidth?: boolean
  error?: boolean
  isSmall?: boolean
}

const StyledTextField = styled.input<StyledTextFieldProps>`
  flex: 1 0 auto;
  background: ${(props) => props.theme.bg};
  font-weight: 400;
  font-size: 1rem;
  border: 2px solid ${(props) => props.theme.border.dark};
  border-radius: 4px;
  padding: 8px 12px;
  transition: border 0.1s ease-in-out;
  box-shadow: none;

  // disabled
  background: ${(props) => props.disabled && props.theme.bg.wash};

  // width
  width: ${(props) => props.width && `${props.width}px`};

  // fullWidth
  width: ${(props) => props.fullWidth && '100%'};

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

export default TextField
