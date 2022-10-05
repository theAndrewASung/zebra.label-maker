import React from 'react';
import { styled } from '@stitches/react';
import { Button } from './components/lib/Button';
import { LeftPane } from './components/LeftPane';
import { LabelTemplateContextProvider } from './LabelTemplateContext';

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

const MiddlePane = styled('div', {
  width: '50%',
});

const Toolbar = styled('div', {
  margin: '0px 5px',
  textAlign: 'right',
  width: '100%',
});

const Canvas = styled('div', {
  backgroundColor: '#eee',
  width: '100%',
  height: '500px',
  border: '1px solid #ddd',
  boxShadow: 'inset 0px 0px 5px 1px rgb(200,200,200, 0.2)',
  overflow: 'hidden',
});

const Label = styled('div', {
  backgroundColor:' #fff',
  width: (2*225)+ 'px',
  height: (2*125)+ 'px',
  fontSize: (2*10)+ 'px',
  border: '1px solid #ddd',
  boxShadow: '0px 0px 5px 1px rgb(200,200,200, 0.2)',
  borderRadius: (2*5) + 'px',
  // center
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const LabelText = styled('div', {
  position: 'absolute',
  fontSize: '1rem',
  top: '50px',
  left: '50px',
})

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
        <MiddlePane>
          <h3> Label Layout </h3>
          <Toolbar>
            <Button color="primary">
              Add Image
            </Button>
            <Button color="primary" disabled>
              Add Text
            </Button>
          </Toolbar>
          <Canvas>
            <Label>
              <LabelText>What's up y'all</LabelText>
            </Label>
          </Canvas>
        </MiddlePane>
        <RightPane>
          <EmptyText> Nothing selected </EmptyText>
        </RightPane>
      </Container>
    </LabelTemplateContextProvider>
  );
}

export default App;
