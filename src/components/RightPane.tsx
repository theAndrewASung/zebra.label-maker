import { styled } from '../stitches.config';
import { TextElementPayload, useLabelTemplateContext } from '../context/LabelTemplateContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFont, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useUserContext } from '../context/UserContext';
import { useMemo } from 'react';
import { Input, InputWithLabel } from './lib/Input';

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