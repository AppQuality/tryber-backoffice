import {
  BSCol,
  BSGrid,
  Card,
  FormLabel,
  Text,
  TextareaField,
  Title,
} from "@appquality/appquality-design-system";
import { FieldArray } from "formik";

const Goal = () => {
  return (
    <Card title="Il punto di partenza del test" className="aq-mb-3">
      <BSGrid className="aq-mb-4">
        <Title size="s" className="aq-mb-2">
          Obiettivo della campagna<span className="aq-text-danger">*</span>
        </Title>
        <BSCol size="col-lg-8">
          <TextareaField
            height="10em"
            name="campaignDescription"
            label="Breve descrizione"
          />
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
            render={({ form, remove, push, name }) => (
              <div>
                {form.values[name].map((item: any, index: number) => (
                  <Card>{item.title}</Card>
                ))}
                <Card shadow>
                  <span>+</span>
                  <span>Aggiungi domanda di ricerca</span>
                </Card>
              </div>
            )}
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
