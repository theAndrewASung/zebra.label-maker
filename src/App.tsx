import { styled } from '@stitches/react';
import { LeftPane } from './components/LeftPane';
import { LabelTemplateContextProvider } from './LabelTemplateContext';
import { MiddlePane } from './components/MiddlePane';

const Container = styled('div', {
  display: 'flex',
  width: '100vw',
  height: '100vh',
  margin: '0 auto',
});

const Left = styled('div', {
  width: '25%',
});

const EmptyText = styled('small', {
  fontStyle: 'italic',
  color: '#666',
});

const Middle = styled('div', {
  width: '50%',
});


const RightPane = styled('div', {
  width: '25%',
});

function App() {
  return (
    <LabelTemplateContextProvider>
      <Container>
        <Left>
          <LeftPane />
        </Left>
        <Middle>
          <MiddlePane />
        </Middle>
        <RightPane>
          <EmptyText> Nothing selected </EmptyText>
        </RightPane>
      </Container>
    </LabelTemplateContextProvider>
  );
}

export default App;
