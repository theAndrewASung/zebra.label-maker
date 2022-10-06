export interface ElementPayload {
  type: 'text' | 'image';
  x: number;
  y: number;
};

export interface TextElementPayload extends ElementPayload {
  type: 'text';
  text: string;
  x: number;
  y: number;
};