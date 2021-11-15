import { toast } from 'react-toastify'

export interface IToastOptions {
  id: string
  variant: IToastVariant
  msg: string
}

type IToastVariant = 'info' | 'success' | 'warning' | 'error'

export const showToast = ({ id, variant, msg }: IToastOptions) => {
  toast[variant](msg, { toastId: id })
}
