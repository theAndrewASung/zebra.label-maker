import React, { createContext, ReactNode, useContext, useReducer } from "react";
import type { ElementPayload, ImageElementPayload, TextElementPayload } from "../types";

type LabelTemplate = {
  name?: string;
  dpi?: number;
  width?: number;
  height?: number;
  elements: ElementPayload[],
}

type LabelTemplateDispatchAction =
| ({ action : 'update' } & Partial<LabelTemplate>)
| ({ action : 'new-text-element' } & Partial<TextElementPayload>)
| ({ action : 'new-image-element', url: string } & Partial<ImageElementPayload>)
| ({ action : 'update-element', index: number, type?: undefined } & Partial<ElementPayload>)
| ({ action : 'update-element', index: number, type : 'image' } & Partial<ImageElementPayload>)
| ({ action : 'update-element', index: number, type : 'text'  } & Partial<TextElementPayload>)

const initial: LabelTemplate = {
  name: 'My name',
  dpi: 200,
  width: 2.25,
  height: 1.25,
  elements: [],
};

const reducer = (state: LabelTemplate, action: LabelTemplateDispatchAction): LabelTemplate => {
  const updated = {...state};
  switch (action.action) {
    case "update":
      if (action.hasOwnProperty('name')) updated.name = action.name;
      if (action.hasOwnProperty('dpi')) updated.dpi = action.dpi;
      if (action.hasOwnProperty('width')) updated.width = action.width;
      if (action.hasOwnProperty('height')) updated.height = action.height;
      return updated;

    case "new-text-element":
      updated.elements = updated.elements.slice(0);
      updated.elements.push({
        type: 'text',
        x: action.x ?? 10,
        y: action.y ?? 10,
        text : action.text ?? 'Your text here'
      } as TextElementPayload);
      return updated;
    
    case "update-element":
      updated.elements = updated.elements.slice(0);
      const updatedPayload = Object.assign({}, updated.elements[action.index]);
      if (typeof action.x === 'number') updatedPayload.x = action.x;
      if (typeof action.y === 'number') updatedPayload.y = action.y;

      if (action.type === 'text') {
        const updatedTextPayload = updatedPayload as TextElementPayload;
        if (action.hasOwnProperty('text')) updatedTextPayload.text = action.text ?? '';
        updated.elements[action.index] = updatedTextPayload;
      }
      else if (action.type === 'image') {
        const updatedImagePayload = updatedPayload as ImageElementPayload;
        if (typeof action.width === 'number') updatedImagePayload.width = action.width;
        if (typeof action.height === 'number') updatedImagePayload.height = action.height;
        if (typeof action.url    === 'string') updatedImagePayload.url = action.url;
        updated.elements[action.index] = updatedImagePayload;
      }
      else {
        updated.elements[action.index] = updatedPayload;
      }

      return updated;

    case "new-image-element":
      var newImageElement: ImageElementPayload = {
        type: 'image',
        x: action.x ?? 10,
        y: action.y ?? 10,
        url: action.url ?? '',
        width: action.width ?? 100,
        height: action.height ?? 100,
      };
      updated.elements = updated.elements.slice(0);
      updated.elements.push(newImageElement);

      return updated;


    default:
      return state
  }
}

const LabelTemplateContext = createContext<[ LabelTemplate, React.Dispatch<LabelTemplateDispatchAction> ]>([ initial, () => null ]);
export const LabelTemplateContextProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [state, dispatch] = useReducer(reducer, initial)

  return (
    <LabelTemplateContext.Provider value={[ state, dispatch ]}>
    	{ children }
    </LabelTemplateContext.Provider>
  )
}
export const useLabelTemplateContext = () => useContext(LabelTemplateContext);