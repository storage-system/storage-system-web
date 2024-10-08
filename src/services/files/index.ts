import { storageSystemApi } from '../axios'

export function useFilesService() {
  const baseUrl = '/files'

  async function uploadFileService(formData: FormData) {
    const { data } = await storageSystemApi.post(
      `${baseUrl}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return data
  }

  return {
    uploadFileService,
  }
}
