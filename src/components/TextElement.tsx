import { styled } from '@stitches/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { addMouseMoveListenerFn } from './MiddlePane';

const TextElementCSS = {
  position: 'absolute',
  fontFamily: 'Noto Sans',
  fontSize: '1rem',
  textAlign: 'center',
  outline: 'none',
  border: '1px solid transparent',
  display: 'block',
  width: 'fit-content',
  '&:hover': {
    backgroundColor: '$slate2',
  },
  '&:focus': {
    backgroundColor: '$cyan2',
    borderColor: '$cyan9',
  },
}

const TextElementInput = styled('input', TextElementCSS);
const TextElementSizer = styled('span', {...TextElementCSS,
  whiteSpace: 'pre',
  visibility: 'hidden',
});

type TextElementProps = {
  canvasZoom: number;
  addMouseMoveListener: addMouseMoveListenerFn;
};

export const TextElement = ({ canvasZoom, addMouseMoveListener }: TextElementProps) => {
  // State
  const [text, setText] = useState<string>("Your Text Here");
  const [x, setX] = useState<number>(canvasZoom * 100 * 0.25);
  const [y, setY] = useState<number>(canvasZoom * 100 * 0.5);

  // Drag and Drop
  const [ mousePosition, setMousePosition ] = useState<{
    mouseX: number;
    mouseY: number;
    textX: number;
    textY: number;
  } | null>(null);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
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
      setX(mousePosition.textX + e.clientX - mousePosition.mouseX);
      setY(mousePosition.textY + e.clientY - mousePosition.mouseY);
    });

    return () => removeListener();
  }, [ mousePosition, addMouseMoveListener ]);

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    if (!mousePosition) return;

    setMousePosition(null);
  }, [mousePosition]);

  // Text Editing
  const onDoubleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.focus();
    e.currentTarget.setSelectionRange(0, e.currentTarget.value.length);
  };

  // note: ref is assigned this way so that useMemo below triggers the first time that the ref is set
  const textSizerRef = useRef<HTMLSpanElement>();
  const [textSizerRefSet, setTextSizerRefSet] = useState<boolean>(false);
  const textSizerRefCb  = useCallback((el: HTMLSpanElement) => {
    setTextSizerRefSet(!!el);
    textSizerRef.current = el;
  }, [textSizerRef]);

  const textWidth = useMemo(() => {
    if (!textSizerRef.current || !textSizerRefSet) return;

    textSizerRef.current.innerText = text;
    return textSizerRef.current?.offsetWidth;
  }, [ text, textSizerRef, textSizerRefSet ]);

  return <>
    <TextElementSizer ref={textSizerRefCb} />
    <TextElementInput
      value={text}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onDoubleClick={onDoubleClick}
      onChange={e => setText(e.target.value ?? '')}
      css={{
        top: y + 'px',
        left: x + 'px',
        width: textWidth ? (textWidth + 'px') : undefined,
      }}
    />
  </>
}