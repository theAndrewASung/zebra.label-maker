import { styled } from '../../stitches.config';
import * as Tabs from '@radix-ui/react-tabs';
import { useLabelTemplateContext } from '../../context/LabelTemplateContext';
import { TextElementPayload } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFont, faImage } from '@fortawesome/free-solid-svg-icons'
import { useUserContext } from '../../context/UserContext';
import { Button } from '../lib/Button';
import { useRef } from 'react';
import { jsonToDataFormat } from '../../utils/dataStorage';
import { BlurInput } from '../lib/BlurInput';
import { PixelInput } from '../RightPane/PixelInput';

const Container = styled(Tabs.Root, {
  backgroundColor:'$slate1',
  borderRight: '1px solid $slate6',
  boxShadow: '0px 0px 3px 2px var(--color-slate6)',
  height: '100%',
  overflow: 'hidden',
});
const TabBar = styled(Tabs.List, {
  padding: '0px',
  backgroundColor:'$slate2',
  borderBottom: '1px solid $slate6',
});
const Tab = styled(Tabs.Trigger, {
  backgroundColor: 'transparent',
  fontFamily: 'Noto Sans',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  padding: '12px 10px 8px 10px',

  border: 'none',
  borderBottom: '3px solid transparent',
  color: '$slate11',
  '&[data-state=active]': {
    color: '$cyan12',
    borderColor: '$cyan9',
  },
  '&:hover': {
    backgroundColor: '$cyan2',
    color: '$cyan12',
    cursor: 'pointer',
  }
});
const TabContent = styled(Tabs.Content, {
  padding: '5px',
});

const ElementRow = styled('div', {
  padding: '5px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  variants: {
    active: {
      true: {
        backgroundColor: '$cyan3',
        color:'$cyan10',
      }
    }
  }
});

const LabelTable = styled('table', {
  '& th': {
    fontSize: '0.8rem',
    textAlign: 'left',
    color: '$slate10',    
  }
})

const Divider = styled('hr', {
  outline: 'none',
  border: 'none',
  borderTop: '1px solid #eee',
});

const EmptyText = styled('small', {
  fontStyle: 'italic',
  color: '#666',
});

const JSONPreview = styled('div', {
  backgroundColor: '$cyan2',
  borderRadius: '5px',
  whiteSpace: 'pre',
  fontFamily: 'monospace',
  fontSize: '0.7rem',
  maxHeight: '500px',
  overflowY: 'scroll',
  padding: '5px',
  border: '1px solid',
  borderColor: '$cyan6',
})

export const LeftPane = () => {
  const [ state, dispatch ] = useLabelTemplateContext();
  const [ userContext, dispatchUserContext ] = useUserContext();

  const inputElementRef = useRef<HTMLInputElement>(null);
  return (
    <Container defaultValue="elements">
      <TabBar>
        <Tab value="elements">Elements</Tab>
        <Tab value="label">Label</Tab>
        <Tab value="export">Export</Tab>
      </TabBar>
      <TabContent value="elements">
        { !state.elements.length ? 
          <EmptyText> No elements added yet. </EmptyText>
          : state.elements.map((e,i) => <ElementRow
            key={i}
            active={userContext.activeElementIndex === i}
            onClick={() => dispatchUserContext({ type : 'set-active-element', index : i })}
          >
            {e.type === 'text' ? (<>
              <FontAwesomeIcon icon={faFont} fixedWidth />
              <small>{(e as TextElementPayload).text}</small>
            </>)
            : e.type === 'image' ? (<>
              <FontAwesomeIcon icon={faImage} fixedWidth />
              <small>Image</small>
            </>)
            : null}
          </ElementRow>)
        }
      </TabContent>
      <TabContent value="label">
        <LabelTable>
          <tbody>
            <tr>
              <th> Name </th>
              <td> <BlurInput value={state.name ?? ''} onChange={name => dispatch({ action: 'update', name })} /> </td>
            </tr>
            <tr>
              <th colSpan={2}> Label Specficiations </th>
            </tr>
            <tr>
              <th> DPI </th>
              <td> <PixelInput value={state.dpi ?? 100} min={100} step={50} onChange={dpi => dispatch({ action: 'update', dpi })} /> </td>
            </tr>
            <tr>
              <th> Width </th>
              <td> <PixelInput value={state.width ?? 2} min={0} step={0.25} onChange={width => dispatch({ action: 'update', width })} /> </td>
            </tr>
            <tr>
              <th> Height </th>
              <td> <PixelInput value={state.height ?? 1} min={0} step={0.25} onChange={height => dispatch({ action: 'update', height })} /> </td>
            </tr>
          </tbody>
        </LabelTable>
      </TabContent>
      <TabContent value="export">
        <h5> JSON Data Format </h5>
        <JSONPreview>{JSON.stringify(state, null, 2)}</JSONPreview>
        <Divider />
        <h5> Save / Load ZLM </h5>
        <input
          ref={inputElementRef}
          type="file"
          style={{ visibility : 'hidden' }}
          accept=".zlm"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.addEventListener('load', () => {
                const str = reader.result?.toString();
                if (str) {
                  dispatch({ action : 'load', str });
                }
              }, false);
              reader.readAsText(file);
            }

            e.target.files = null
          }}
        />
        <Button onClick={() => inputElementRef.current?.click()}>
          Load
        </Button>
        <Button onClick={() => {
          const blob = new Blob([jsonToDataFormat(state)]);
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.setAttribute('download', `${(state.name ?? 'label').replace(/\s+/g, '_').toLowerCase()}.zlm`);
          a.click(); 
        }}>
          Save
        </Button>
      </TabContent>
    </Container>
  );
}
