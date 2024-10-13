import { cn } from '@/utils/class-name'
import { ImageUp, X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { TooltipContent, TooltipRoot, TooltipTrigger } from '../ui/tooltip'
import { useImageAttachmentInput } from './use-image-attachment-input'

interface ImageAttachmentInputProp {
  fileId: string | undefined
  setFileId: Dispatch<SetStateAction<string | undefined>>
  errorMessage?: string
}

export function ImageAttachmentInput({
  fileId,
  setFileId,
  errorMessage,
}: ImageAttachmentInputProp) {
  const {
    fileData,
    getInputProps,
    getRootProps,
    handleDeleteFile,
    isDragActive,
  } = useImageAttachmentInput({ fileId, setFileId })

  return (
    <div className="space-y-2">
      <div
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-4 rounded-sm border-2 border-dashed border-input bg-white py-8',
          isDragActive && 'border-primary',
        )}
        {...getRootProps()}
      >
        <input type="image" {...getInputProps()} />
        <ImageUp className="size-12 text-primary" />
        <p>
          Arraste e solte ou{' '}
          <span className="text-primary">Busque nos seus arquivos</span>
        </p>
      </div>
      {errorMessage && (
        <p className="text-sm font-medium text-red-500">{errorMessage}</p>
      )}
      {fileData && (
        <div className="flex items-center justify-between rounded-sm border-2 border-dashed border-input bg-white px-2 py-1">
          <img
            className="size-14 rounded-sm object-cover"
            src={fileData?.fileUrl}
            alt="uploaded-file"
          />
          <TooltipRoot>
            <TooltipTrigger
              asChild
              onClick={() => fileId && handleDeleteFile(fileId)}
            >
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-full transition hover:bg-input"
              >
                <X className="size-5 text-primary" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Remover Imagem</p>
            </TooltipContent>
          </TooltipRoot>
        </div>
      )}
    </div>
  )
}
