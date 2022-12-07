import { styled } from '@stitches/react'
import { ImageElementPayload } from '../../types';

const ImageTag = styled('img', {});

type ImageElementProps = {
  payload: ImageElementPayload;
  onPayloadChange: (payloadUpdates: Partial<ImageElementPayload>) => void;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
};

export const ImageElement = ({ payload, onPayloadChange, onClick }: ImageElementProps) => {
  const { width, height, url } = payload;

  return <ImageTag
    src={url}
    alt={url}
    css={{
      width: width ? (width + 'px') : undefined,
      height: height ? (height + 'px') : undefined,
    }}
    onClick={onClick}
  />
}