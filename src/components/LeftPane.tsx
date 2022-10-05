import { styled } from '../stitches.config';
import * as Tabs from '@radix-ui/react-tabs';
import { InputWithLabel } from './lib/Input';

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
        <InputWithLabel labelText="Name" value={"My New Label"} />
        <Divider />
        <h5> Label Specifications </h5>
        <InputWithLabel labelText="DPI" value={300} type="number" />
        <InputWithLabel labelText="Width" value={2.25} type="number" />
        <InputWithLabel labelText="Height" value={1.25} type="number" />
      </TabContent>
    </Container>
  );
}
