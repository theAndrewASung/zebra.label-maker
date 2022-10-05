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

export const LeftPane = () => {
  const [ template, setTemplate ] = useLabelTemplateContext();
  return (
    <Container defaultValue="elements">
      <TabBar>
        <Tab value="elements">Elements</Tab>
        <Tab value="label">Label</Tab>
      </TabBar>
      <TabContent value="elements">
        <EmptyText> No elements added yet. </EmptyText>
      </TabContent>
      <TabContent value="label">
        <InputWithLabel labelText="Name" value={template.name} onChange={e => setTemplate({ type: 'update', name: e.target.value })} />
        <Divider />
        <h5> Label Specifications </h5>
        <InputWithLabel labelText="DPI" type="number" value={template.dpi} onChange={e => setTemplate({ type: 'update', dpi: e.target.value ? parseInt(e.target.value) : undefined })} />
        <InputWithLabel labelText="Width" type="number" value={template.width} onChange={e => setTemplate({ type: 'update', width: e.target.value ? parseInt(e.target.value) : undefined })} />
        <InputWithLabel labelText="Height" type="number" value={template.height} onChange={e => setTemplate({ type: 'update', height: e.target.value ? parseInt(e.target.value) : undefined })} />
      </TabContent>
    </Container>
  );
}
