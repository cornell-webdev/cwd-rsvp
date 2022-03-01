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
  url: `/public/seller/event/${eventId}/stats?isReversed=${isReversed}&isShowAll=${isShowAll}&filterString=${filterString}`,
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

const eventSellersConfig = (eventId: string) => ({
  url: `/public/seller/event/${eventId}`,
})

export const useEventSeller = (eventId: string) => {
  const { data: sellers, ...rest } = useCustomQuery<ISeller[]>(eventSellersConfig(eventId))

  return {
    ...rest,
    sellers,
  }
}

const sellerByIdConfig = (sellerId: string) => ({
  url: `/public/seller/${sellerId}`,
  options: {
    enabled: !!sellerId && sellerId?.length > 0 && sellerId !== 'undefined',
  },
})

export const useSellerById = (sellerId: string) => {
  const { data: seller, ...rest } = useCustomQuery<ISeller>(sellerByIdConfig(sellerId))

  return {
    ...rest,
    seller,
  }
}
