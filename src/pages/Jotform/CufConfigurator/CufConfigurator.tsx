import { Formik } from "@appquality/appquality-design-system";
import { CufConfiguratorCard } from "./CufConfiguratorCard";

export const CufConfigurator = () => {
  return (
    <Formik initialValues={{}} onSubmit={async (values, helpers) => {}}>
      <CufConfiguratorCard />
    </Formik>
  );
};
