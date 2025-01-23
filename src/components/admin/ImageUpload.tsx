import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  image: File | null;
  onImageChange: (file: File | null) => void;
}

export function ImageUpload({ image, onImageChange }: ImageUploadProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Design Image</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <span>Upload a file</span>
              <input
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={(e) => onImageChange(e.target.files?.[0] || null)}
              />
            </label>
          </div>
          {image && <p className="text-sm text-gray-500">{image.name}</p>}
          <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
        </div>
      </div>
    </div>
  );
}