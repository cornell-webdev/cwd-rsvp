import Compressor from 'compressorjs'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

// REJECT: Upload error
// RESOLVE: Img download url
const uploadFile = (file: any, path: string) =>
  new Promise<string>((resolve, reject) => {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = getStorage()

    // Create a storage reference from our storage service
    const fullPath = `${path}/${file.name}`
    const storagePathRef = ref(storage, fullPath)

    // check if file already exists in storage
    getDownloadURL(storagePathRef)
      .then((url: string) => {
        resolve(url)
      })
      .catch(() => {
        // file doesn't already exist in storage
        // upload file after compression

        // eslint-disable-next-line
        new Compressor(file, {
          quality: 0.6,
          convertSize: 1,
          success(compressedFile) {
            const uploadTask = uploadBytesResumable(storagePathRef, compressedFile)
            uploadTask.on(
              'state_changed',
              () => {},
              (error) => {
                reject(error)
              },
              () => {
                // successfully uploaded
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  resolve(downloadURL)
                })
              }
            )
          },
          error(error) {
            reject(error)
          },
        })
      })
  })

export default uploadFile
