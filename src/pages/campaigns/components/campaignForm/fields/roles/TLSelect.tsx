import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../../FormProvider";

import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  FormLabel,
  Text,
} from "@appquality/appquality-design-system";
import {
  GetDossiersByCampaignApiResponse,
  useGetUsersByRoleByRoleQuery,
  useGetUsersMePermissionsQuery,
} from "src/services/tryberApi";
import { getTlObjects } from "../../getAssistantIdByRole";

const TlSelect = ({
  dossier,
}: {
  dossier?: GetDossiersByCampaignApiResponse;
}) => {
  const { data: permissions } = useGetUsersMePermissionsQuery();

  if (!permissions) return null;

  if (
    "appq_campaign" in permissions &&
    typeof permissions.appq_campaign !== "undefined" &&
    permissions.appq_campaign === true
  ) {
    return <TlSelectWithPermission />;
  }

  return <TlSelectWithoutPermission dossier={dossier} />;
};

const TlSelectWithoutPermission = ({
  dossier,
}: {
  dossier?: GetDossiersByCampaignApiResponse;
}) => {
  const tls = getTlObjects({ roles: dossier?.roles });
  const tlsNames = (tls || [])
    .map((tl) => `${tl.user?.name} ${tl.user?.surname}`)
    .join(", ");
  return (
    <FormGroup>
      <FormLabel label="TL" htmlFor="" />
      <Text>{tls && tls.length > 0 ? <>{tlsNames}</> : <>No TLs</>}</Text>
    </FormGroup>
  );
};

const TlSelectWithPermission = () => {
  const { setFieldValue, values } = useFormikContext<NewCampaignValues>();
  const { data: tl } = useGetUsersByRoleByRoleQuery({ role: "assistants" });

  const options = tl
    ? tl.results
        .filter((tl) => !values.researcher?.includes(tl.id.toString()))
        .map((tl) => ({
          value: tl.id.toString(),
          label: `${tl.name} ${tl.surname}`,
        }))
    : [];

  return (
    <FormikField name="tl">
      {({ field }: FieldProps) => (
        <FormGroup>
          <FormLabel htmlFor={field.name} label="TL" />
          <Dropdown
            isMulti
            options={options}
            name={field.name}
            value={options.filter((o) => field.value.includes(o.value))}
            onChange={(value) =>
              setFieldValue(
                field.name,
                value.map((v) => v.value)
              )
            }
            placeholder="Start typing to select"
          />
          <ErrorMessage name={field.name} />
        </FormGroup>
      )}
    </FormikField>
  );
};

export default TlSelect;
