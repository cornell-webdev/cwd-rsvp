export interface IAuthState {
  accessToken: string | null
  redirectUrl?: string
}

export interface IAppState {
  isHide: boolean
}

export interface ISnackbarState {
  isOpen: boolean
  snackPack: ISnackbar[]
  currentSnack?: ISnackbar | undefined
}

export interface ISnackbar {
  key: number
  variant: ISnackbarVariant
  message: string
}

export type ISnackbarVariant = 'error' | 'warning' | 'info' | 'success'

export interface IRootState {
  authState: IAuthState
}
