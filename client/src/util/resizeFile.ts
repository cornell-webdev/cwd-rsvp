import Resizer from 'react-image-file-resizer'

const resizeFile = (file: File | Blob, width: number, height: number) =>
  new Promise<string>((resolve) => {
    Resizer.imageFileResizer(
      file, // Is the file of the image which will resized.
      width, // Is the maxWidth of the resized new image.
      height, // Is the maxHeight of the resized new image.
      'WEBP', // Is the compressFormat of the resized new image.
      100, // Is the quality of the resized new image.
      0, // Is the degree of clockwise rotation to apply to uploaded image.
      (uri) => {
        resolve(uri as string)
      }
    )
  })

export default resizeFile
