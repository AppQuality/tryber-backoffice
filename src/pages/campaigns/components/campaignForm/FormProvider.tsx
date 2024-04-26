import { Formik } from "@appquality/appquality-design-system";
import { useMemo } from "react";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import {
  GetDossiersByCampaignApiResponse,
  PostDossiersApiArg,
  useGetDevicesByDeviceTypeOperatingSystemsQuery,
  useGetUsersMeQuery,
  usePostDossiersMutation,
  usePutDossiersByCampaignMutation,
} from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import * as yup from "yup";
import { dateTimeToISO, formatDate, formatTime } from "./formatDate";
import { getPm, getResearcher, getTl } from "./getAssistantIdByRole";
import { useCampaignFormContext } from "./campaignFormContext";
import { set } from "husky";

interface FormProviderInterface {
  children: React.ReactNode;
  dossier?: GetDossiersByCampaignApiResponse;
  isEdit?: boolean;
  duplicate?: PostDossiersApiArg["body"]["duplicate"];
}
export interface NewCampaignValues {
  isEdit: boolean;
  projectId: string;
  customerId: string;
  testType: string;
  customerTitle: string;
  testerTitle: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  closeDate: string;
  closeTime: string;
  automaticDates: boolean;
  deviceList: string[];
  deviceTypes: string[];
  csm: string;
  tl?: string[];
  pm?: string;
  researcher?: string[];
  languages: string[];
  countries: string[];
  description?: string;
  productLink?: string;
  goal?: string;
  outOfScope?: string;
  deviceRequirements?: string;
  targetNotes?: string;
  targetSize?: number;
  browsersList?: string[];
  productType?: string;
}

const FormProvider = ({
  children,
  dossier,
  isEdit,
  duplicate,
}: FormProviderInterface) => {
  const dispatch = useAppDispatch();
  const { setIsCreating } = useCampaignFormContext();
  const [postDossiers] = usePostDossiersMutation();
  const [putDossiers] = usePutDossiersByCampaignMutation();
  const { data, isLoading } = useGetUsersMeQuery({ fields: "id" });
  const { data: devices } = useGetDevicesByDeviceTypeOperatingSystemsQuery({
    deviceType: "all",
  });
  const selectedTypes = useMemo(() => {
    if (!dossier) return ["Smartphone", "PC"];

    const redundantTypeList = dossier.deviceList.map(
      (device) => devices?.find((d) => d.id === device.id)?.type || ""
    );
    return Array.from(new Set(redundantTypeList));
  }, [dossier, devices]);

  const selectedDevices = useMemo(() => {
    if (!dossier)
      return (
        devices
          ?.filter((device) => selectedTypes.includes(device.type))
          .map((device) => device.id.toString()) || []
      );

    return dossier.deviceList.map((device) => device.id.toString());
  }, [dossier, devices, selectedTypes]);

  if (isLoading || !data) return null;

  const initialValues: NewCampaignValues = {
    isEdit: isEdit || false,
    projectId: dossier?.project.id.toString() || "",
    customerId: dossier?.customer.id.toString() || "",
    csm: dossier?.csm.id.toString() || data.id.toString(),
    tl: getTl({ roles: dossier?.roles }) || [],
    pm: getPm({ roles: dossier?.roles }) || "",
    researcher:
      getResearcher({
        roles: dossier?.roles,
      }) || [],
    testType: dossier?.testType.id.toString() || "",
    customerTitle: dossier?.title.customer || "",
    testerTitle: dossier?.title.tester || "",
    startDate: dossier?.startDate ? formatDate(dossier.startDate) : "",
    startTime: dossier?.startDate ? formatTime(dossier.startDate) : "00:00",
    endDate: dossier?.endDate ? formatDate(dossier.endDate) : "",
    endTime: dossier?.endDate ? formatTime(dossier.endDate) : "00:00",
    closeDate: dossier?.closeDate ? formatDate(dossier.closeDate) : "",
    closeTime: dossier?.closeDate ? formatTime(dossier.closeDate) : "00:00",
    automaticDates: true,
    deviceTypes: selectedTypes,
    deviceList: selectedDevices,
    countries: dossier?.countries || [],
    languages: dossier?.languages?.map((lang) => lang.id.toString()) || [],
    description: dossier?.description || "",
    productLink: dossier?.productLink || "",
    goal: dossier?.goal || "",
    outOfScope: dossier?.outOfScope || "",
    deviceRequirements: dossier?.deviceRequirements || "",
    targetNotes: dossier?.target?.notes || "",
    targetSize: dossier?.target?.size || 0,
    browsersList:
      dossier?.browsers?.map((browser) => browser.id.toString()) || [],
    productType: dossier?.productType?.id.toString() || "",
  };

  const validationSchema = yup.object({
    customerId: yup.number().required("Customer is required"),
    projectId: yup.number().required("Project is required"),
    testType: yup.number().required("Test type is required"),
    customerTitle: yup.string().required("Customer Title is required"),
    testerTitle: yup.string().required("Tester Title is required"),
    startDate: yup.string().required("Start date is required"),
    startTime: yup.string().required("Start time is required"),
    endDate: yup.string().required("End date is required"),
    endTime: yup.string().required("End time is required"),
    closeDate: yup.string().required("Close date is required"),
    closeTime: yup.string().required("Close time is required"),
    deviceTypes: yup.array().min(1, "At least one device type is required"),
    deviceList: yup.array().min(1, "At least one device is required"),
    csm: yup.number().required("CSM is required"),
    tl: yup.array(),
    pm: yup.number(),
    researcher: yup.array(),
    languages: yup.array(),
    countries: yup.array(),
    description: yup.string(),
    productLink: yup.string(),
    goal: yup.string(),
    outOfScope: yup.string(),
    deviceRequirements: yup.string(),
    targetNotes: yup.string(),
    targetSize: yup.number(),
    browsersList: yup.array(),
    productType: yup.string(),
  });
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        let roles = [];
        if (values.pm) {
          roles.push({ role: 1, user: parseInt(values.pm) });
        }
        if (values.tl && values.tl.length) {
          values.tl.forEach((tl) => {
            roles.push({ role: 2, user: parseInt(tl) });
          });
        }
        if (values.researcher && values.researcher.length) {
          values.researcher.forEach((researcher) => {
            roles.push({ role: 3, user: parseInt(researcher) });
          });
        }
        try {
          const body = {
            project: parseInt(values.projectId),
            testType: parseInt(values.testType),
            title: {
              customer: values.customerTitle,
              tester: values.testerTitle,
            },
            startDate: dateTimeToISO(values.startDate, values.startTime),
            endDate: dateTimeToISO(values.endDate, values.endTime),
            closeDate: dateTimeToISO(values.closeDate, values.closeTime),
            deviceList: values.deviceList.map((device) => parseInt(device, 10)),
            csm: parseInt(values.csm),
            roles: roles,
            languages: values.languages.map((language) =>
              parseInt(language, 10)
            ),
            countries: values.countries,
            description: values.description,
            productLink: values.productLink,
            goal: values.goal,
            outOfScope: values.outOfScope,
            deviceRequirements: values.deviceRequirements,
            target: {
              notes: values.targetNotes,
              size: values.targetSize,
            },
            browsers: values.browsersList?.map((browser) =>
              parseInt(browser, 10)
            ),
            productType: values.productType
              ? parseInt(values.productType, 10)
              : undefined,
          };

          if (isEdit) {
            await putDossiers({
              campaign: dossier?.id.toString() || "",
              dossierCreationData: body,
            }).unwrap();
          } else {
            setIsCreating(true);

            const resp = await postDossiers({
              body: {
                ...body,
                duplicate: duplicate,
              },
            }).unwrap();

            setIsCreating(false);

            window.parent.postMessage(
              JSON.stringify({
                type: "go-to-edit",
                id: resp.id,
              }),
              "*"
            );
          }

          dispatch(
            addMessage(
              <p>
                <strong>Import successful</strong>
                <div>Campaign has been created successfully</div>
              </p>,
              "success"
            )
          );
        } catch (e) {
          dispatch(
            addMessage(
              "An error has occurred. Please try again.",
              "danger",
              false
            )
          );
        }
      }}
    >
      {children}
    </Formik>
  );
};
export default FormProvider;
