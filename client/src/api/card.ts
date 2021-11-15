import { stringify } from 'query-string'
import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { ICard, IUseUpdateCardByIdOptions } from 'src/types/card.type'

export const fetchCards = (selectedTagIds?: string[]) => ({
  url: `/private/card?${stringify({ selectedTagIds })}`,
  options: {
    refetchOnWindowFocus: 'always',
  },
})

export const useCards = (selectedTagIds: string[]) => {
  const { data: cards, ...rest } = useCustomQuery<ICard[]>(fetchCards(selectedTagIds))

  return {
    ...rest,
    cards,
  }
}

export const fetchRepCards = () => ({
  url: `/private/card/reps`,
  options: {
    refetchOnWindowFocus: 'always',
  },
})

export const useRepCards = () => {
  const { data: cards, ...rest } = useCustomQuery<ICard[]>(fetchRepCards())

  return {
    ...rest,
    cards,
  }
}

export const useCreateCard = () => {
  const { mutateAsync: createCard, ...rest } = useCustomMutation<ICard>({
    url: '/private/card',
    method: 'post',
    localUpdates: [
      {
        queryConfigs: [fetchCards()],
        presetLogic: 'appendStart',
        // TODO: test this works
        refetchOnSettle: false,
      },
    ],
  })

  return {
    ...rest,
    createCard,
  }
}

export const useUpdateCardById = (cid: string, options?: IUseUpdateCardByIdOptions) => {
  const { mutateAsync: updateCard, ...rest } = useCustomMutation<ICard>({
    url: `/private/card/${cid}`,
    method: 'put',
    localUpdates: options?.isNotUpdateLocal
      ? undefined
      : [
          {
            queryConfigs: [fetchCards()],
            presetLogic: 'update',
            refetchOnSettle: options?.refetchOnSettle,
          },
        ],
  })

  return {
    ...rest,
    updateCard,
  }
}

export const useUpdateAndDequeCardById = (cid: string) => {
  const { mutateAsync: updateAndDequeCard, ...rest } = useCustomMutation<ICard>({
    url: `/private/card/${cid}`,
    method: 'put',
    localUpdates: [
      {
        queryConfigs: [fetchRepCards()],
        presetLogic: 'delete',
      },
    ],
  })

  return {
    ...rest,
    updateAndDequeCard,
  }
}

export const useDeleteCardById = (cid: string) => {
  const { mutateAsync: deleteCard, ...rest } = useCustomMutation<ICard>({
    url: `/private/card/${cid}`,
    method: 'put',
    localUpdates: [
      {
        queryConfigs: [fetchCards()],
        presetLogic: 'delete',
      },
    ],
  })

  return {
    ...rest,
    deleteCard,
  }
}
