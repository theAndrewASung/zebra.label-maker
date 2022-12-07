import { styled } from '@stitches/react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { TextElementPayload } from '../../types';

const TextElementCSS = {
  fontFamily: 'Noto Sans',
  fontSize: '1rem',
  textAlign: 'center',
  outline: 'none',
  border: '1px solid transparent',
  display: 'block',
  width: 'fit-content',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: '$slate2',
    pointer: 'default',
  },
  '&:focus': {
    backgroundColor: '$cyan2',
    borderColor: '$cyan9',
  },
  '&::selection': {
    backgroundColor: '$cyan5',
  }
}

const TextElementInput = styled('input', TextElementCSS);
const TextElementSizer = styled('span', {...TextElementCSS,
  position: 'absolute',
  whiteSpace: 'pre',
  visibility: 'hidden',
});

type TextElementProps = {
  payload: TextElementPayload;
  onPayloadChange: (payloadUpdates: Partial<TextElementPayload>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
};

export const TextElement = ({ payload, onPayloadChange, onClick }: TextElementProps) => {

  // State
  const { text } = payload;
  const setText = (text: string) => onPayloadChange({ text });

  // Text Editing
  const onDoubleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.focus();
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
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onChange={e => setText(e.target.value ?? '')}
      autoFocus
      onFocus={e => e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)}
      css={{
        width: textWidth ? (textWidth + 'px') : undefined,
      }}
    />
  </>
}