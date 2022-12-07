import { styled } from '../stitches.config';
import { ImageElementPayload, TextElementPayload } from '../types';
import { useLabelTemplateContext } from '../context/LabelTemplateContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFont, faImage, faLink, faLinkSlash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useUserContext } from '../context/UserContext';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Input, InputWithLabel } from './lib/Input';
import { Button } from './lib/Button';

const Container = styled('div', {
  backgroundColor:'$slate1',
  borderLeft: '1px solid $slate6',
  boxShadow: '0px 0px 3px 2px var(--color-slate6)',
  height: '100%',
  padding: '5px',
  overflow: 'hidden',
});

const RightPaneHeader = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const EmptyText = styled('small', {
  fontStyle: 'italic',
  color: '#666',
});

const SizePositionTable = styled('table', {
  tableLayout: 'fixed',
  '& th': {
    width: '10%',
    fontWeight: 'normal',
    fontSize: '0.8rem',
  },
  '& td': {
    width: '20%',
    '& input': {
      width: '50px',
    },
  }
})

export const RightPane = () => {
  const [ state ] = useLabelTemplateContext();
  const [ userContext ] = useUserContext();
  const activeElement = useMemo(() => {
    if (typeof userContext.activeElementIndex !== 'number') return null;

    return state.elements[userContext.activeElementIndex];
  }, [state, userContext.activeElementIndex]);

  return (
    <Container>
      {!activeElement ? (<EmptyText> Nothing selected </EmptyText>)
      : activeElement.type === 'text'  ? <TextElementControls  payload={activeElement as TextElementPayload} />
      : activeElement.type === 'image' ? <ImageElementControls payload={activeElement as ImageElementPayload} />
      : null}
    </Container>
  );
}

const TextElementControls = ({ payload }: { payload: TextElementPayload}) => {
  const [ , dispatch ] = useLabelTemplateContext();
  const [ userContext, setUserContext ] = useUserContext();

  const updateElement = useCallback((updates: Partial<Omit<TextElementPayload, 'type'>>) => {
    const index = userContext.activeElementIndex;
    if (typeof index === 'number') {
      dispatch({ type : 'update-text-element', index, ...updates })
    }
  }, [ dispatch, userContext ])

  return <div>
    <RightPaneHeader>
      <FontAwesomeIcon icon={faFont} fixedWidth />
      <strong style={{ flexGrow: 1 }}> Text Element </strong>
      <FontAwesomeIcon icon={faXmark} fixedWidth onClick={() => setUserContext({ type : 'set-active-element', index : null }) }/>
    </RightPaneHeader>
    <InputWithLabel
      value={payload.text}
      labelText="Text"
      onChange={e => updateElement({ text : e.target.value ?? '' })}
    />
    <SizePositionTable>
      <tbody>
        <tr>
          <td> X </td>
          <td>
              <PixelInput
                value={payload.x}
                onChange={x => payload.x !== x ? updateElement({ x }) : null}
              />
          </td>
          <td> Y </td>
          <td>
              <PixelInput
                value={payload.y}
                onChange={y => payload.y !== y ? updateElement({ y }) : null}
              />
          </td>
        </tr>
      </tbody>
    </SizePositionTable>
  </div>
};

const ImageElementControls = ({ payload }: {payload: ImageElementPayload}) => {
  const [ , dispatch ] = useLabelTemplateContext();
  const [ userContext, setUserContext ] = useUserContext();

  const updateElement = useCallback((updates: Partial<Omit<ImageElementPayload, 'type'>>) => {
    const index = userContext.activeElementIndex;
    if (typeof index === 'number') {
      dispatch({ type : 'update-image-element', index, ...updates })
    }
  }, [ dispatch, userContext ])

  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<number>(payload.width / payload.height);
  
  useEffect(() => {
    if (!lockAspectRatio) setAspectRatio(payload.width / payload.height)
  }, [ payload, lockAspectRatio, setAspectRatio])

  const fileInputRef = useRef<HTMLInputElement>(null);

  return <div>
    <RightPaneHeader>
      <FontAwesomeIcon icon={faImage} fixedWidth />
      <strong style={{ flexGrow: 1 }}> Image Element </strong>
      <FontAwesomeIcon icon={faXmark} fixedWidth onClick={() => setUserContext({ type : 'set-active-element', index : null }) }/>
    </RightPaneHeader>
    <img
      src={payload.url}
      alt={payload.url}
      style={{ textAlign: 'center', maxWidth: '100%', maxHeight: '200px' }}
    />
    <input ref={fileInputRef} type="file" style={{ visibility : 'hidden' }} onChange={e => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file)
        const image = new Image()
        image.onload = () => updateElement({ file, url, width: image.naturalWidth, height: image.naturalHeight })
        image.src = url;
      }
    }} />
    <div style={{ textAlign: 'right' }}>
      <Button onClick={() => fileInputRef.current?.click()}>
        Change Image
      </Button>
    </div>
    <SizePositionTable>
      <tbody>
        <tr>
          <th> X </th>
          <td>
            <PixelInput
              value={payload.x}
              step={1}
              onChange={x => payload.x !== x ? updateElement({ x }) : null}
            />
          </td>
          <th> Y </th>
          <td>
            <PixelInput
              value={payload.y}
              step={1}
              onChange={y => payload.y !== y ? updateElement({ y }) : null}
            />
          </td>
          <td />
        </tr>
        <tr>
          <th> W </th>
          <td>
            <PixelInput
              value={payload.width}
              step={1}
              min={1}
              onChange={width => payload.width !== width ? updateElement({ width, height : lockAspectRatio ? width / aspectRatio : undefined }) : null}
            />
          </td>
          <th> H </th>
          <td>
            <PixelInput
              value={payload.height}
              step={1}
              min={1}
              onChange={height => payload.height !== height ? updateElement({ width : lockAspectRatio ? height * aspectRatio : undefined, height }) : null}
            />
          </td>
          <td>
            <Button
              color={lockAspectRatio ? 'primary' : undefined}
              style={{ padding: '10px' }}
              onClick={() => setLockAspectRatio((lar: boolean) => !lar)}
            >
              <FontAwesomeIcon icon={lockAspectRatio ? faLink : faLinkSlash} fixedWidth />
            </Button>
          </td>
        </tr>
      </tbody>
    </SizePositionTable>
  </div>
}

type PixelInputProps = {
  value : number,
  step? : number,
  min?  : number,
  onChange? : (value: number) => void
}

const PixelInput = ({ value, step, min, onChange } : PixelInputProps) => {
  const [ state, setState ] = useState<string>(value.toString())

  useEffect(() => {
    setState(value.toString())
  }, [ value ])

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
      if (!isNaN(newValue)
        && (typeof min !== 'number' || newValue >= min)
      ) {
        if (onChange) onChange(newValue)
      }
      else {
        setState(value.toString())
      }
    }}
  />
}