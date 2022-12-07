import { styled } from '../../stitches.config';

export const RightPaneHeader = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});


export const SizePositionTable = styled('table', {
  tableLayout: 'fixed',
  '& th': {
    width: '10%',
    fontWeight: 'normal',
    fontSize: '0.8rem',
  },
  '& td': {
    width: '20%',
    '& input': {
      width: '50px',
    },
  }
})