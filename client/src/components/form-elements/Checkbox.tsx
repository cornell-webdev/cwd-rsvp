import { FlexContainer } from 'cornell-glue-ui'
import React, { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import ErrorMsg from './ErrorMsg'
import Label from './Label'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Checkbox = (props: CheckboxProps) => {
  return (
    <FlexContainer alignCenter>
      <StyledCheckbox>
        <input {...props} type='checkbox' />
        <span />
      </StyledCheckbox>
      <Label>{props.label}</Label>
    </FlexContainer>
  )
}

interface HookedCheckboxProps {
  label: string
  name: string
}

export const HookedCheckbox = (props: HookedCheckboxProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div>
      <FlexContainer alignCenter>
        <StyledCheckbox>
          <input {...register(props.name)} type='checkbox' />
          <span />
        </StyledCheckbox>
        <Label>{props.label}</Label>
      </FlexContainer>
      <ErrorMsg error={errors[props.name]?.message} />
    </div>
  )
}

const StyledCheckbox = styled.label`
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
    box-shadow: none;
    outline: none;
    opacity: 0;
    transform: scale(1);
    pointer-events: none;
    transition: opacity 0.3s, transform 0.2s;
  }

  /* Span */
  & > span {
    display: flex;
    width: 100%;
    cursor: pointer;
  }

  /* Box */
  & > span::before {
    content: '';
    display: inline-block;
    box-sizing: border-box;
    margin: 3px 11px 3px 1px;
    border: solid 2px; /* Safari */
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    border-radius: 2px;
    width: 18px;
    height: 18px;
    vertical-align: top;
    transition: border-color 0.2s, background-color 0.2s;
    flex-shrink: 0;
  }

  /* Checkmark */
  & > span::after {
    content: '';
    display: block;
    position: absolute;
    top: 3px;
    left: 1px;
    width: 10px;
    height: 5px;
    border: solid 2px transparent;
    border-right: none;
    border-top: none;
    transform: translate(4px, 5px) rotate(-45deg);
  }

  /* Checked, Indeterminate */
  & > input:checked,
  & > input:indeterminate {
    background-color: ${(props) => props.theme.brand[500]};
  }

  & > input:checked + span::before,
  & > input:indeterminate + span::before {
    border-color: ${(props) => props.theme.brand[500]};
    background-color: ${(props) => props.theme.brand[500]};
  }

  & > input:checked + span::after,
  & > input:indeterminate + span::after {
    border-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
  }

  & > input:indeterminate + span::after {
    border-left: none;
    transform: translate(4px, 3px);
  }

  /* Hover, Focus */
  &:hover > input {
    opacity: 0.04;
  }

  & > input:focus {
    opacity: 0;
  }

  &:hover > input:focus {
    opacity: 0.12;
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

  & > input:checked:active + span::before {
    border-color: transparent;
    background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
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

  & > input:checked:disabled + span::before,
  & > input:indeterminate:disabled + span::before {
    border-color: transparent;
    background-color: currentColor;
  }
`

export default Checkbox
