import {
  BSCol,
  BSGrid,
  Card,
  ErrorMessage,
  FormLabel,
  Text,
  TextareaField,
  Title,
} from "@appquality/appquality-design-system";
import { FieldArray } from "formik";
import { v4 as uuidv4 } from "uuid";
import QuestionField from "../components/fields/QuestionField";
import { FormQuestion } from "../FormProvider";
import { OnDragEndResponder } from "react-beautiful-dnd";
import DragNDropProvider from "../DragNDropProvider";
import { AddNew } from "../components/AddNew";

const Goal = () => {
  return (
    <Card title="Il punto di partenza del test" className="aq-mb-3">
      <BSGrid className="aq-mb-4">
        <Title size="s" className="aq-mb-2">
          Obiettivo della campagna<span className="aq-text-danger">*</span>
        </Title>
        <BSCol size="col-lg-8">
          <TextareaField height="10em" name="goal" label="Breve descrizione" />
        </BSCol>
        <BSCol size="col-lg-4">
          <FormLabel htmlFor="" label="Cos’è questo campo?" />
          <Card>
            <Title size="xs" className="aq-text-info aq-mb-3">
              Descrivi in brevi parole l’obiettivo del test.
            </Title>
            <Text small>Ad esempio:</Text>
            <Text className="aq-mb-2">
              Valutare la qualità dell'interazione con il prototipo di
              e-commerce
            </Text>
          </Card>
        </BSCol>
      </BSGrid>
      <BSGrid>
        <Title size="s" className="aq-mb-2">
          Domande di ricerca<span className="aq-text-danger">*</span>
        </Title>
        <BSCol size="col-lg-8">
          <FormLabel
            htmlFor="questions"
            label="Il numero consigliato di domande di ricerca è 3"
          />
          <FieldArray
            name="questions"
            render={({ form, remove, push, move, name }) => {
              const questions = form.values[name];
              const handleDragEnd: OnDragEndResponder = (result) => {
                if (!result.destination) {
                  return;
                }

                if (
                  !questions[result.source.index] ||
                  !questions[result.destination.index]
                ) {
                  return;
                }

                const srcKey = `questions[${result.source.index}].name`;
                const destKey = `questions[${result.destination.index}].name`;
                const srcValue = questions[result.source.index].name;
                const destValue = questions[result.destination.index].name;

                if (srcValue === destValue) {
                  return;
                }

                form.setFieldValue(srcKey, destValue);
                form.setFieldValue(destKey, srcValue);
              };
              return (
                <>
                  <DragNDropProvider<FormQuestion>
                    onDragEnd={handleDragEnd}
                    items={questions}
                    renderItem={(question, index, dragHandleProps) => (
                      <div {...dragHandleProps}>
                        <QuestionField
                          index={index}
                          remove={remove}
                          name={name}
                        />
                      </div>
                    )}
                  />
                  <AddNew
                    data-qa="add-new-question"
                    onClick={() => {
                      const newQuestion = {
                        internalId: uuidv4(),
                        name: "",
                      };
                      push(newQuestion);
                    }}
                  >
                    Aggiungi domanda di ricerca
                  </AddNew>
                  {typeof form.getFieldMeta(name).error === "string" && (
                    <ErrorMessage name="questions" />
                  )}
                </>
              );
            }}
          />
        </BSCol>
        <BSCol size="col-lg-4">
          <FormLabel htmlFor="" label="Cos’è questo campo?" />
          <Card>
            <Title size="xs" className="aq-text-info aq-mb-3">
              Esplicita le domande che hanno guidato la ricerca
            </Title>
            <Text small>Ad esempio:</Text>
            <Text className="aq-mb-2">
              Gli utenti vedono la CTA "Trova in negozio" nel PDP?
            </Text>
          </Card>
        </BSCol>
      </BSGrid>
    </Card>
  );
};

export default Goal;
