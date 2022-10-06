import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';

export type UserContextPayload = {
  activeElementIndex: number | null;
};

const initial: UserContextPayload = {
  activeElementIndex : null,
};

type UserContextDispatchAction = { type : 'set-active-element', index: number | null };

const reducer = (state: UserContextPayload, action: UserContextDispatchAction): UserContextPayload => {
  const updated = {...state};
  switch (action.type) {
    case "set-active-element":
      updated.activeElementIndex = action.index;
      return updated;

    default:
      return state
  }
}

const UserContext = createContext<[UserContextPayload, Dispatch<UserContextDispatchAction>]>([initial, () => null]);

export const UserContextProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [userContext, setUserContext] = useReducer(reducer, initial);

  return (
    <UserContext.Provider value={[userContext, setUserContext]}>
    	{ children }
    </UserContext.Provider>
  )
};
export const useUserContext = () => useContext(UserContext);