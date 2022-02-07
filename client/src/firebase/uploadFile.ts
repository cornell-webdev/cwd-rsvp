import Compressor from 'compressorjs'
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDOTFJSRWLj2et6H0KH7Blb60lyejmhhqs',
  authDomain: 'rsvp-333720.firebaseapp.com',
  projectId: 'rsvp-333720',
  storageBucket: 'rsvp-333720.appspot.com',
  messagingSenderId: '50488861870',
  appId: '1:50488861870:web:1f6121ef962cc35b5af93f',
  measurementId: '${config.measurementId}',
}

const firebase = initializeApp(firebaseConfig)

// REJECT: Upload error
// RESOLVE: Img download url
const uploadFile = (file: any, path: string) =>
  new Promise<string>((resolve, reject) => {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = getStorage(firebase)

    // Create a storage reference from our storage service
    const fullPath = `${path}/${file.name}`
    const storagePathRef = ref(storage, fullPath)

    // eslint-disable-next-line
    new Compressor(file, {
      quality: 0.7,
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
    })
  })

export default uploadFile
