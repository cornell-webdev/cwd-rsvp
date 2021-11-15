import React from 'react'
import styled from 'styled-components'

interface ITab {
  label: string
  value: string
}

interface TabsProps {
  tabs: ITab[]
  currentValue: string
  setTab: (tab: string) => void
}

const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.borderLight};
`

interface TabListItemProps {
  isActive: boolean
}

const TabListItem = styled.div<TabListItemProps>`
  padding: .5rem 1rem;
  color: ${(props) => props.theme.textMuted};
  border-bottom: 2px solid ${(props) => props.theme.bg};
  font-weight: 400;
  cursor: pointer;

  // isActive
  border-color: ${(props) => props.isActive && props.theme.brand[500]};
  color: ${(props) => props.isActive && props.theme.text.default};
  font-weight: ${(props) => props.isActive && 500};
`

const Tabs = ({ tabs, currentValue, setTab }: TabsProps) => {
  const handleClick = (value: string) => {
    setTab(value)
  }

  return (
    <TabList>
      {tabs?.map(({ label, value }) => (
        <TabListItem
          key={value}
          isActive={currentValue === value}
          onClick={() => handleClick(value)}
        >
          {label}
        </TabListItem>
      ))}
    </TabList>
  )
}

export default Tabs
