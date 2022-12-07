import { styled } from '../../stitches.config';
import { ImageElementPayload, TextElementPayload } from '../../types';
import { useLabelTemplateContext } from '../../context/LabelTemplateContext';
import { useUserContext } from '../../context/UserContext';
import { useMemo } from 'react';
import { TextElementControls } from './TextElementControls';
import { ImageElementControls } from './ImageElementControls';

const Container = styled('div', {
  backgroundColor:'$slate1',
  borderLeft: '1px solid $slate6',
  boxShadow: '0px 0px 3px 2px var(--color-slate6)',
  height: '100%',
  padding: '5px',
  overflow: 'hidden',
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
      : activeElement.type === 'text'  ? <TextElementControls  payload={activeElement as TextElementPayload} />
      : activeElement.type === 'image' ? <ImageElementControls payload={activeElement as ImageElementPayload} />
      : null}
    </Container>
  );
}