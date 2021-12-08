import React, { useState } from 'react'
import styled from 'styled-components'
import uploadFile from 'src/firebase/uploadFile'
import Loading from 'src/components/Loading'
import { Text } from 'cornell-glue-ui'

export interface IImageUploadProps {
  urls: string[]
  setUrls: (urls: string[]) => void
  uploadPath?: string
}

const ImageUpload = ({ uploadPath = '/temp', urls, setUrls }: IImageUploadProps) => {
  const [loading, setLoading] = useState(false)

  const handleUploadFile = (file: File) =>
    new Promise((resolve, reject) => {
      uploadFile(file, uploadPath)
        .then((url: string) => {
          setUrls([...urls, url])
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

  return (
    <Container>
      <input type='file' onChange={handleUpload} multiple />
      {loading ? <Loading /> : <div />}
      {urls?.map((url) => (
        <Text key={url}>{url}</Text>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

export default ImageUpload
