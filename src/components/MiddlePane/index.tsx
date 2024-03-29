
import { styled } from '@stitches/react';
import React, { useCallback, useRef } from 'react';
import { useLabelTemplateContext } from '../../context/LabelTemplateContext';
import { useUserContext } from '../../context/UserContext';
import { ImageElementPayload, TextElementPayload } from '../../types';
import { ImageElement } from './ImageElement';
import { Button } from '../lib/Button';
import { TextElement } from './TextElement';
import { ElementContainer } from './ElementContainer';
import { loadImageDetailsFromFile } from '../utils';
import { FileButton } from '../lib/FileButton';

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
  const [ userContext, dispatchUserContext ] = useUserContext();

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
      <FileButton color="primary" onFileAdd={async (file) => {
        const details = await loadImageDetailsFromFile(file);
        dispatch({ action : 'new-image-element', ...details })
      }}>
        Add Image
      </FileButton>
      <Button color="primary" onClick={() => {
        dispatchUserContext({ type : 'set-active-element', index : state.elements.length });
        dispatch({ action : 'new-text-element', text: 'Some custom text' })
      }}>
        Add Text
      </Button>
    </Toolbar>
    <Canvas
      onMouseMove={onMouseMove}
      onMouseDown={() => dispatchUserContext({ type : 'set-active-element', index: null })}
    >
      <Label css={css}>
        {state.elements.map((payload, index) =>
          <ElementContainer
            key={index}
            active={index === userContext.activeElementIndex}
            setActiveElement={() => dispatchUserContext({ type : 'set-active-element', index })}
            x={payload.x}
            y={payload.y}
            onDragDrop={(x: number, y: number) => dispatch({ action : 'update-element', index, x, y })}
            addMouseMoveListener={addMouseMoveListener}
          >
            {payload.type === 'text' ? <TextElement
              payload={payload as TextElementPayload}
              onPayloadChange={updates => {
                const { type, ...remainingUpdates } = updates;
                dispatch({
                  action : 'update-element',
                  type : 'text',
                  index,
                  ...remainingUpdates,
                })
              }}
            />
            : payload.type === 'image' ? <ImageElement
              payload={payload as ImageElementPayload}
              onPayloadChange={updates => {
                const { type, ...remainingUpdates } = updates;
                dispatch({
                  action : 'update-element',
                  type : 'image',
                  index,
                  ...remainingUpdates,
                })
              }}
            />
            :  null}
          </ElementContainer>
        )}
      </Label>
    </Canvas>
  </div>)
}