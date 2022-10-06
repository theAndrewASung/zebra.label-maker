import { styled } from '@stitches/react';
import { LeftPane } from './components/LeftPane';
import { LabelTemplateContextProvider } from './context/LabelTemplateContext';
import { MiddlePane } from './components/MiddlePane';
import { UserContextProvider } from './context/UserContext';
import { RightPane } from './components/RightPane';

const Container = styled('div', {
  display: 'flex',
  width: '100vw',
  height: '100vh',
  margin: '0 auto',
});

const Left = styled('div', {
  width: '25%',
});

const Middle = styled('div', {
  width: '50%',
});

const Right = styled('div', {
  width: '25%',
});

function App() {
  return (
    <UserContextProvider>
      <LabelTemplateContextProvider>
        <Container>
          <Left>
            <LeftPane />
          </Left>
          <Middle>
            <MiddlePane />
          </Middle>
          <Right>
            <RightPane />
          </Right>
        </Container>
      </LabelTemplateContextProvider>
    </UserContextProvider>
  );
}

export default App;
