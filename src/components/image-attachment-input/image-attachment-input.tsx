import { cn } from '@/utils/class-name'
import { ImageUp, X } from 'lucide-react'
import { TooltipContent, TooltipRoot, TooltipTrigger } from '../ui/tooltip'
import {
  useImageAttachmentInput,
  UseImageAttachmentInputProps,
} from './use-image-attachment-input'

interface ImageAttachmentInputProps extends UseImageAttachmentInputProps {
  errorMessage?: string
}

export function ImageAttachmentInput({
  files,
  setFiles,
  errorMessage,
  maxFiles,
}: ImageAttachmentInputProps) {
  const {
    removeFile,
    getInputProps,
    getRootProps,
    isDragActive,
    isMaxFilesReached,
  } = useImageAttachmentInput({ files, setFiles, maxFiles })

  return (
    <div className="space-y-2">
      <div
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-4 rounded-sm border-2 border-dashed border-input bg-white dark:bg-background py-8',
          isMaxFilesReached && 'opacity-50 cursor-default',
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
      {files &&
        files.map((file, index) => {
          const imageUrl = URL.createObjectURL(file)

          return (
            <div
              className="flex items-center justify-between rounded-sm border-2 border-dashed border-input bg-white px-2 py-1"
              key={file.name + index}
            >
              <img
                className="size-14 rounded-sm object-cover"
                src={imageUrl}
                alt="uploaded-file"
              />
              <TooltipRoot>
                <TooltipTrigger
                  asChild
                  onClick={() => removeFile(file.name, index)}
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
          )
        })}
    </div>
  )
}
