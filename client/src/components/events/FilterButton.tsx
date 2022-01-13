import { Tag } from 'cornell-glue-ui'
import React from 'react'
import { ITag } from 'src/types/tag.type'
import styled from 'styled-components'

interface IFilterProps {
  tag: ITag
  selectedTagId?: string
  onClick: (targetTagId: string) => void
}

const FilterButton = ({ tag, selectedTagId, onClick }: IFilterProps) => {
  return (
    <FilterButtonContainer onClick={() => onClick(tag?._id)}>
      <FilterTag
        variant={selectedTagId === tag?._id ? 'contained' : 'outlined'}
        color={tag.color}
        background={tag.backgroundColor}>
        {tag.name}
      </FilterTag>
    </FilterButtonContainer>
  )
}

const FilterButtonContainer = styled.button`
  margin-inline: 4.5px;
  background: transparent;
`

const FilterTag = styled(Tag)`
  cursor: pointer;
`

export default FilterButton
