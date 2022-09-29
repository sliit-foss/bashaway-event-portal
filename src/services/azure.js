import { BlobServiceClient } from '@azure/storage-blob'
import store from '../store'

const blobServiceClient = new BlobServiceClient(`https://${import.meta.env.VITE_AZURE_STORAGE_ACCOUNT}.blob.core.windows.net${import.meta.env.VITE_AZURE_SAS_TOKEN}`)
const containerClient = blobServiceClient.getContainerClient(`answers-${import.meta.env.VITE_APP_ENV}`)

export const uploadFile = async (file) => {
  const blockBlobClient = containerClient.getBlockBlobClient(`${store.getState().user?.name}/${Date.now().toLocaleString()}/${file.name}`)
  await blockBlobClient.uploadBrowserData(file)
  return blockBlobClient.url
}
