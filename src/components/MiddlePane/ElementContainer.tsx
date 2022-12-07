import { ReactNode, useCallback, useEffect, useState } from "react"
import { addMouseMoveListenerFn } from ".";
import { styled } from "../../stitches.config"

const ElementContainerDiv = styled('div', {
  position: 'absolute',
  border: '1px solid transparent',
  '&:hover': {
    borderColor: '$cyan5',
    pointer: 'default',
  },
  variants: {
    active: {
      true: {
        borderColor: '$cyan8',
        '&:hover': {
          borderColor: '$cyan8',
        }
      }
    }
  }
});

type ElementContainerProps = {
  active: boolean,
  x: number,
  y: number,
  addMouseMoveListener: addMouseMoveListenerFn,
  setActiveElement: () => void,
  onDragDrop: (x: number, y: number) => void,
  children: ReactNode,
}

export const ElementContainer = ({ active, x, y, addMouseMoveListener, setActiveElement, onDragDrop, children } : ElementContainerProps) => {
  // Drag and Drop
  const [ mousePosition, setMousePosition ] = useState<{
    mouseX: number;
    mouseY: number;
    textX: number;
    textY: number;
  } | null>(null);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    setActiveElement();
    if (mousePosition) return;

    e.preventDefault(); // don't focus on input
    setMousePosition({
      mouseX: e.clientX,
      mouseY: e.clientY,
      textX: x,
      textY: y,
    });
  }, [ mousePosition, x, y ]);

  // onMouseMove on canvas
  useEffect(() => {
    if (!mousePosition) return;

    const removeListener = addMouseMoveListener((e: React.MouseEvent<HTMLDivElement>) => {
      onDragDrop(
        mousePosition.textX + e.clientX - mousePosition.mouseX,
        mousePosition.textY + e.clientY - mousePosition.mouseY,
      );
    });

    return () => removeListener();
  }, [ mousePosition, addMouseMoveListener, onDragDrop ]);

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    if (!mousePosition) return;

    setMousePosition(null);
  }, [mousePosition]);
  
  return <ElementContainerDiv
    active={active}
    style={{
      top: y + 'px',
      left: x + 'px',
    }}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
  >
    {children}
  </ElementContainerDiv>
}