import { BlurInput } from "../lib/BlurInput"

type PixelInputProps = {
  value : number,
  step? : number,
  min?  : number,
  onChange? : (value: number) => void
}

export const PixelInput = ({ value, step, min, onChange } : PixelInputProps) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch(e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (typeof step === 'number' && onChange) onChange(value + step)
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (typeof step === 'number' && onChange) {
          const next = value - step;
          onChange(typeof min === 'number' && next < min ? min : next);
        }
        break;
    }
  }

  return <BlurInput
    value={value.toString()}
    shouldAcceptChange={v => !isNaN(parseFloat(v))}
    onChange={v => onChange ? onChange(parseFloat(v)) : null}
    onKeyDown={onKeyDown}
    style={{ width: '50px' }}
  />
}