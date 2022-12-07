import React, { useRef } from "react"
import { Button } from "./Button"

type FileButtonProps = {
  children : React.ReactNode | React.ReactNode[],
  color?: 'primary',
  onFileAdd? : (file: File) => void
};

export const FileButton = ({ children, color, onFileAdd }: FileButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return <>
    <Button
      color={color}
      onClick={() => fileInputRef.current?.click()}
    >
      {children}
    </Button>
    <input
      type="file"
      ref={fileInputRef}
      style={{ display: 'none' }}
      onChange={e => {
        const file = e.target.files?.[0]
        if (file && onFileAdd) onFileAdd(file)
        e.target.files = null;
      }}
    />
  </>
}