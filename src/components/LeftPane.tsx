import { styled } from '../stitches.config';
import * as Tabs from '@radix-ui/react-tabs';
import { InputWithLabel } from './lib/Input';
import { useLabelTemplateContext } from '../LabelTemplateContext';

const Container = styled(Tabs.Root, {
  backgroundColor:'$slate1',
  borderRight: '1px solid $slate6',
  boxShadow: '0px 0px 3px 2px var(--color-slate6)',
  height: '100%',
});
const TabBar = styled(Tabs.List, {
  padding: '0px',
  backgroundColor:'$slate2',
  borderBottom: '1px solid $slate6',
});
const Tab = styled(Tabs.Trigger, {
  backgroundColor: 'transparent',
  fontFamily: 'Noto Sans',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  padding: '12px 10px 8px 10px',

  border: 'none',
  borderBottom: '3px solid transparent',
  color: '$slate11',
  '&[data-state=active]': {
    color: '$cyan12',
    borderColor: '$cyan9',
  },
  '&:hover': {
    backgroundColor: '$cyan2',
    color: '$cyan12',
    cursor: 'pointer',
  }
});
const TabContent = styled(Tabs.Content, {
  padding: '5px',
});

const Divider = styled('hr', {
  outline: 'none',
  border: 'none',
  borderTop: '1px solid #eee',
});

const EmptyText = styled('small', {
  fontStyle: 'italic',
  color: '#666',
});

const JSONPreview = styled('div', {
  backgroundColor: '$cyan2',
  borderRadius: '5px',
  whiteSpace: 'pre',
  fontFamily: 'monospace',
  fontSize: '0.7rem',
  maxHeight: '500px',
  overflowY: 'scroll',
  padding: '5px',
  border: '1px solid',
  borderColor: '$cyan6',
})

export const LeftPane = () => {
  const [ state, dispatch ] = useLabelTemplateContext();
  return (
    <Container defaultValue="elements">
      <TabBar>
        <Tab value="elements">Elements</Tab>
        <Tab value="label">Label</Tab>
        <Tab value="export">Export</Tab>
      </TabBar>
      <TabContent value="elements">
        <EmptyText> No elements added yet. </EmptyText>
      </TabContent>
      <TabContent value="label">
        <InputWithLabel labelText="Name" value={state.name} onChange={e => dispatch({ type: 'update', name: e.target.value })} />
        <Divider />
        <h5> Label Specifications </h5>
        <InputWithLabel labelText="DPI" type="number" value={state.dpi} onChange={e => dispatch({ type: 'update', dpi: e.target.value ? parseInt(e.target.value) : undefined })} />
        <InputWithLabel labelText="Width" type="number" value={state.width} onChange={e => dispatch({ type: 'update', width: e.target.value ? parseInt(e.target.value) : undefined })} />
        <InputWithLabel labelText="Height" type="number" value={state.height} onChange={e => dispatch({ type: 'update', height: e.target.value ? parseInt(e.target.value) : undefined })} />
      </TabContent>
      <TabContent value="export">
        <h5> JSON Data Format </h5>
        <JSONPreview>{JSON.stringify(state, null, 2)}</JSONPreview>
      </TabContent>
    </Container>
  );
}
