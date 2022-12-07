import React, { useEffect, useState } from "react"
import { Input } from "./Input"

type BlurInputProps = {
  value : string;
  style?: React.CSSProperties;
  shouldAcceptChange?: (value: string) => boolean;
  onChange? : (value: string) => void;
  onKeyDown? : (e: React.KeyboardEvent<HTMLInputElement>) => void
};

export const BlurInput = ({ value, style, shouldAcceptChange, onChange, onKeyDown }: BlurInputProps) => {
  const [ state, setState ] = useState<string>(value)
  useEffect(() => setState(value), [ value ])

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch(e.key) {
      case 'Enter':
        e.currentTarget.blur();
        break;
    }

    if (onKeyDown) onKeyDown(e);
  }

  return <Input
    value={state}
    style={style}
    onChange={e => setState(e.target.value)}
    onFocus={e => e.target.select()}
    onBlur={e => {
      const changedValue = e.target.value;
      if (shouldAcceptChange && !shouldAcceptChange(changedValue)) {
        setState(value)
      }
      else {
        setState(changedValue)
        if (onChange) onChange(changedValue)
      }
    }}
    onKeyDown={onKeyDownHandler}
  />
}