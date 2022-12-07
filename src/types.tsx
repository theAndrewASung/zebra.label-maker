export interface ElementPayload {
  type: 'text' | 'image';
  x: number;
  y: number;
};

export interface TextElementPayload extends ElementPayload {
  type: 'text';
  x: number;
  y: number;
  text: string;
};

export interface ImageElementPayload extends ElementPayload {
  type : 'image';
  x: number;
  y: number;
  url: string;
  width: number;
  height: number;
}