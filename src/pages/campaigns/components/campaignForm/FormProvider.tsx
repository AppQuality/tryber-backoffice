import { Formik } from "@appquality/appquality-design-system";
import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import {
  DossierCreationData,
  GetDossiersByCampaignApiResponse,
  PostDossiersApiArg,
  useGetDevicesByDeviceTypeOperatingSystemsQuery,
  useGetUsersMeQuery,
  usePostDossiersMutation,
  usePutDossiersByCampaignMutation,
} from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import * as yup from "yup";
import { useAllFieldsByCuf } from "./fields/CufCriteria";
import { dateTimeToISO, formatDate, formatTime } from "./formatDate";
import { getPm, getResearcher, getTl } from "./getAssistantIdByRole";

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
  targetSize?: string;
  genderRequirements?: {
    options: number[];
  };
  ageRequirements?: {
    min: number;
    max: number;
  }[];
  targetCap?: string;
  checkboxCap?: boolean;
  browsersList?: string[];
  productType?: string;
  notes?: string;
  cuf?: { id: string; value: string[] }[];
  provinces?: string[];
}

const useGetInitialCufCriteria = ({
  dossier,
}: {
  dossier: FormProviderInterface["dossier"];
}) => {
  const getAllFieldsByCuf = useAllFieldsByCuf();
  if (!dossier) return [];
  if (!dossier.visibilityCriteria || !dossier.visibilityCriteria.cuf) {
    return [];
  }

  return dossier.visibilityCriteria.cuf.map((cuf) => {
    const cufFields = getAllFieldsByCuf(cuf.cufId);
    if (cufFields.every((field) => cuf.cufValueIds.includes(field.id))) {
      return {
        id: cuf.cufId.toString(),
        value: ["-1"],
      };
    }
    return {
      id: cuf.cufId.toString(),
      value: cuf.cufValueIds.map((value) => value.toString()),
    };
  });
};

const FormProvider = ({
  children,
  dossier,
  isEdit,
  duplicate,
}: FormProviderInterface) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [postDossiers] = usePostDossiersMutation();
  const [putDossiers] = usePutDossiersByCampaignMutation();
  const getAllFieldsByCuf = useAllFieldsByCuf();
  const { data, isLoading } = useGetUsersMeQuery({ fields: "id" });
  const { data: devices } = useGetDevicesByDeviceTypeOperatingSystemsQuery({
    deviceType: "all",
  });
  const initialCufCriteria = useGetInitialCufCriteria({ dossier });
  const selectedTypes = useMemo(() => {
    if (!dossier) return ["Smartphone", "PC"];

    const redundantTypeList = dossier.deviceList.map(
      (device) => devices?.find((d) => d.id === device.id)?.type || ""
    );
    return Array.from(new Set(redundantTypeList));
  }, [dossier, devices]);

  const selectedDevices = useMemo(() => {
    if (!dossier) return ["1", "2", "7", "8"];

    return dossier.deviceList.map((device) => device.id.toString());
  }, [dossier]);

  if (isLoading || !data) return null;

  // dates default values
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 2);
  const closeDate = new Date(endDate);
  closeDate.setDate(endDate.getDate() + 10);
  const hasCap = !!dossier?.target?.cap && dossier?.target?.cap > -1;

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
    startDate: dossier?.startDate
      ? formatDate(dossier.startDate)
      : formatDate(startDate.toISOString()),
    startTime: dossier?.startDate ? formatTime(dossier.startDate) : "09:00",
    endDate: dossier?.endDate
      ? formatDate(dossier.endDate)
      : formatDate(endDate.toISOString()),
    endTime: dossier?.endDate ? formatTime(dossier.endDate) : "23:59",
    closeDate: dossier?.closeDate
      ? formatDate(dossier.closeDate)
      : formatDate(closeDate.toISOString()),
    closeTime: dossier?.closeDate ? formatTime(dossier.closeDate) : "23:59",
    deviceTypes: selectedTypes,
    deviceList: selectedDevices,
    countries: dossier?.countries || [],
    languages: dossier?.languages?.map((lang) => lang.name) || [],
    description: dossier?.description || "",
    productLink: dossier?.productLink || "",
    goal: dossier?.goal || "",
    outOfScope: dossier?.outOfScope || "",
    deviceRequirements: dossier?.deviceRequirements || "",
    targetNotes: dossier?.target?.notes || "",
    targetSize: dossier?.target?.size?.toString(),
    checkboxCap: hasCap,
    targetCap: hasCap ? dossier?.target?.cap?.toString() : "",
    browsersList:
      dossier?.browsers?.map((browser) => browser.id.toString()) || [],
    productType: dossier?.productType?.id.toString() || "",
    notes: dossier?.notes || "",
    genderRequirements: {
      options: dossier?.visibilityCriteria?.gender || [],
    },
    ageRequirements:
      dossier?.visibilityCriteria?.ageRanges?.map((r) => ({
        min: r.min,
        max: r.max,
      })) || [],
    cuf: initialCufCriteria,
    provinces: dossier?.visibilityCriteria?.province || [],
  };

  const validationSchema = yup.object({
    customerTitle: yup.string().required("Customer Title is required"),
    testerTitle: yup.string().required("Tester Title is required"),
    testType: yup.string().required("Test type is required"),
    description: yup.string(),
    startDate: yup.string().required("Start date is required"),
    startTime: yup.string().required("Start time is required"),
    endDate: yup.string().required("End date is required"),
    endTime: yup.string().required("End time is required"),
    closeDate: yup.string().required("Close date is required"),
    closeTime: yup.string().required("Close time is required"),
    csm: yup.number().required("CSM is required"),
    tl: yup.array(),
    pm: yup.number(),
    researcher: yup.array(),
    customerId: yup.string().required("Customer is required"),
    projectId: yup.string().required("Project is required"),
    productType: yup.string(),
    productLink: yup.string(),
    goal: yup.string(),
    outOfScope: yup.string(),
    deviceTypes: yup.array().min(1, "At least one device type is required"),
    deviceList: yup.array().min(1, "At least one device is required"),
    browsersList: yup.array(),
    deviceRequirements: yup.string(),
    targetSize: yup
      .string()
      .test(
        "cap-set-wihtout-target-size",
        "Target size must be set",
        function (value) {
          const { targetCap } = this.parent;
          if (!value && targetCap) return false;
          return true;
        }
      ),
    targetCap: yup
      .string()
      .test("is-not-empty", "Cap must be a number", function (value) {
        const { checkboxCap } = this.parent;
        if (!value && checkboxCap) return false;
        return true;
      })
      .test(
        "is-greater-or-equal",
        "Cap must be at least equal to the number of participants",
        function (value) {
          const { targetSize } = this.parent;
          if (value && parseInt(value) < parseInt(targetSize)) return false;
          return true;
        }
      ),
    genderRequirements: yup.object().shape({
      options: yup.array().of(yup.number().oneOf([-1, 0, 1, 2])),
    }),
    countries: yup
      .array()
      .test(
        "contry-no-italy-with-provinces",
        "You cannot select an Italian province if you have chosen another country. Please modify your selection to find available testers",
        function (value) {
          const { provinces } = this.parent;
          if (
            value &&
            value?.length > 0 &&
            provinces.length > 0 &&
            (value.length > 1 || value[0] !== "IT")
          )
            return false;
          return true;
        }
      ),
    languages: yup.array(),
    targetNotes: yup.string(),
    notes: yup.string(),
    cuf: yup.array().of(
      yup.object().shape({
        id: yup
          .number()
          .required("CUF ID is required")
          .min(1, "CUF ID is required"),
        value: yup.array().min(1, "Almeno un elemento è richiesto"),
      })
    ),
    ageRequirements: yup.array().of(
      yup.object().shape({
        min: yup
          .number()
          .typeError("Min age must be a number")
          .min(16, "Min age must be at least 16")
          .nullable(),
        max: yup
          .number()
          .typeError("Max age must be a number")
          .nullable()
          .test(
            "is-greater-or-equal",
            "Max age must be greater than min age",
            function (value) {
              const { min } = this.parent;
              if (min === null || min === "" || value === null || !value)
                return true;
              return value >= min;
            }
          ),
      })
    ),
    provinces: yup.array().of(yup.string()),
  });
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values, action) => {
        action.setSubmitting(true);
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
          const body: DossierCreationData = {
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
            languages: values.languages,
            countries: values.countries,
            description: values.description,
            productLink: values.productLink,
            goal: values.goal,
            outOfScope: values.outOfScope,
            deviceRequirements: values.deviceRequirements,
            target: {
              notes: values.targetNotes,
              size: !!values.targetSize
                ? parseInt(values.targetSize)
                : undefined,
              cap: !!values.targetCap ? parseInt(values.targetCap) : -1, // -1 is passed for no tester cap required
            },
            browsers: values.browsersList?.map((browser) =>
              parseInt(browser, 10)
            ),
            productType: values.productType
              ? parseInt(values.productType, 10)
              : undefined,
            notes: values.notes,
            visibilityCriteria: {
              gender: values.genderRequirements?.options || [],
              cuf: values.cuf
                ? values.cuf.map((cuf) => {
                    if (cuf.value.includes("-1")) {
                      return {
                        cufId: parseInt(cuf.id, 10),
                        cufValueIds: getAllFieldsByCuf(Number(cuf.id)).map(
                          (field) => field.id
                        ),
                      };
                    }

                    return {
                      cufId: Number(cuf.id),
                      cufValueIds: cuf.value.map((value) => Number(value)),
                    };
                  })
                : [],
              ageRanges: values.ageRequirements
                ? values.ageRequirements
                    .filter(
                      (age) =>
                        age.min !== null &&
                        age.min !== undefined &&
                        age.max !== null &&
                        age.max !== undefined
                    )
                    .map((age) => ({
                      min: Number(age.min),
                      max: Number(age.max),
                    }))
                : [],
              provinces: values.provinces || [],
            },
          };

          if (isEdit) {
            await putDossiers({
              campaign: dossier?.id.toString() || "",
              dossierCreationData: body,
            }).unwrap();
          } else {
            const resp = await postDossiers({
              body: {
                ...body,
                duplicate: duplicate,
              },
            }).unwrap();
            if (!resp.id) {
              throw new Error("An error has occurred. Please try again.");
            }
            history.push(`/backoffice/campaigns/new/success/`, {
              id: resp.id,
              hookFailed: "message" in resp && resp.message === "HOOK_FAILED",
            });
          }
        } catch (e) {
          const error = e as any;
          dispatch(
            addMessage(
              "An error has occurred. Please try again. " + error?.message,
              "danger",
              false
            )
          );
        }
        action.setSubmitting(false);
        action.setTouched({});
      }}
    >
      {children}
    </Formik>
  );
};
export default FormProvider;
