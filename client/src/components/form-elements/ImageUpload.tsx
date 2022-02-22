import { FlexContainer } from 'cornell-glue-ui'
import React, { useState } from 'react'
import Loading from 'src/components/Loading'
import uploadFile from 'src/firebase/uploadFile'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Cancel'
import { Controller, useFormContext } from 'react-hook-form'
import ErrorMsg from './ErrorMsg'

export interface IImageUploadProps {
  urls: string[]
  setUrls: (urls: string[]) => void
  uploadPath?: string
  maxImgs?: number
}

const ImageUpload = ({ uploadPath = '/temp', urls, setUrls, maxImgs }: IImageUploadProps) => {
  const [loading, setLoading] = useState(false)

  const handleUploadFile = (file: File) =>
    new Promise<void>((resolve, reject) => {
      uploadFile(file, uploadPath)
        .then((url: string) => {
          if (maxImgs && urls.length === maxImgs) {
            const newUrls = [...urls]
            newUrls[0] = url
            setUrls(newUrls)
          } else {
            setUrls([...urls, url])
          }
          resolve()
        })
        .catch((error) => {
          setLoading(false)
          reject(error)
        })
    })

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLoading(true)
      const promises = Array.from(e.target.files)?.map((file) => handleUploadFile(file))
      await Promise.all(promises)
      setLoading(false)
    }
  }

  const removeUrl = (targetUrl: string) => {
    const newUrls = urls.filter((url) => url !== targetUrl)
    setUrls(newUrls)
  }

  return (
    <Container>
      <FlexContainer alignCenter>
        {!maxImgs ||
          (urls.length < maxImgs && (
            <input type='file' onChange={handleUpload} multiple accept='image/*' />
          ))}
        {loading ? <Loading /> : <div />}
      </FlexContainer>
      <ImgsRow>
        {urls?.map((url) => (
          <ImgContainer key={url}>
            <StyledImg src={url} />
            <StyledCloseIcon onClick={() => removeUrl(url)} />
          </ImgContainer>
        ))}
      </ImgsRow>
    </Container>
  )
}

export interface IHookedImageUploadProps {
  name: string
  uploadPath?: string
  maxImgs?: number
}

export const HookedImageUpload = ({ name, ...rest }: IHookedImageUploadProps) => {
  // TODO: integrate image upload with react-hook-form
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <ImageUpload
              {...rest}
              urls={field.value}
              setUrls={(urls: string[]) => field.onChange(urls)}
            />
          )
        }}
      />
      <ErrorMsg error={errors[name]?.message} />
    </div>
  )
}

const Container = styled.div``

const ImgsRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`

const StyledImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 6px;
  object-fit: cover;
  margin-right: 1rem;
  box-shadow: ${(props) => props.theme.shadow.default};
`

const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: -6px;
  right: 6px;
  cursor: pointer;
  fill: ${(props) => props.theme.text.default} !important;

  @media (min-width: ${(props) => props.theme.large}) {
    display: none !important;
  }
`

const ImgContainer = styled.div`
  position: relative;

  &:hover ${StyledCloseIcon} {
    display: inline-block !important;
  }
`

export default ImageUpload
