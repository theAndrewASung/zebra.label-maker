import { styled } from '../../stitches.config';

export const LabelText = styled('span', {
  fontSize: '0.8rem',
  fontWeight: '500',
  color: '$slate11',
});

export const Input = styled('input', {
  outline: 'none',
  border:'none',
  borderRadius:' 5px',
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

type InputWithLabelProps = {
  labelText?: string;
  value?: string | number | readonly string[] | undefined;
  type?: React.HTMLInputTypeAttribute | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

export const InputWithLabel = ({ labelText, value, type, onChange } : InputWithLabelProps) => {
  return (<div>
    <label>
      <LabelText>{labelText}</LabelText>
      <br />
      <Input
        value={value}
        type={type}
        onChange={onChange}
      />
    </label>
  </div>);
};