import React, { createContext, ReactNode, useContext, useReducer } from "react";
import type { ElementPayload, TextElementPayload } from "../types";

type LabelTemplate = {
  name?: string;
  dpi?: number;
  width?: number;
  height?: number;
  elements: ElementPayload[],
}

type LabelTemplateDispatchAction =
| ({ type: 'update' } & Partial<LabelTemplate>)
| ({ type : 'new-text-element' } & Partial<Omit<TextElementPayload, 'type'>>)
| ({ type : 'update-text-element', index: number } & Partial<Omit<TextElementPayload, 'type'>>);

const initial: LabelTemplate = {
  name: 'My name',
  dpi: 200,
  width: 2.25,
  height: 1.25,
  elements: [],
};

const reducer = (state: LabelTemplate, action: LabelTemplateDispatchAction): LabelTemplate => {
  const updated = {...state};
  switch (action.type) {
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
    
    case "update-text-element":
      updated.elements = updated.elements.slice(0);
      const updatedPayload = Object.assign({}, updated.elements[action.index]) as TextElementPayload;
      if (action.hasOwnProperty('text')) updatedPayload.text = action.text ?? '';
      if (typeof action.x === 'number') updatedPayload.x = action.x;
      if (typeof action.y === 'number') updatedPayload.y = action.y;
      updated.elements[action.index] = updatedPayload;

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