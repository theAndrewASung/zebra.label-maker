import { faImage, faLink, faLinkSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLabelTemplateContext } from "../../context/LabelTemplateContext";
import { useUserContext } from "../../context/UserContext";
import { ImageElementPayload } from "../../types";
import { Button } from "../lib/Button";
import { loadImageDetailsFromFile } from "../utils";
import { PixelInput } from "./PixelInput";
import { RightPaneHeader, SizePositionTable } from "./styledComponents";

export const ImageElementControls = ({ payload }: {payload: ImageElementPayload}) => {
  const [ , dispatch ] = useLabelTemplateContext();
  const [ userContext, setUserContext ] = useUserContext();

  const updateElement = useCallback((updates: Partial<Omit<ImageElementPayload, 'type'>>) => {
    const index = userContext.activeElementIndex;
    if (typeof index === 'number') {
      dispatch({ action : 'update-element', type : 'image', index, ...updates })
    }
  }, [ dispatch, userContext ])

  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<number>(payload.width / payload.height);
  
  useEffect(() => {
    if (!lockAspectRatio) setAspectRatio(payload.width / payload.height)
  }, [ payload, lockAspectRatio, setAspectRatio])

  const fileInputRef = useRef<HTMLInputElement>(null);

  return <div>
    <RightPaneHeader>
      <FontAwesomeIcon icon={faImage} fixedWidth />
      <strong style={{ flexGrow: 1 }}> Image Element </strong>
      <FontAwesomeIcon icon={faXmark} fixedWidth onClick={() => setUserContext({ type : 'set-active-element', index : null }) }/>
    </RightPaneHeader>
    <img
      src={payload.url}
      alt={payload.url}
      style={{ textAlign: 'center', maxWidth: '100%', maxHeight: '200px' }}
    />
    <input ref={fileInputRef} type="file" style={{ visibility : 'hidden' }} onChange={async (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const details = await loadImageDetailsFromFile(file);
        updateElement(details)
      }
    }} />
    <div style={{ textAlign: 'right' }}>
      <Button onClick={() => fileInputRef.current?.click()}>
        Change Image
      </Button>
    </div>
    <SizePositionTable>
      <tbody>
        <tr>
          <th> X </th>
          <td>
            <PixelInput
              value={payload.x}
              step={1}
              onChange={x => payload.x !== x ? updateElement({ x }) : null}
            />
          </td>
          <th> Y </th>
          <td>
            <PixelInput
              value={payload.y}
              step={1}
              onChange={y => payload.y !== y ? updateElement({ y }) : null}
            />
          </td>
          <td />
        </tr>
        <tr>
          <th> W </th>
          <td>
            <PixelInput
              value={payload.width}
              step={1}
              min={1}
              onChange={width => payload.width !== width ? updateElement({ width, height : lockAspectRatio ? width / aspectRatio : undefined }) : null}
            />
          </td>
          <th> H </th>
          <td>
            <PixelInput
              value={payload.height}
              step={1}
              min={1}
              onChange={height => payload.height !== height ? updateElement({ width : lockAspectRatio ? height * aspectRatio : undefined, height }) : null}
            />
          </td>
          <td>
            <Button
              color={lockAspectRatio ? 'primary' : undefined}
              style={{ padding: '10px' }}
              onClick={() => setLockAspectRatio((lar: boolean) => !lar)}
            >
              <FontAwesomeIcon icon={lockAspectRatio ? faLink : faLinkSlash} fixedWidth />
            </Button>
          </td>
        </tr>
      </tbody>
    </SizePositionTable>
  </div>
}