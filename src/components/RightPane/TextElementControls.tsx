import { faFont, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useLabelTemplateContext } from "../../context/LabelTemplateContext";
import { useUserContext } from "../../context/UserContext";
import { TextElementPayload } from "../../types";
import { InputWithLabel } from "../lib/Input";
import { PixelInput } from "./PixelInput";
import { RightPaneHeader, SizePositionTable } from "./styledComponents";

export const TextElementControls = ({ payload }: { payload: TextElementPayload}) => {
  const [ , dispatch ] = useLabelTemplateContext();
  const [ userContext, setUserContext ] = useUserContext();

  const updateElement = useCallback((updates: Partial<Omit<TextElementPayload, 'type'>>) => {
    const index = userContext.activeElementIndex;
    if (typeof index === 'number') {
      dispatch({ action : 'update-element', type: 'text', index,  ...updates })
    }
  }, [ dispatch, userContext ])

  return <div>
    <RightPaneHeader>
      <FontAwesomeIcon icon={faFont} fixedWidth />
      <strong style={{ flexGrow: 1 }}> Text Element </strong>
      <FontAwesomeIcon icon={faXmark} fixedWidth onClick={() => setUserContext({ type : 'set-active-element', index : null }) }/>
    </RightPaneHeader>
    <InputWithLabel
      value={payload.text}
      labelText="Text"
      onChange={e => updateElement({ text : e.target.value ?? '' })}
    />
    <SizePositionTable>
      <tbody>
        <tr>
          <td> X </td>
          <td>
              <PixelInput
                value={payload.x}
                onChange={x => payload.x !== x ? updateElement({ x }) : null}
              />
          </td>
          <td> Y </td>
          <td>
              <PixelInput
                value={payload.y}
                onChange={y => payload.y !== y ? updateElement({ y }) : null}
              />
          </td>
        </tr>
      </tbody>
    </SizePositionTable>
  </div>
};
