import { useEffect, useState } from "react"
import { Input } from "../lib/Input"

type PixelInputProps = {
  value : number,
  step? : number,
  min?  : number,
  onChange? : (value: number) => void
}

export const PixelInput = ({ value, step, min, onChange } : PixelInputProps) => {
  // Bind value to state
  const [ state, setState ] = useState<string>(value.toString())
  useEffect(() => setState(value.toString()), [ value ])

  // Special key controls
  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch(e.key) {
      case 'Enter':
        e.currentTarget.blur();
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (typeof step === 'number') setState(s => (step + parseFloat(s)).toString())
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (typeof step === 'number') setState(s => {
          const next = step + parseFloat(s);

          return (typeof min === 'number' && next < min ? min : next).toString();
        })
        break;
    }
  }

  return <Input
    value={state}
    onChange={e => setState(e.target.value)}
    onKeyDown={keyDownHandler}
    onFocus={e => e.target.select()}
    onBlur={() => {
      const newValue = parseFloat(state)
      // Either update the value (sends up onChange)
      if (!isNaN(newValue)
        && (typeof min !== 'number' || newValue >= min)
      ) {
        if (onChange) onChange(newValue)
      }
      // or resets back to the current value
      else {
        setState(value.toString())
      }
    }}
  />
}