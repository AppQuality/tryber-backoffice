import {
  Button,
  ErrorMessage,
  Input,
  FormikField,
  FieldProps,
} from "@appquality/appquality-design-system";
import styled from "styled-components";
import Handler from "../Handler";

const Styled = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr auto;
  grid-column-gap: ${({ theme }) => theme.grid.sizes[2]};
`;

interface QuestionFieldProps {
  index: number;
  remove: (index: number) => void;
  name: string;
  dragHandleProps?: any;
}

const QuestionField = ({
  index,
  remove,
  name,
  dragHandleProps,
}: QuestionFieldProps) => {
  return (
    <FormikField name={`${name}[${index}].name`}>
      {({ field, form }: FieldProps) => (
        <Styled data-qa={`question-${index}`}>
          {dragHandleProps && <Handler handleDragProps={dragHandleProps} />}
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
          <Button
            kind="danger"
            flat
            onClick={() => remove(index)}
            data-qa={`delete-question-${index}`}
          >
            Elimina
          </Button>
          <ErrorMessage name={field.name} />
        </Styled>
      )}
    </FormikField>
  );
};

export default QuestionField;
