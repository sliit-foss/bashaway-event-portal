import { authUser } from "@/utils";
import { BlobServiceClient } from "@azure/storage-blob";

const secureBlobServiceClient = new BlobServiceClient(
  `https://${import.meta.env.VITE_AZURE_STORAGE_ACCOUNT}.blob.core.windows.net?${
    import.meta.env.VITE_AZURE_UPLOAD_SAS_TOKEN
  }`
);

const genericBlobServiceClient = new BlobServiceClient(
  `https://${import.meta.env.VITE_AZURE_GENERIC_STORAGE_ACCOUNT}.blob.core.windows.net?${
    import.meta.env.VITE_AZURE_GENERIC_UPLOAD_SAS_TOKEN
  }`
);

const secureContainerClient = secureBlobServiceClient.getContainerClient(import.meta.env.VITE_AZURE_STORAGE_CONTAINER);

const genericContainerClient = genericBlobServiceClient.getContainerClient(
  import.meta.env.VITE_AZURE_STORAGE_CONTAINER
);

const uploadFile = async (containerClient, file, path) => {
  const blockBlobClient = containerClient.getBlockBlobClient(path);
  await blockBlobClient.uploadBrowserData(file);
  return blockBlobClient.url?.split("?")[0];
};

export const uploadSubmission = async (file) => {
  return uploadFile(secureContainerClient, file, `${authUser()?.name}/${new Date().toISOString()}/${file.name}`);
};

export const uploadIdCard = async (teamName, userName, file) => {
  return uploadFile(genericContainerClient, file, `documents/${teamName}/${userName}-${file.name}`);
};
