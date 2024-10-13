import { GetFileUrlOutput, UploadFileOutput } from '@/@types/file'
import { storageSystemApi } from '../axios'

export function useFilesService() {
  async function uploadFileService(formData: FormData) {
    const { data } = await storageSystemApi.postForm<UploadFileOutput>(
      '/api/files/upload',
      formData,
    )

    return data
  }

  async function getFileUrlService(anId: string) {
    const { data } = await storageSystemApi.get<GetFileUrlOutput>(
      '/api/files/url/{fileId}',
      {
        routeParams: { fileId: anId },
      },
    )

    return data
  }

  async function deleteFileService(anId: string) {
    const { data } = await storageSystemApi.delete(
      '/api/files/delete/{fileId}',
      {
        routeParams: { fileId: anId },
      },
    )

    return data
  }

  return { getFileUrlService, uploadFileService, deleteFileService }
}
