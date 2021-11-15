import { ICodableTextareaBlock } from 'src/types/card.type'

export const isBlocksEmpty = (blocks: ICodableTextareaBlock[]) => {
  return (
    !blocks ||
    blocks?.length === 0 ||
    (blocks?.length === 1 && blocks[0]?.value === '')
  )
}
