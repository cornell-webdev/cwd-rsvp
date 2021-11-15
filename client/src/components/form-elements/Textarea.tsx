import React, { forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'
import ResizedTextarea, { TextareaAutosizeProps } from 'react-textarea-autosize'
import ErrorMsg from 'src/components/fonts/ErrorMsg'
import Label from 'src/components/fonts/Label'
import styled from 'styled-components'

interface TextareaProps extends TextareaAutosizeProps {
  maxRows?: number
  minRows?: number
  label?: string
  error?: string
  className?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props: TextareaProps, ref) => {
  return (
    <div className={props.className}>
      {props.label && <Label {...props}>{props.label}</Label>}
      <div>
        <StyledTextarea {...props} ref={ref} />
      </div>
      <ErrorMsg error={props.error} />
    </div>
  )
})

Textarea.displayName = 'Textarea'

interface HookedInputProps {
  maxRows?: number
  minRows?: number
  label?: string
  name: string
}

export const HookedTextarea = (props: HookedInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div>
      <Label {...props}>{props.label}</Label>
      <div>
        <StyledTextarea {...register(props.name)} {...props} />
      </div>
      <ErrorMsg error={errors[props.name]?.message} />
    </div>
  )
}

const StyledTextarea = styled(ResizedTextarea)<TextareaProps>`
  width: 100%;
  background: ${(props) => props.theme.bg};
  font-size: 1rem;
  font-family: inherit;
  border: 2px solid ${(props) => props.theme.border.dark};
  border-radius: 4px;
  line-height: 1.5;
  padding: 0.5rem;
  overflow-y: auto;
  transition: border 0.1s ease-in-out;
  -webkit-appearance: none;

  // disabled
  background: ${(props) => props.disabled && props.theme.bg.wash};

  // error
  border-color: ${(props) => props.error != null && props.theme.danger[500]};

  &:placeholder {
    color: ${(props) => props.theme.textPlaceholder};
  }

  &:focus {
    border-color: ${(props) => props.theme.brand[500]};
  }
`

export default Textarea
