import { Dispatch, SetStateAction, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export interface UseImageAttachmentInputProps {
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
  maxFiles?: number
}

export function useImageAttachmentInput({
  files,
  setFiles,
  maxFiles = 1,
}: UseImageAttachmentInputProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles((currentFiles) => {
        const newFiles = [...currentFiles, ...acceptedFiles]
        if (newFiles.length > maxFiles) {
          return newFiles.slice(0, maxFiles)
        }
        return newFiles
      })
    },
    [maxFiles, setFiles],
  )

  const isMaxFilesReached = files.length >= maxFiles

  function removeFile(filename: string, indexToRemove: number) {
    setFiles((currentFiles) =>
      currentFiles.filter(
        (file, index) => !(file.name === filename && index === indexToRemove),
      ),
    )
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    disabled: isMaxFilesReached,
  })

  return {
    files,
    setFiles,
    removeFile,
    getRootProps,
    getInputProps,
    isDragActive,
    isMaxFilesReached,
  }
}
