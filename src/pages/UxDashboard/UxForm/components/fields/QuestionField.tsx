import {
  Button,
  ErrorMessage,
  Input,
  FormikField,
  FieldProps,
} from "@appquality/appquality-design-system";
import styled from "styled-components";

const Styled = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: ${({ theme }) => theme.grid.sizes[3]};
`;

interface QuestionFieldProps {
  index: number;
  remove: (index: number) => void;
  name: string;
}

const QuestionField = ({ index, remove, name }: QuestionFieldProps) => {
  return (
    <FormikField name={`${name}[${index}].value`}>
      {({ field, form }: FieldProps) => (
        <Styled data-qa={`question-${index}`}>
          <Input
            id={field.name}
            value={field.value}
            type="text"
            placeholder='Es. Gli utenti vedono la CTA "Trova in negozio" nel PDP?'
            onChange={(value) => {
              form.setFieldValue(field.name, value);
            }}
            extra={{
              onBlur: () => {
                field.onBlur(field.name);
                form.setFieldTouched(field.name);
              },
            }}
          />
          <Button type="danger" flat onClick={() => remove(index)}>
            Elimina
          </Button>
          <ErrorMessage name={field.name} />
        </Styled>
      )}
    </FormikField>
  );
};

export default QuestionField;
