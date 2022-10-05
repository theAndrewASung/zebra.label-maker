import { styled } from '../../stitches.config';

export const Input = styled('input', {
  outline: 'none',
  border: '1px solid',
  padding: '8px 10px',
  margin: '5px',
  cursor: 'text',
  // color
  backgroundColor: '$slate2',
  color: '$slate12',
  borderColor: '$slate5',
  '&:hover': {
    backgroundColor: '$slate1',
  },
  '&:focus': {
    backgroundColor: '$slate1',
    borderColor: '$slate6',
  },
  '&:disabled': {
    backgroundColor: '$slate3 !important',
    color: '$slate8 !important',
    cursor: 'default !important',
  },
});