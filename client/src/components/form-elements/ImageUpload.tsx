import { FlexContainer } from 'cornell-glue-ui'
import React, { useState } from 'react'
import Loading from 'src/components/Loading'
import uploadFile from 'src/firebase/uploadFile'
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Cancel'

export interface IImageUploadProps {
  urls: string[]
  setUrls: (urls: string[]) => void
  uploadPath?: string
}

const ImageUpload = ({ uploadPath = '/temp', urls, setUrls }: IImageUploadProps) => {
  const [loading, setLoading] = useState(false)

  const handleUploadFile = (file: File) =>
    new Promise<void>((resolve, reject) => {
      uploadFile(file, uploadPath)
        .then((url: string) => {
          setUrls([...urls, url])
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
        <input type='file' onChange={handleUpload} multiple accept='image/*' />
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
  fill: ${(props) => props.theme.text.default} !important;
  cursor: pointer;

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
