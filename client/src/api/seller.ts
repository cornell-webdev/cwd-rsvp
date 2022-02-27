import useCustomMutation from 'src/hooks/useCustomMutation'
import { ISeller } from 'src/types/seller.type'

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
