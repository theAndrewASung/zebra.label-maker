import React, { createContext, ReactNode, useContext, useReducer } from "react";

type LabelTemplate = {
  name?: string;
  dpi?: number;
  width?: number;
  height?: number;
}

type LabelTemplateDispatchAction = { type: 'update'; } & Partial<LabelTemplate>;

const initial: LabelTemplate = {
  name: 'My name',
  dpi: 200,
  width: 2.25,
  height: 1.25,
};

const reducer = (state: LabelTemplate, action: LabelTemplateDispatchAction): LabelTemplate => {
  switch (action.type) {
    case "update":
      var updated = {...state};
      if (action.hasOwnProperty('name')) updated.name = action.name;
      if (action.hasOwnProperty('dpi')) updated.dpi = action.dpi;
      if (action.hasOwnProperty('width')) updated.width = action.width;
      if (action.hasOwnProperty('height')) updated.height = action.height;
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