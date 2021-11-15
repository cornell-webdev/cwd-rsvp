import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined'
import React, { memo } from 'react'
import { useDeleteCardById, useUpdateCardById } from 'src/api/card'
import { ICard, ICardStatus } from 'src/types/card.type'
import styled from 'styled-components'
import IconButton from '../buttons/IconButton'
import Menu, { IOption } from '../Menu'

interface CardMenuProps {
  status: ICardStatus
  setStatus: React.Dispatch<React.SetStateAction<ICardStatus>>
  card: ICard
}

const CardMenu = ({ status, setStatus, card }: CardMenuProps) => {
  const { deleteCard } = useDeleteCardById(card?._id)
  const { updateCard } = useUpdateCardById(card?._id)

  const commonOptions: IOption[] = [
    {
      label: card?.isLearning ? 'Archive' : 'Learn',
      onClick: () => {
        if (card?.isLearning) {
          updateCard({
            _id: card?._id,
            isLearning: false,
          })
        } else {
          updateCard({
            _id: card?._id,
            isLearning: true,
          })
        }
      },
    },
    {
      label: 'Swap sides',
      onClick: () =>
        updateCard({
          _id: card?._id,
          question: card?.answer,
          answer: card?.question,
        }),
    },
    {
      label: 'Review faster',
      onClick: () => {
        // halve rep space, rep at tomorrow
        updateCard({
          _id: card?._id,
          repSpace: Math.ceil(card?.repSpace / 2),
          repAt: new Date().setDate(new Date().getDate() + 1),
        })
      },
    },
    {
      label: 'Delete',
      onClick: () => deleteCard({ _id: card?._id, isDeleted: true }),
    },
  ]

  const menuOptions: IOption[] =
    status === 'EDITING'
      ? [...commonOptions]
      : [
          {
            label: 'Edit',
            onClick: () => setStatus('EDITING'),
          },
          ...commonOptions,
        ]

  return (
    <Container>
      <Menu options={menuOptions} offset={10}>
        <IconButton icon={<MoreVertOutlinedIcon />} buttonSize='small' />
      </Menu>
    </Container>
  )
}

const Container = styled.div``

export default memo(CardMenu)
