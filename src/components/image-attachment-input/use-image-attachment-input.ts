import { filesQueryKey } from '@/constants/query-key/file-query-key'
import { useFilesService } from '@/services/files'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageAttachmentInputProps {
  fileId: string | undefined
  setFileId: Dispatch<SetStateAction<string | undefined>>
}

export function useImageAttachmentInput({
  fileId,
  setFileId,
}: ImageAttachmentInputProps) {
  const { uploadFileService, getFileUrlService, deleteFileService } =
    useFilesService()

  const { data: fileData } = useQuery({
    queryKey: [filesQueryKey.GET_FILE_BY_ID, fileId],
    queryFn: async () => (fileId ? await getFileUrlService(fileId) : null),
    enabled: fileId !== undefined,
  })

  const { mutateAsync: handleUploadFile } = useMutation({
    mutationFn: async (data: FormData) => await uploadFileService(data),
    onSuccess: (data) => {
      setFileId(data.id)
    },
  })

  const { mutateAsync: handleDeleteFile } = useMutation({
    mutationFn: async (anId: string) => {
      await deleteFileService(anId)
    },
    onSuccess: () => {
      setFileId(undefined)
    },
  })

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = new FormData()

    formData.append('file', acceptedFiles[0])

    await handleUploadFile(formData)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return {
    fileData,
    handleDeleteFile,
    getRootProps,
    getInputProps,
    isDragActive,
  }
}
