import { styled } from '../../stitches.config';

export const Button = styled('button', {
  outline: 'none',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '4px',
  margin: '5px',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  // color
  backgroundColor: '$slate4',
  color: '$slate11',
  '&:hover': {
    backgroundColor: '$slate5',
  },
  '&:active': {
    backgroundColor: '$slate7',
  },
  '&:disabled': {
    backgroundColor: '$slate3 !important',
    color: '$slate8 !important',
    cursor: 'default !important',
  },
  variants: {
    color: {
      primary: {
        backgroundColor: '$cyan9',
        color: '$cyan2',
        '&:hover': {
          backgroundColor: '$cyan10',
        },
        '&:active': {
          backgroundColor: '$cyan11',
        },
        '&:focus': {
          boxShadow: '0px 0px 2px 1px var(--colors-cyan9)',
        },
      },
    }
  }
});