import React from 'react'
import { ITag } from 'src/types/tag.type'
import styled from 'styled-components'
import TagItem from './TagItem'
import ScrollContainer from 'react-indiana-drag-scroll'

interface TagListProps {
  tags: ITag[]
  selectedTagIds: string[]
  setSelectedTagIds?: React.Dispatch<React.SetStateAction<string[] | undefined>>
  isCreate?: boolean
  isFiltered?: boolean
}

const TagList = ({
  tags,
  selectedTagIds,
  setSelectedTagIds,
  isCreate,
  isFiltered,
}: TagListProps) => {
  const handleTagClick = (tid: string) => {
    if (setSelectedTagIds) {
      if (selectedTagIds.includes(tid)) {
        // unselect
        setSelectedTagIds((ids: string[] | undefined) => {
          if (ids) {
            const newIds = [...ids]
            newIds.splice(newIds.indexOf(tid), 1)
            return newIds
          }
          return ids
        })
      } else {
        // select
        setSelectedTagIds((ids) => ids && [...ids, tid])
      }
    }
  }

  return (
    <ScrollContainer>
      <Container>
        {tags
          ?.filter((tag) => !isFiltered || selectedTagIds.includes(tag?._id))
          ?.map((tag) => (
            <TagItem
              key={tag?._id}
              label={tag?.label}
              isSelected={selectedTagIds.includes(tag?._id)}
              onClick={
                setSelectedTagIds ? () => handleTagClick(tag?._id) : undefined
              }
            />
          ))}
        {!!isCreate && <TagItem isCreate />}
      </Container>
    </ScrollContainer>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 0.5rem;
  }
`

export default TagList
