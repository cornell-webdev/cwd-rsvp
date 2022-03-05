import React from 'react'
import styled from 'styled-components'

interface IStatLabelProps {
  primaryCount: number
  secondaryCount: number
  label: string
}

const StatLabel = ({ primaryCount, secondaryCount, label }: IStatLabelProps) => {
  return (
    <Container>
      <PrimaryCount>{primaryCount}</PrimaryCount>
      <SecondaryCount> / {secondaryCount}</SecondaryCount>
      <Label>{label}</Label>
    </Container>
  )
}

const Container = styled.div``

const PrimaryCount = styled.span`
  font-size: 1.7rem;
  color: ${(props) => props.theme.text.default};
`

const SecondaryCount = styled.span`
  font-size: 1.7rem;
  color: ${(props) => props.theme.text.muted};
`

const Label = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.text.muted};
  font-weight: 300;
  margin-left: 0.75rem;
`

export default StatLabel
