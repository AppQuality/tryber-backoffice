import { Dropzone, Spinner } from "@appquality/appquality-design-system";
import { useFormikContext, getIn } from "formik";
import { useState } from "react";
import { usePostUsersMeCampaignsByCampaignIdMediaMutation } from "src/services/tryberApi";
import { normalizeFileName } from "./utils";
import { FormProps } from "./CostsFormProvider";

interface Props {
  campaignId: string;
  name: string;
}

export const AttachmentsDropzone = ({ campaignId, name }: Props) => {
  const [createMedia] = usePostUsersMeCampaignsByCampaignIdMediaMutation();
  const { values, setFieldValue, errors, touched } =
    useFormikContext<FormProps>();
  const [isUploading, setIsUploading] = useState(false);

  const currentFiles = getIn(values, name) || [];
  const error = getIn(errors, name);
  const isTouched = getIn(touched, name);

  const uploadMedia = async (files: File[]) => {
    setIsUploading(true);
    const updatedList = [...currentFiles];

    for (const f of files) {
      const formData = new FormData();
      formData.append("media", f, normalizeFileName(f.name));

      try {
        const res = await createMedia({
          campaignId,
          // @ts-ignore
          body: formData,
        }).unwrap();

        /*         updatedList.push({ url: res.url, mimeType: f.type }); */
      } catch (e) {
        console.error(e);
      }
    }

    setFieldValue(name, updatedList);
    setIsUploading(false);
  };

  return (
    <div style={{ marginTop: "8px" }}>
      <Dropzone
        description="Click or drag files here to upload"
        onAccepted={uploadMedia}
        onRejected={() => {}}
        disabled={isUploading}
        danger={!!error && isTouched}
      />

      {isUploading && <Spinner size="sm" style={{ marginTop: "8px" }} />}

      <div
        style={{
          marginTop: "8px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {currentFiles.map((file: any, idx: number) => (
          <div
            key={idx}
            style={{
              fontSize: "12px",
              padding: "2px 8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              background: "#fff",
            }}
          >
            📎 {file.url.split("/").pop()}
          </div>
        ))}
      </div>
    </div>
  );
};
