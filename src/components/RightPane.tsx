import { styled } from '../stitches.config';
import { ImageElementPayload, TextElementPayload } from '../types';
import { useLabelTemplateContext } from '../context/LabelTemplateContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFont, faImage, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useUserContext } from '../context/UserContext';
import { useMemo, useRef } from 'react';
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
      : activeElement.type === 'text' ? (<TextElementControls payload={activeElement as TextElementPayload} />)
      : activeElement.type === 'image' ? (<ImageElementControls payload={activeElement as ImageElementPayload} />)
      : null}
    </Container>
  );
}

const TextElementControls = ({ payload }: { payload: TextElementPayload}) => {
  const [ , dispatch ] = useLabelTemplateContext();
  const [ userContext, setUserContext ] = useUserContext();
  return <div>
    <RightPaneHeader>
      <FontAwesomeIcon icon={faFont} fixedWidth />
      <strong style={{ flexGrow: 1 }}> Text Element </strong>
      <FontAwesomeIcon icon={faXmark} fixedWidth onClick={() => setUserContext({ type : 'set-active-element', index : null }) }/>
    </RightPaneHeader>
    <InputWithLabel value={payload.text} labelText="Text" onChange={e => typeof userContext.activeElementIndex === 'number' ? dispatch({ type : 'update-text-element', index: userContext.activeElementIndex, text: e.target.value ?? '' }) : null} />
    <table>
      <tr>
        <td> X </td>
        <td> <Input value={payload.x} onChange={e => typeof userContext.activeElementIndex === 'number' ? dispatch({ type : 'update-text-element', index: userContext.activeElementIndex, x: !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : undefined }) : null} /> </td>
        <td> Y </td>
        <td> <Input value={payload.y} onChange={e => typeof userContext.activeElementIndex === 'number' ? dispatch({ type : 'update-text-element', index: userContext.activeElementIndex, y: !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : undefined }) : null} /> </td>
      </tr>
    </table>
  </div>
};

const ImageElementControls = ({ payload }: {payload: ImageElementPayload}) => {
  const [ , dispatch ] = useLabelTemplateContext();
  const [ userContext, setUserContext ] = useUserContext();

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
        image.onload = () => {
          if (typeof userContext.activeElementIndex === 'number') {
            dispatch({ type : 'update-image-element', index: userContext.activeElementIndex, file, url, width: image.naturalWidth, height: image.naturalHeight })
          }
        }
        image.src = url;
      }
    }} />
    <div style={{ textAlign: 'right' }}>
      <Button onClick={() => fileInputRef.current?.click()}>
        Change Image
      </Button>
    </div>
    <InputWithLabel
      value={payload.width}
      labelText="Width"
      type="number"
      onChange={e => typeof userContext.activeElementIndex === 'number' ? dispatch({ type : 'update-image-element', index: userContext.activeElementIndex, width: parseInt(e.target.value) ?? 0 }) : null}
    />
    <InputWithLabel
      value={payload.height}
      labelText="Height"
      type="number"
      onChange={e => typeof userContext.activeElementIndex === 'number' ? dispatch({ type : 'update-image-element', index: userContext.activeElementIndex, height: parseInt(e.target.value) ?? 0 }) : null}
    />
    <table>
      <tbody>
        <tr>
          <td> X </td>
          <td> <Input value={payload.x} onChange={e => typeof userContext.activeElementIndex === 'number' ? dispatch({ type : 'update-image-element', index: userContext.activeElementIndex, x: !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : undefined }) : null} /> </td>
          <td> Y </td>
          <td> <Input value={payload.y} onChange={e => typeof userContext.activeElementIndex === 'number' ? dispatch({ type : 'update-image-element', index: userContext.activeElementIndex, y: !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : undefined }) : null} /> </td>
        </tr>
      </tbody>
    </table>
    
  </div>
}