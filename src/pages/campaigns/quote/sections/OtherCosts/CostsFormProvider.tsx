import { Formik } from "@appquality/appquality-design-system";
import * as yup from "yup";

import siteWideMessageStore from "src/redux/siteWideMessages";

export type FormProps = {
  items: Array<{
    notSaved?: boolean;
    description: string;
    type: number;
    supplier: number;
    cost: number;
    files: { url: string; mimeType: string }[];
  }>;
};

const CostsFormProvider = ({
  children,
  campaignId,
}: {
  children: React.ReactNode;
  campaignId: string;
}) => {
  const { add } = siteWideMessageStore();
  const data: FormProps = { items: [] };

  const validationSchema = yup.object({
    items: yup.array().of(
      yup.object({
        description: yup.string().required("Required"),
        type: yup.number().required("Required").min(0),
        supplier: yup.number().required("Required").min(0),
        cost: yup.number().required("Required").min(0),
        files: yup
          .array()
          .of(
            yup.object({
              url: yup.string().required(),
              mimeType: yup.string().required(),
            })
          )
          .required(),
      })
    ),
  });

  /*  if (!data || isLoading) {
    return null;
  } */

  return (
    <Formik<FormProps>
      enableReinitialize
      initialValues={{
        items: (data.items || []).map((item) => ({
          description: item.description || "",
          type: item.type || 0,
          supplier: item.supplier || 0,
          cost: item.cost || 0,
          files: item.files || [],
        })),
      }}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      <div>{children}</div>
    </Formik>
  );
};

export default CostsFormProvider;
