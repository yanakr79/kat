/** @jsx jsx */
/* eslint-disable react/jsx-props-no-spreading */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Input as Inp, Textarea, Label } from 'theme-ui';

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Input = ({ invalid, ...props }) => (
  <Inp
    {...props}
    sx={{
      borderColor: `${invalid ? 'error' : 'body'}`,
      fontFamily: 'body',
    }}
  />
);

const TextArea = ({ invalid, ...props }) => (
  <Textarea
    {...props}
    sx={{
      borderColor: `${invalid ? 'error' : 'body'}`,
      fontFamily: 'body',
    }}
  />
);

const FormLabel = ({ isrequired, ...props }) => (
  <Label
    {...props}
    sx={{
      mb: '0.25rem',
      '&::after': {
        content: `"${isrequired ? '*' : ''}"`,
        color: 'brand.main',
        ml: '0.25rem',
      },
    }}
  />
);

const FormErrorMessage = styled.div`
  color: ${(p) => p.theme.colors.error};
`;

const InputControl = ({ name, label, type, value, required, error, onChange, ...props }) => {
  return (
    <FormControl>
      {label && (
        <FormLabel htmlFor={name} isrequired={required}>
          {label}
        </FormLabel>
      )}
      <Input
        id={name}
        name={name}
        type={type || 'text'}
        required={required}
        value={value}
        invalid={error}
        onChange={onChange}
        {...props}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

const TextAreaControl = ({ name, label, value, required, error, onChange, ...props }) => {
  return (
    <FormControl>
      {label && (
        <FormLabel htmlFor={name} isrequired={required}>
          {label}
        </FormLabel>
      )}
      <TextArea
        id={name}
        name={name}
        required={required}
        value={value}
        invalid={error}
        onChange={onChange}
        rows="10"
        {...props}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export { TextAreaControl };
export default InputControl;
