import { faFont, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useLabelTemplateContext } from "../../context/LabelTemplateContext";
import { useUserContext } from "../../context/UserContext";
import { TextElementPayload } from "../../types";
import { BlurInput } from "../lib/BlurInput";
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
    <SizePositionTable>
      <tbody>
        <tr>
          <th> Text </th>
          <td colSpan={3}>
            <BlurInput
              value={payload.text}
              onChange={text => updateElement({ text })}
            />
          </td>
        </tr>
        <tr>
          <th> X </th>
          <td>
              <PixelInput
                step={1}
                value={payload.x}
                onChange={x => payload.x !== x ? updateElement({ x }) : null}
              />
          </td>
          <th> Y </th>
          <td>
              <PixelInput
                step={1}
                value={payload.y}
                onChange={y => payload.y !== y ? updateElement({ y }) : null}
              />
          </td>
        </tr>
      </tbody>
    </SizePositionTable>
  </div>
};
