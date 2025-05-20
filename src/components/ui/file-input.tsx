import * as React from 'react'

import { cn } from '@/utils/class-name'
import { ImageUp } from 'lucide-react'

export interface FileInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
    ({ className, ...props }, ref) => {
        return (
            <div className="relative flex-1">
                <input
                    type="file"
                    id="file-upload"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    ref={ref}
                    {...props}
                />
                <label
                    htmlFor="file-upload"
                    className="flex items-center gap-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <span className='text-primary'><ImageUp /></span>
                    {props.placeholder}
                </label>
            </div>
        )
    },
)
FileInput.displayName = 'FileInput'

export { FileInput }
