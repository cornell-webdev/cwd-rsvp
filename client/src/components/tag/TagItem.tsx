import ObjectId from 'bson-objectid'
import React, { useRef, useState } from 'react'
import theme from 'src/app/theme'
import Flag from '../flags/Flag'
import TextField from '../form-elements/TextField'
import { FlexRow } from '../layout/Flex'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import { IconButton } from '@material-ui/core'
import styled from 'styled-components'
import { useCreateTag } from 'src/api/tag'

interface TagItemProps {
  label?: string
  isSelected?: boolean
  isCreate?: boolean
  onClick?: React.MouseEventHandler
}

const TagItem = ({ label, isSelected, isCreate, onClick }: TagItemProps) => {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [localLabel, setLocalLabel] = useState<string>('')
  const { createTag } = useCreateTag()

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLocalLabel(event.target.value)
  }

  const handleCreateClick = () => {
    setIsCreating(true)
  }

  const handleClose = () => {
    setIsCreating(false)
  }

  const handleCreateTag = () => {
    if (localLabel?.length > 0) {
      createTag({
        _id: new ObjectId().toHexString(),
        label: localLabel,
      })
      setLocalLabel('')
      setIsCreating(false)
    }
  }

  const textFieldRef = useRef<HTMLInputElement>(null)

  if (label && !isCreate) {
    return (
      <Flag
        label={label}
        color={isSelected ? theme.grey[0] : theme.brand[400]}
        background={isSelected ? theme.brand[400] : theme.grey[0]}
        borderColor={theme.brand[400]}
        onClick={onClick}
        size='small'
      />
    )
  }

  if (isCreating) {
    return (
      <FlexRow alignCenter>
        <TextField
          isSmall
          value={localLabel}
          onChange={handleTextFieldChange}
          onEnterPress={handleCreateTag}
          autoFocus
          ref={textFieldRef}
          onClick={() => textFieldRef.current?.focus()}
        />
        <StyledIconButton size='small' color='inherit' onClick={handleClose}>
          <CloseOutlinedIcon fontSize='small' />
        </StyledIconButton>
      </FlexRow>
    )
  }

  return (
    <Flag
      onClick={handleCreateClick}
      label='+ New tag'
      color={theme.grey[0]}
      background={theme.brand[400]}
      size='small'
    />
  )
}

const StyledIconButton = styled(IconButton)`
  margin-left: 0.5rem !important;
`

export default TagItem
