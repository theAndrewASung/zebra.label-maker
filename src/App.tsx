import React from 'react';
import { styled } from '@stitches/react';
import * as Tabs from '@radix-ui/react-tabs';

const Container = styled('div', {
  display: 'flex',
  width: '100vw',
  margin: '0 auto',
});

const LeftPane = styled('div', {
  width: '25%',
});

const EmptyText = styled('small', {
  fontStyle: 'italic',
  color: '#666',
});

const Divider = styled('hr', {
  outline: 'none',
  border: 'none',
  borderTop: '1px solid #eee',
})

const MiddlePane = styled('div', {
  width: '50%',
});

const Toolbar = styled('div', {
  margin: '0px 5px',
  textAlign: 'right',
  width: '100%',
});
const Button = styled('button', {
  outline: 'none',
  border: 'none',
  backgroundColor: 'hsl(292 50.2% 46.9%)',
  color: '#fff',
  padding: '10px 15px',
  borderRadius: '5px',
  margin: '5px',
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
    <Container>
      <LeftPane>
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Trigger value="label">Label</Tabs.Trigger>
            <Tabs.Trigger value="elements">Elements</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="label">
            <h4> Saved </h4>
            <EmptyText> No saved layouts </EmptyText>
            <Divider />
            <h4> Specifications </h4>
            <div>
              <label>
                DPI <input />
              </label>
            </div>
            <div>
              <label>
                Width <input />
              </label>
            </div>
            <div>
              <label>
                Height <input />
              </label>
            </div>
          </Tabs.Content>
          <Tabs.Content value="elements">
            <h4> Elements </h4>
            <EmptyText> No elements added yet. </EmptyText>
          </Tabs.Content>
        </Tabs.Root>
      </LeftPane>
      <MiddlePane>
        <h3> Label Layout </h3>
        <Toolbar>
          <Button>
            Add Image
          </Button>
          <Button>
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
  );
}

export default App;
