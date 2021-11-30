import { IDocument } from './index.type'

export interface ITag extends IDocument {
  name: string
  color?: string
  backgroundColor?: string
}
