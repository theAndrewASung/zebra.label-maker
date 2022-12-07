import { styled } from '@stitches/react'
import { useCallback, useEffect, useState } from 'react';
import { ImageElementPayload } from '../types';
import { addMouseMoveListenerFn } from './MiddlePane';

const ImageTag = styled('img', {
  position: 'absolute',
  border: '1px solid transparent',
  '&:hover': {
    // backgroundColor: '$slate2',
    borderColor: '$cyan8',
    pointer: 'default',
  },
  '&:focus': {
    backgroundColor: '$cyan2',
    borderColor: '$cyan9',
  },
});

type ImageElementProps = {
  payload: ImageElementPayload;
  onPayloadChange: (payloadUpdates: Partial<ImageElementPayload>) => void;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
  addMouseMoveListener: addMouseMoveListenerFn;
};

export const ImageElement = ({ payload, onPayloadChange, onClick, addMouseMoveListener }: ImageElementProps) => {

  // State
  const { x, y, width, height, url } = payload;

  // Drag and Drop
  const [ mousePosition, setMousePosition ] = useState<{
    mouseX: number;
    mouseY: number;
    textX: number;
    textY: number;
  } | null>(null);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    if (mousePosition) return;

    e.preventDefault(); // don't focus on input
    setMousePosition({
      mouseX: e.clientX,
      mouseY: e.clientY,
      textX: x,
      textY: y,
    });
  }, [ mousePosition, x, y ]);

  // onMouseMove on canvas
  useEffect(() => {
    if (!mousePosition) return;

    const removeListener = addMouseMoveListener((e: React.MouseEvent<HTMLDivElement>) => {
      onPayloadChange({
        x : mousePosition.textX + e.clientX - mousePosition.mouseX,
        y : mousePosition.textY + e.clientY - mousePosition.mouseY,
      });
    });

    return () => removeListener();
  }, [ mousePosition, addMouseMoveListener, onPayloadChange ]);

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    if (!mousePosition) return;

    setMousePosition(null);
  }, [mousePosition]);

  return <ImageTag
    src={url}
    alt={url}
    css={{
      top: y + 'px',
      left: x + 'px',
      width: width ? (width + 'px') : undefined,
      height: height ? (height + 'px') : undefined,
    }}
    onClick={onClick}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
  />
}