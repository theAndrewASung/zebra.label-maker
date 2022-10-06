
import { styled } from '@stitches/react';
import React, { useCallback, useRef } from 'react';
import { TextElementPayload, useLabelTemplateContext } from '../LabelTemplateContext';
import { Button } from './lib/Button';
import { TextElement } from './TextElement';

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
  border: '1px solid #ddd',
  boxShadow: '0px 0px 5px 1px rgb(200,200,200, 0.2)',
  borderRadius: (2*5) + 'px',
  // center
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

export type onMouseMoveListener = (e: React.MouseEvent<HTMLDivElement>) => void;
export type addMouseMoveListenerFn = (listener: onMouseMoveListener) => () => void;

export const MiddlePane = () => {
  const canvasZoom = 2;
  const inToPx = (inches: number) => (canvasZoom * 100 * inches) + 'px';

  const [ state, dispatch ] = useLabelTemplateContext();

  const css = {
    width: inToPx(state?.width ?? 0),
    height: inToPx(state?.height ?? 0),
    fontSize: (canvasZoom * 10)+ 'px',
  };

  const onMouseMoveListeners = useRef<Array<onMouseMoveListener>>([]);
  const addMouseMoveListener = useCallback<addMouseMoveListenerFn>((listener: onMouseMoveListener) => {
    onMouseMoveListeners.current.push(listener);
    return () => {
      const i = onMouseMoveListeners.current.indexOf(listener);
      if (i > -1) {
        onMouseMoveListeners.current.splice(i, 1);
      }
    };
  }, [ onMouseMoveListeners ]);
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    for (const listener of onMouseMoveListeners.current) {
      listener(e);
    }
  }, [onMouseMoveListeners]);

  return (<div>
    <h3> Label Layout </h3>
    <Toolbar>
      <Button color="primary" disabled>
        Add Image
      </Button>
      <Button color="primary" onClick={() => dispatch({ type : 'new-text-element', text: 'Some custom text' })}>
        Add Text
      </Button>
    </Toolbar>
    <Canvas onMouseMove={onMouseMove}>
      <Label css={css}>
        {state.elements.map((payload, index) =>
          payload.type === 'text' ? <TextElement
            key={index}
            payload={payload as TextElementPayload}
            onPayloadChange={updates => {
              const { type, ...remainingUpdates } = updates;
              dispatch({
                type : 'update-text-element',
                index,
                ...remainingUpdates,
              })
            }}
            addMouseMoveListener={addMouseMoveListener}
          /> : null
        )}
      </Label>
    </Canvas>
  </div>)
}