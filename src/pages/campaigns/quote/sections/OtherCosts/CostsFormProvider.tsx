import { Formik } from "@appquality/appquality-design-system";
import siteWideMessageStore from "src/redux/siteWideMessages";
import {
  useGetCampaignsByCampaignFinanceOtherCostsQuery,
  usePostCampaignsByCampaignFinanceOtherCostsMutation,
} from "src/services/tryberApi";
import * as yup from "yup";

export type FormProps = {
  items: Array<{
    cost_id?: number;
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
  const { data, isLoading } = useGetCampaignsByCampaignFinanceOtherCostsQuery({
    campaign: campaignId,
  });
  const [createOtherCosts] =
    usePostCampaignsByCampaignFinanceOtherCostsMutation();
  const { add } = siteWideMessageStore();

  const handleSubmit = async (values: FormProps) => {
    try {
      const newItems = values.items.filter((item) => item.notSaved);
      for (const item of newItems) {
        await createOtherCosts({
          campaign: campaignId,
          body: {
            description: item.description,
            type_id: item.type,
            supplier_id: item.supplier,
            cost: item.cost,
            attachments: item.files.map((file) => ({
              url: file.url,
              mime_type: file.mimeType,
            })),
          },
        }).unwrap();
      }

      add({
        message: "Other costs saved successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to save other costs:", error);
      add({
        message: "Failed to save other costs",
        type: "danger",
      });
    }
  };
  const validationSchema = yup.object({
    items: yup.array().of(
      yup.object({
        description: yup.string().required("Required"),
        type: yup.number().required("Required").min(0),
        supplier: yup.number().required("Required").min(1),
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

  if (!data || isLoading) {
    return null;
  }

  return (
    <Formik<FormProps>
      enableReinitialize
      initialValues={{
        items: (data?.items || []).map((item) => ({
          cost_id: item.cost_id,
          description: item.description || "",
          type: item.type?.id || 0,
          supplier: item.supplier?.id || 0,
          cost: item.cost || 0,
          files: (item.attachments || []).map((attachment) => ({
            url: attachment.url || "",
            mimeType: attachment.mimetype || "",
          })),
        })),
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div>{children}</div>
    </Formik>
  );
};

export default CostsFormProvider;
