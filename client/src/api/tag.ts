import useCustomQuery from 'src/hooks/useCustomQuery'
import { ITag } from 'src/types/tag.type'

export const allTagsQueryConfig = () => ({
  url: '/public/tag',
})

export const useAllTags = () => {
  const { data: tags, ...rest } = useCustomQuery<ITag[]>(allTagsQueryConfig())

  return {
    ...rest,
    tags,
  }
}

export const tagByIdQueryConfig = (id: string) => ({
  url: `/public/tag/${id}`,
})

export const useTagById = (id: string) => {
  const { data: tag, ...rest } = useCustomQuery<ITag[]>(tagByIdQueryConfig(id))

  return {
    ...rest,
    tag,
  }
}
