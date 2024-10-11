import { storageSystemApi } from '../axios'

export function useFilesService() {
  async function uploadFileService(formData: FormData) {
    const { data } = await storageSystemApi.postForm(
      '/api/files/upload',
      formData,
    )
    return data
  }

  return {
    uploadFileService,
  }
}
