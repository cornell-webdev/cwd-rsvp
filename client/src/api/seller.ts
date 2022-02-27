import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { ISeller, ISellerStat } from 'src/types/seller.type'

interface IGenerateSellerVariables {
  eventId: string
  fullName: string
  netId: string
}

export const useGenerateSeller = () => {
  const { mutateAsync: generateSellerAsync, ...rest } = useCustomMutation<
    ISeller,
    IGenerateSellerVariables
  >({
    url: '/public/seller/generate',
    method: 'put',
  })

  return {
    ...rest,
    generateSellerAsync,
  }
}

const sellerStatsConfig = (
  eventId: string,
  isReversed: boolean,
  isShowAll: boolean,
  filterString: string
) => ({
  url: `/public/seller/event/${eventId}?isReversed=${isReversed}&isShowAll=${isShowAll}&filterString=${filterString}`,
})

export const useSellerStats = (
  eventId: string,
  isReversed: boolean,
  isShowAll: boolean,
  filterString: string
) => {
  const { data: sellerStats, ...rest } = useCustomQuery<ISellerStat[]>(
    sellerStatsConfig(eventId, isReversed, isShowAll, filterString)
  )

  return {
    ...rest,
    sellerStats,
  }
}
