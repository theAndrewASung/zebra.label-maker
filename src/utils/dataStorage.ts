import { LabelTemplate } from "../context/LabelTemplateContext";
import { ElementPayload, ImageElementPayload, TextElementPayload } from "../types";

// This file covers the conversion to the custom ZLM file format.
// This format is specified by this

type ZLMVersion = '1';
const CURRENT_VERSION : ZLMVersion = '1';

const ELEMENT_TYPES : ElementPayload['type'][] = [ 'text', 'image' ];
const ELEMENT_TYPE_MAP : Map<ElementPayload['type'], number> = new Map(ELEMENT_TYPES.map((v, i) => [v, i]))

export const jsonToDataFormat = (payload: LabelTemplate) => {
  const data = [];

  // THIS ORDER IS CRITICAL
  data.push(`ZLM.${CURRENT_VERSION}`)
  data.push(payload.name ?? '')
  data.push(payload.dpi ?? '')
  data.push(payload.width ?? '')
  data.push(payload.height ?? '')

  for (const e of payload.elements) {
    const elData = [];
    elData.push(ELEMENT_TYPE_MAP.get(e.type))
    elData.push(e.x)
    elData.push(e.y)
    if (e.type === 'text') {
      const ep = e as TextElementPayload
      elData.push(ep.text)
    }
    else if (e.type === 'image') {
      const ep = e as ImageElementPayload
      elData.push(ep.width)
      elData.push(ep.height)
      elData.push(ep.url)
    }

    data.push(elData.join('@'));
  }
  return data.join('|');
}

export const dataFormatToJson = (str: string): LabelTemplate => {
  const data = str.split('|');
  if (!/^ZLM\./.test(data[0])) throw new Error('Invalid format');
  const labelTemplate : LabelTemplate = {
    name: data[1] ?? '',
    dpi: parseFloat(data[2]) ?? null,
    width: parseFloat(data[3]) ?? null,
    height: parseFloat(data[4]) ?? null,
    elements: data.splice(5).map(el => {
      const elData = el.split('@');
      const type = ELEMENT_TYPES[parseFloat(elData[0])];
      if (type === 'text') {
        const textElementPayload : TextElementPayload = {
          type : 'text',
          x : parseFloat(elData[1]),
          y : parseFloat(elData[2]),
          text : elData[3],
        }
        return textElementPayload;
      }
      else if (type === 'image') {
        const imageElementPayload : ImageElementPayload = {
          type : 'image',
          x : parseFloat(elData[1]),
          y : parseFloat(elData[2]),
          width : parseFloat(elData[3]),
          height : parseFloat(elData[4]),
          url : elData[5],
        }
        return imageElementPayload;
      }

      throw new Error('Unable to parse element.');
    }),
  }

  return labelTemplate;
}