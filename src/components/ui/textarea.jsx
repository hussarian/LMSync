"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ImagePlus, X } from "lucide-react"

const Textarea = React.forwardRef(({ className, allowImages = false, onImagesChange, ...props }, ref) => {
  const [images, setImages] = React.useState([])
  const fileInputRef = React.useRef(null)

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = []

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const newImage = {
            id: Date.now() + Math.random(),
            file: file,
            url: event.target.result,
            name: file.name,
          }
          newImages.push(newImage)

          if (newImages.length === files.length) {
            const updatedImages = [...images, ...newImages]
            setImages(updatedImages)
            if (onImagesChange) {
              onImagesChange(updatedImages)
            }
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeImage = (imageId) => {
    const updatedImages = images.filter((img) => img.id !== imageId)
    setImages(updatedImages)
    if (onImagesChange) {
      onImagesChange(updatedImages)
    }
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            allowImages && "pb-10",
            className,
          )}
          ref={ref}
          {...props}
        />
        {allowImages && (
          <div className="absolute bottom-2 right-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              title="이미지 첨부"
            >
              <ImagePlus className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        )}
      </div>

      {allowImages && images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.name}
                className="w-20 h-20 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removeImage(image.id)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
