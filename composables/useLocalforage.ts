import localforage from 'localforage'

const saveImage = async (imageData: Blob, imageName: string): Promise<void> => {
  await localforage.setItem(imageName, imageData)
}

const getImage = async (imageName: string): Promise<Blob | null> => {
  return await localforage.getItem(imageName)
}

const deleteImage = async (imageName: string): Promise<void> => {
  await localforage.removeItem(imageName)
}

export { saveImage, getImage, deleteImage }
