import { api } from "./api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    get: build.query<GetApiResponse, GetApiArg>({
      query: () => ({ url: `/` }),
    }),
    postAuthenticate: build.mutation<
      PostAuthenticateApiResponse,
      PostAuthenticateApiArg
    >({
      query: (queryArg) => ({
        url: `/authenticate`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getProjects: build.query<GetProjectsApiResponse, GetProjectsApiArg>({
      query: () => ({ url: `/projects` }),
    }),
    getCustomers: build.query<GetCustomersApiResponse, GetCustomersApiArg>({
      query: () => ({ url: `/customers` }),
    }),
    postCustomers: build.mutation<
      PostCustomersApiResponse,
      PostCustomersApiArg
    >({
      query: (queryArg) => ({
        url: `/customers`,
        method: "POST",
        body: queryArg.customer,
      }),
    }),
    getCustomersByCustomer: build.query<
      GetCustomersByCustomerApiResponse,
      GetCustomersByCustomerApiArg
    >({
      query: (queryArg) => ({ url: `/customers/${queryArg.customer}` }),
    }),
    putCustomersByCustomer: build.mutation<
      PutCustomersByCustomerApiResponse,
      PutCustomersByCustomerApiArg
    >({
      query: (queryArg) => ({
        url: `/customers/${queryArg.customer}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    getCustomersByCustomerProjectsAndProjectCampaigns: build.query<
      GetCustomersByCustomerProjectsAndProjectCampaignsApiResponse,
      GetCustomersByCustomerProjectsAndProjectCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/customers/${queryArg.customer}/projects/${queryArg.project}/campaigns`,
      }),
    }),
    postCustomersByCustomerProjectsAndProjectCampaigns: build.mutation<
      PostCustomersByCustomerProjectsAndProjectCampaignsApiResponse,
      PostCustomersByCustomerProjectsAndProjectCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/customers/${queryArg.customer}/projects/${queryArg.project}/campaigns`,
        method: "POST",
        body: queryArg.campaign,
      }),
    }),
    postCampaigns: build.mutation<
      PostCampaignsApiResponse,
      PostCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getCampaigns: build.query<GetCampaignsApiResponse, GetCampaignsApiArg>({
      query: () => ({ url: `/campaigns` }),
    }),
    getCampaignsByCampaign: build.query<
      GetCampaignsByCampaignApiResponse,
      GetCampaignsByCampaignApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.campaign}` }),
    }),
    putCampaignsByCampaign: build.mutation<
      PutCampaignsByCampaignApiResponse,
      PutCampaignsByCampaignApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.campaign}`,
        method: "PUT",
        body: queryArg.campaignOptional,
      }),
    }),
    getCampaignsByCampaignTasks: build.query<
      GetCampaignsByCampaignTasksApiResponse,
      GetCampaignsByCampaignTasksApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.campaign}/tasks` }),
    }),
    postCampaignsByCampaignTasks: build.mutation<
      PostCampaignsByCampaignTasksApiResponse,
      PostCampaignsByCampaignTasksApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.campaign}/tasks`,
        method: "POST",
        body: queryArg.taskOptional,
      }),
    }),
    getCampaignsByCampaignTasksAndTask: build.query<
      GetCampaignsByCampaignTasksAndTaskApiResponse,
      GetCampaignsByCampaignTasksAndTaskApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.campaign}/tasks/${queryArg.task}`,
      }),
    }),
    putCampaignsByCampaignTasksAndTask: build.mutation<
      PutCampaignsByCampaignTasksAndTaskApiResponse,
      PutCampaignsByCampaignTasksAndTaskApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.campaign}/tasks/${queryArg.task}`,
        method: "PUT",
        body: queryArg.taskOptional,
      }),
    }),
    postCampaignsByCampaignCandidates: build.mutation<
      PostCampaignsByCampaignCandidatesApiResponse,
      PostCampaignsByCampaignCandidatesApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.campaign}/candidates`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getPopups: build.query<GetPopupsApiResponse, GetPopupsApiArg>({
      query: (queryArg) => ({
        url: `/popups`,
        params: { limit: queryArg.limit, start: queryArg.start },
      }),
    }),
    postPopups: build.mutation<PostPopupsApiResponse, PostPopupsApiArg>({
      query: (queryArg) => ({
        url: `/popups`,
        method: "POST",
        body: queryArg.popup,
      }),
    }),
    getPopupsByPopup: build.query<
      GetPopupsByPopupApiResponse,
      GetPopupsByPopupApiArg
    >({
      query: (queryArg) => ({ url: `/popups/${queryArg.popup}` }),
    }),
    patchPopupsByPopup: build.mutation<
      PatchPopupsByPopupApiResponse,
      PatchPopupsByPopupApiArg
    >({
      query: (queryArg) => ({
        url: `/popups/${queryArg.popup}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    getDevicesByDeviceTypeModels: build.query<
      GetDevicesByDeviceTypeModelsApiResponse,
      GetDevicesByDeviceTypeModelsApiArg
    >({
      query: (queryArg) => ({
        url: `/devices/${queryArg.deviceType}/models`,
        params: { filterBy: queryArg.filterBy },
      }),
    }),
    getCertifications: build.query<
      GetCertificationsApiResponse,
      GetCertificationsApiArg
    >({
      query: (queryArg) => ({
        url: `/certifications`,
        params: { filterBy: queryArg.filterBy },
      }),
    }),
    getDevicesByDeviceTypeOperatingSystems: build.query<
      GetDevicesByDeviceTypeOperatingSystemsApiResponse,
      GetDevicesByDeviceTypeOperatingSystemsApiArg
    >({
      query: (queryArg) => ({
        url: `/devices/${queryArg.deviceType}/operating_systems`,
        params: { filterBy: queryArg.filterBy },
      }),
    }),
    getDevicesByDeviceTypeOsVersions: build.query<
      GetDevicesByDeviceTypeOsVersionsApiResponse,
      GetDevicesByDeviceTypeOsVersionsApiArg
    >({
      query: (queryArg) => ({
        url: `/devices/${queryArg.deviceType}/os_versions`,
        params: { filterBy: queryArg.filterBy },
      }),
    }),
    getLanguages: build.query<GetLanguagesApiResponse, GetLanguagesApiArg>({
      query: () => ({ url: `/languages` }),
    }),
    getEmployments: build.query<
      GetEmploymentsApiResponse,
      GetEmploymentsApiArg
    >({
      query: () => ({ url: `/employments` }),
    }),
    getEducation: build.query<GetEducationApiResponse, GetEducationApiArg>({
      query: () => ({ url: `/education` }),
    }),
    postMedia: build.mutation<PostMediaApiResponse, PostMediaApiArg>({
      query: (queryArg) => ({
        url: `/media`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    deleteMedia: build.mutation<DeleteMediaApiResponse, DeleteMediaApiArg>({
      query: (queryArg) => ({
        url: `/media`,
        method: "DELETE",
        body: queryArg.body,
      }),
    }),
    getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
      query: () => ({ url: `/users` }),
    }),
    postUsers: build.mutation<PostUsersApiResponse, PostUsersApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getUsersMe: build.query<GetUsersMeApiResponse, GetUsersMeApiArg>({
      query: (queryArg) => ({
        url: `/users/me`,
        params: { fields: queryArg.fields },
      }),
    }),
    putUsersMe: build.mutation<PutUsersMeApiResponse, PutUsersMeApiArg>({
      query: (queryArg) => ({
        url: `/users/me`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    patchUsersMe: build.mutation<PatchUsersMeApiResponse, PatchUsersMeApiArg>({
      query: (queryArg) => ({
        url: `/users/me`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    deleteUsersMe: build.mutation<
      DeleteUsersMeApiResponse,
      DeleteUsersMeApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me`,
        method: "DELETE",
        body: queryArg.body,
      }),
    }),
    getUsersMeBugs: build.query<
      GetUsersMeBugsApiResponse,
      GetUsersMeBugsApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/bugs`,
        params: {
          start: queryArg.start,
          limit: queryArg.limit,
          filterBy: queryArg.filterBy,
          orderBy: queryArg.orderBy,
          order: queryArg.order,
        },
      }),
    }),
    getUsersMeExperience: build.query<
      GetUsersMeExperienceApiResponse,
      GetUsersMeExperienceApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/experience`,
        params: {
          limit: queryArg.limit,
          start: queryArg.start,
          filterBy: queryArg.filterBy,
          order: queryArg.order,
          searchBy: queryArg.searchBy,
          search: queryArg.search,
          orderBy: queryArg.orderBy,
        },
      }),
    }),
    getUsersMeFiscal: build.query<
      GetUsersMeFiscalApiResponse,
      GetUsersMeFiscalApiArg
    >({
      query: () => ({ url: `/users/me/fiscal` }),
    }),
    postUsersMeFiscal: build.mutation<
      PostUsersMeFiscalApiResponse,
      PostUsersMeFiscalApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/fiscal`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    putUsersMeFiscal: build.mutation<
      PutUsersMeFiscalApiResponse,
      PutUsersMeFiscalApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/fiscal`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    getUsersMeCampaigns: build.query<
      GetUsersMeCampaignsApiResponse,
      GetUsersMeCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/campaigns`,
        params: {
          start: queryArg.start,
          limit: queryArg.limit,
          filterBy: queryArg.filterBy,
          locale: queryArg.locale,
          order: queryArg.order,
          orderBy: queryArg.orderBy,
        },
      }),
    }),
    getUsersMePopups: build.query<
      GetUsersMePopupsApiResponse,
      GetUsersMePopupsApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/popups`,
        params: { showExpired: queryArg.showExpired, order: queryArg.order },
      }),
    }),
    postUsersMeCampaignsByCampaignIdBugs: build.mutation<
      PostUsersMeCampaignsByCampaignIdBugsApiResponse,
      PostUsersMeCampaignsByCampaignIdBugsApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/campaigns/${queryArg.campaignId}/bugs`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getUsersMePopupsByPopup: build.query<
      GetUsersMePopupsByPopupApiResponse,
      GetUsersMePopupsByPopupApiArg
    >({
      query: (queryArg) => ({ url: `/users/me/popups/${queryArg.popup}` }),
    }),
    getUsersMeDevices: build.query<
      GetUsersMeDevicesApiResponse,
      GetUsersMeDevicesApiArg
    >({
      query: () => ({ url: `/users/me/devices` }),
    }),
    postUsersMeDevices: build.mutation<
      PostUsersMeDevicesApiResponse,
      PostUsersMeDevicesApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/devices`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getUsersMeDevicesByDeviceId: build.query<
      GetUsersMeDevicesByDeviceIdApiResponse,
      GetUsersMeDevicesByDeviceIdApiArg
    >({
      query: (queryArg) => ({ url: `/users/me/devices/${queryArg.deviceId}` }),
    }),
    patchUsersMeDevicesByDeviceId: build.mutation<
      PatchUsersMeDevicesByDeviceIdApiResponse,
      PatchUsersMeDevicesByDeviceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/devices/${queryArg.deviceId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    deleteUsersMeDevicesByDeviceId: build.mutation<
      DeleteUsersMeDevicesByDeviceIdApiResponse,
      DeleteUsersMeDevicesByDeviceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/devices/${queryArg.deviceId}`,
        method: "DELETE",
      }),
    }),
    postUsersMeCertifications: build.mutation<
      PostUsersMeCertificationsApiResponse,
      PostUsersMeCertificationsApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/certifications`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    deleteUsersMeCertificationsByCertificationId: build.mutation<
      DeleteUsersMeCertificationsByCertificationIdApiResponse,
      DeleteUsersMeCertificationsByCertificationIdApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/certifications/${queryArg.certificationId}`,
        method: "DELETE",
      }),
    }),
    postUsersMeLanguages: build.mutation<
      PostUsersMeLanguagesApiResponse,
      PostUsersMeLanguagesApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/languages`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    putUsersMeLanguages: build.mutation<
      PutUsersMeLanguagesApiResponse,
      PutUsersMeLanguagesApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/languages`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteUsersMeLanguagesByLanguageId: build.mutation<
      DeleteUsersMeLanguagesByLanguageIdApiResponse,
      DeleteUsersMeLanguagesByLanguageIdApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/languages/${queryArg.languageId}`,
        method: "DELETE",
      }),
    }),
    putUsersMeAdditionalsByFieldId: build.mutation<
      PutUsersMeAdditionalsByFieldIdApiResponse,
      PutUsersMeAdditionalsByFieldIdApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/additionals/${queryArg.fieldId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    getUsersMePendingBooty: build.query<
      GetUsersMePendingBootyApiResponse,
      GetUsersMePendingBootyApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/pending_booty`,
        params: {
          start: queryArg.start,
          limit: queryArg.limit,
          orderBy: queryArg.orderBy,
          order: queryArg.order,
        },
      }),
    }),
    getUsersMePayments: build.query<
      GetUsersMePaymentsApiResponse,
      GetUsersMePaymentsApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/payments`,
        params: {
          start: queryArg.start,
          limit: queryArg.limit,
          orderBy: queryArg.orderBy,
          order: queryArg.order,
        },
      }),
    }),
    postUsersMePayments: build.mutation<
      PostUsersMePaymentsApiResponse,
      PostUsersMePaymentsApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/payments`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getUsersMePaymentsByPayment: build.query<
      GetUsersMePaymentsByPaymentApiResponse,
      GetUsersMePaymentsByPaymentApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/payments/${queryArg.payment}`,
        params: {
          limit: queryArg.limit,
          start: queryArg.start,
          order: queryArg.order,
          orderBy: queryArg.orderBy,
        },
      }),
    }),
    getUsersMeRank: build.query<
      GetUsersMeRankApiResponse,
      GetUsersMeRankApiArg
    >({
      query: () => ({ url: `/users/me/rank` }),
    }),
    getUsersMeRankList: build.query<
      GetUsersMeRankListApiResponse,
      GetUsersMeRankListApiArg
    >({
      query: () => ({ url: `/users/me/rank/list` }),
    }),
    getCustomUserFields: build.query<
      GetCustomUserFieldsApiResponse,
      GetCustomUserFieldsApiArg
    >({
      query: () => ({ url: `/custom_user_fields` }),
    }),
    getCountriesByCodeRegion: build.query<
      GetCountriesByCodeRegionApiResponse,
      GetCountriesByCodeRegionApiArg
    >({
      query: (queryArg) => ({
        url: `/countries/${queryArg.code}/region`,
        params: { languageCode: queryArg.languageCode },
      }),
    }),
    getPayments: build.query<GetPaymentsApiResponse, GetPaymentsApiArg>({
      query: (queryArg) => ({
        url: `/payments`,
        params: {
          status: queryArg.status,
          order: queryArg.order,
          orderBy: queryArg.orderBy,
          start: queryArg.start,
          limit: queryArg.limit,
          filterBy: queryArg.filterBy,
        },
      }),
    }),
    postPaymentsByPaymentId: build.mutation<
      PostPaymentsByPaymentIdApiResponse,
      PostPaymentsByPaymentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/payments/${queryArg.paymentId}`,
        method: "POST",
      }),
    }),
    deletePaymentsByPaymentId: build.mutation<
      DeletePaymentsByPaymentIdApiResponse,
      DeletePaymentsByPaymentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/payments/${queryArg.paymentId}`,
        method: "DELETE",
      }),
    }),
    getLevels: build.query<GetLevelsApiResponse, GetLevelsApiArg>({
      query: () => ({ url: `/levels` }),
    }),
    getUsersMeCampaignsByCampaignId: build.query<
      GetUsersMeCampaignsByCampaignIdApiResponse,
      GetUsersMeCampaignsByCampaignIdApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/campaigns/${queryArg.campaignId}`,
      }),
    }),
    postUsersMeCampaignsByCampaignIdMedia: build.mutation<
      PostUsersMeCampaignsByCampaignIdMediaApiResponse,
      PostUsersMeCampaignsByCampaignIdMediaApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/campaigns/${queryArg.campaignId}/media`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getUsersMeCampaignsByCampaignIdDevices: build.query<
      GetUsersMeCampaignsByCampaignIdDevicesApiResponse,
      GetUsersMeCampaignsByCampaignIdDevicesApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/campaigns/${queryArg.campaignId}/devices`,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as tryberApi };
export type GetApiResponse = /** status 200 OK */ {};
export type GetApiArg = void;
export type PostAuthenticateApiResponse =
  /** status 200 Authentication data. The token can be used to authenticate the protected requests */ {
    id?: number;
    firstName?: string;
    lastName?: string;
    token?: string;
    username?: string;
  };
export type PostAuthenticateApiArg = {
  /** A JSON containing username and password */
  body: {
    username: string;
    password: string;
  };
};
export type GetProjectsApiResponse =
  /** status 200 A list of projects */ (Project & {
    campaigns?: (Campaign & {
      id?: number;
    })[];
  })[];
export type GetProjectsApiArg = void;
export type GetCustomersApiResponse =
  /** status 200 An array of Customer objects */ (Customer & {
    id?: number;
  })[];
export type GetCustomersApiArg = void;
export type PostCustomersApiResponse = /** status 201 Created */ undefined;
export type PostCustomersApiArg = {
  /** The customer you want to create */
  customer: Customer;
};
export type GetCustomersByCustomerApiResponse =
  /** status 200 The Customer data you requested */ Customer;
export type GetCustomersByCustomerApiArg = {
  /** A customer id */
  customer: string;
};
export type PutCustomersByCustomerApiResponse = /** status 200 OK */ undefined;
export type PutCustomersByCustomerApiArg = {
  /** A customer id */
  customer: string;
  /** The Customer data to edit */
  body: Customer;
};
export type GetCustomersByCustomerProjectsAndProjectCampaignsApiResponse =
  /** status 200 A list of Campaigns with the Campaign id */ (Campaign & {
    id: number;
  })[];
export type GetCustomersByCustomerProjectsAndProjectCampaignsApiArg = {
  /** A customer id */
  customer: string;
  /** A project id */
  project: string;
};
export type PostCustomersByCustomerProjectsAndProjectCampaignsApiResponse =
  /** status 201 A single Campaigns with the Campaign id and Project data */ Campaign & {
    id: number;
  } & {
    project?: Project & {
      id?: number;
    };
  };
export type PostCustomersByCustomerProjectsAndProjectCampaignsApiArg = {
  /** A customer id */
  customer: string;
  /** A project id */
  project: string;
  /** The Campaign data to set on the newly created Campaign */
  campaign: Campaign;
};
export type PostCampaignsApiResponse =
  /** status 201 A single Campaigns with the Campaign id and Project data */ Campaign & {
    id: number;
  } & {
    project?: Project & {
      id?: number;
    };
  };
export type PostCampaignsApiArg = {
  /** The Campaign data to set on the newly created Campaign, including the id of the Project to link the Campaign to */
  body: Campaign & {
    project_id?: number;
  };
};
export type GetCampaignsApiResponse =
  /** status 200 A list of Campaigns with the Campaign id */ (Campaign & {
    id: number;
  })[];
export type GetCampaignsApiArg = void;
export type GetCampaignsByCampaignApiResponse =
  /** status 200 A single Campaigns with the Campaign id and Project data */ Campaign & {
    id: number;
  } & {
    project?: Project & {
      id?: number;
    };
  };
export type GetCampaignsByCampaignApiArg = {
  /** A campaign id */
  campaign: string;
};
export type PutCampaignsByCampaignApiResponse =
  /** status 200 A single Campaigns with the Campaign id and Project data */ Campaign & {
    id: number;
  } & {
    project?: Project & {
      id?: number;
    };
  };
export type PutCampaignsByCampaignApiArg = {
  /** A campaign id */
  campaign: string;
  /** The Campaign data to edit */
  campaignOptional: CampaignOptional;
};
export type GetCampaignsByCampaignTasksApiResponse =
  /** status 200 A list of UseCase linked with the Campaign */ (Task & {
    id?: number;
  })[];
export type GetCampaignsByCampaignTasksApiArg = {
  /** A campaign id */
  campaign: string;
};
export type PostCampaignsByCampaignTasksApiResponse =
  /** status 201 Created */ undefined;
export type PostCampaignsByCampaignTasksApiArg = {
  /** A campaign id */
  campaign: string;
  /** The data of the new UseCase to link to the Campaign */
  taskOptional: TaskOptional;
};
export type GetCampaignsByCampaignTasksAndTaskApiResponse =
  /** status 200 A UseCase linked with the Campaign */ Task;
export type GetCampaignsByCampaignTasksAndTaskApiArg = {
  /** A campaign id */
  campaign: string;
  /** A task id */
  task: string;
};
export type PutCampaignsByCampaignTasksAndTaskApiResponse =
  /** status 200 OK */ Task;
export type PutCampaignsByCampaignTasksAndTaskApiArg = {
  /** A campaign id */
  campaign: string;
  /** A task id */
  task: string;
  /** The data to edit in the UseCase linked to the Campaign */
  taskOptional: TaskOptional;
};
export type PostCampaignsByCampaignCandidatesApiResponse =
  /** status 200 OK */ {
    tester_id: number;
    accepted: boolean;
    status: "ready" | "in-progress" | "completed" | "excluded" | "removed";
    device: "any" | UserDevice;
  };
export type PostCampaignsByCampaignCandidatesApiArg = {
  /** A campaign id */
  campaign: string;
  body: {
    tester_id: number;
  };
};
export type GetPopupsApiResponse = /** status 200 OK */ ({
  id?: number;
} & Popup)[];
export type GetPopupsApiArg = {
  /** Max items to retrieve */
  limit?: number;
  /** Items to skip for pagination */
  start?: number;
};
export type PostPopupsApiResponse = /** status 201 Created */ {
  id?: number;
} & Popup;
export type PostPopupsApiArg = {
  popup: Popup;
};
export type GetPopupsByPopupApiResponse = /** status 200 OK */ {
  id?: number;
} & Popup;
export type GetPopupsByPopupApiArg = {
  popup: number;
};
export type PatchPopupsByPopupApiResponse = /** status 200 OK */ {
  id?: number;
} & Popup;
export type PatchPopupsByPopupApiArg = {
  popup: number;
  body: Popup;
};
export type GetDevicesByDeviceTypeModelsApiResponse = /** status 200 OK */ {
  manufacturer?: string;
  models?: {
    id?: number;
    name?: string;
  }[];
}[];
export type GetDevicesByDeviceTypeModelsApiArg = {
  deviceType: string;
  /** Key-value Array for item filtering */
  filterBy?: object;
};
export type GetCertificationsApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
  area: string;
  institute: string;
}[];
export type GetCertificationsApiArg = {
  /** Key-value Array for item filtering */
  filterBy?: object;
};
export type GetDevicesByDeviceTypeOperatingSystemsApiResponse =
  /** status 200 OK */ {
    id?: number;
    name?: string;
  }[];
export type GetDevicesByDeviceTypeOperatingSystemsApiArg = {
  deviceType: string;
  /** Key-value Array for item filtering */
  filterBy?: object;
};
export type GetDevicesByDeviceTypeOsVersionsApiResponse = /** status 200 OK */ {
  id?: number;
  name?: string;
}[];
export type GetDevicesByDeviceTypeOsVersionsApiArg = {
  deviceType: string;
  /** Key-value Array for item filtering */
  filterBy?: object;
};
export type GetLanguagesApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
}[];
export type GetLanguagesApiArg = void;
export type GetEmploymentsApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
}[];
export type GetEmploymentsApiArg = void;
export type GetEducationApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
}[];
export type GetEducationApiArg = void;
export type PostMediaApiResponse = /** status 200 OK */ {
  files: {
    name: string;
    path: string;
  }[];
  failed?: {
    name: string;
    errorCode: string;
  }[];
};
export type PostMediaApiArg = {
  body: {
    media?: {} | Blob[];
  };
};
export type DeleteMediaApiResponse = /** status 200 OK */ undefined;
export type DeleteMediaApiArg = {
  body: {
    url: string;
  };
};
export type GetUsersApiResponse = /** status 200 OK */ User[];
export type GetUsersApiArg = void;
export type PostUsersApiResponse = /** status 200 OK */ User;
export type PostUsersApiArg = {
  body: {
    name: string;
    surname: string;
    email: string;
    password: string;
    country: string;
    birthDate: string;
    referral?: string;
  };
};
export type GetUsersMeApiResponse = /** status 200 OK */ {
  username?: string;
  name?: string;
  surname?: string;
  email?: string;
  image?: string;
  id: number;
  wp_user_id?: number;
  role?: string;
  is_verified?: boolean;
  rank?: string;
  total_exp_pts?: number;
  booty?: number;
  pending_booty?: number;
  languages?: {
    id?: number;
    name?: string;
  }[];
  onboarding_completed?: boolean;
  additional?: AdditionalField[];
  gender?: "male" | "female" | "not-specified" | "other";
  birthDate?: string;
  phone?: string;
  education?: {
    id: number;
    name: string;
  };
  profession?: {
    id: number;
    name: string;
  };
  certifications?: Certification[] | boolean;
  completionPercent?: number;
  country?: string;
  city?: string;
  attended_cp?: number;
  approved_bugs?: number;
  booty_threshold?: {
    value: number;
    isOver: boolean;
  };
};
export type GetUsersMeApiArg = {
  /** Comma separated string of specific fields requested */
  fields?: string;
};
export type PutUsersMeApiResponse = /** status 200 OK */ User;
export type PutUsersMeApiArg = {
  body: {
    name?: string;
    surname?: string;
    password?: string;
    email?: string;
  };
};
export type PatchUsersMeApiResponse = /** status 200 OK */ {
  username?: string;
  name?: string;
  surname?: string;
  email?: string;
  image?: string;
  id: number;
  wp_user_id?: number;
  role?: string;
  is_verified?: boolean;
  rank?: string;
  total_exp_pts?: number;
  booty?: number;
  pending_booty?: number;
  languages?: {
    id?: number;
    name?: string;
  }[];
  onboarding_completed?: boolean;
  additional?: AdditionalField[];
  gender?: "male" | "female" | "not-specified" | "other";
  birthDate?: string;
  phone?: string;
  education?: {
    id: number;
    name: string;
  };
  profession?: {
    id: number;
    name: string;
  };
  certifications?: Certification[] | boolean;
  completionPercent?: number;
  country?: string;
  city?: string;
  attended_cp?: number;
  approved_bugs?: number;
};
export type PatchUsersMeApiArg = {
  body: {
    name?: string;
    email?: string;
    onboarding_completed?: boolean;
    surname?: string;
    gender?: "male" | "female" | "not-specified" | "other";
    birthDate?: string;
    phone?: string;
    education?: number;
    profession?: number;
    country?: string;
    city?: string;
    password?: string;
    oldPassword?: string;
  };
};
export type DeleteUsersMeApiResponse = /** status 200 OK */ undefined;
export type DeleteUsersMeApiArg = {
  body: {
    reason: string;
  };
};
export type GetUsersMeBugsApiResponse = /** status 200 OK */ {
  results: ({
    id: number;
  } & Bug)[];
  limit?: number;
  size?: number;
  start?: number;
  total?: number;
};
export type GetUsersMeBugsApiArg = {
  /** Items to skip for pagination */
  start?: number;
  /** Max items to retrieve */
  limit?: number;
  /** Key-value Array for item filtering */
  filterBy?: object;
  /** The field for item order */
  orderBy?: "title" | "campaign" | "status" | "id" | "severity";
  /** How to order values (ASC, DESC) */
  order?: "ASC" | "DESC";
};
export type GetUsersMeExperienceApiResponse = /** status 200 OK */ {
  results: {
    id: number;
    activity: {
      id: number;
    };
    campaign: {
      id: number;
      title?: string;
    };
    date: string;
    amount: number;
    note?: string;
  }[];
  limit?: number;
  size?: number;
  start?: number;
  total?: number;
  sum: number;
};
export type GetUsersMeExperienceApiArg = {
  /** Max items to retrieve */
  limit?: number;
  /** Items to skip for pagination */
  start?: number;
  /** Key-value Array for item filtering */
  filterBy?: object;
  /** How to order values (ASC, DESC) */
  order?: "ASC" | "DESC";
  /** A comma separated list of fields which will be searched */
  searchBy?: string;
  /** The value to search for */
  search?: string;
  /** The field for item order */
  orderBy?: "amount" | "campaign" | "date" | "note" | "activity" | "id";
};
export type GetUsersMeFiscalApiResponse = /** status 200 OK */ {
  address: {
    country: string;
    province: string;
    city: string;
    street: string;
    streetNumber?: string;
    cityCode: string;
  };
  type: FiscalType;
  birthPlace: {
    city?: string;
    province?: string;
  };
  fiscalId: string;
  fiscalStatus: "Verified" | "Unverified";
  gender: "male" | "female";
};
export type GetUsersMeFiscalApiArg = void;
export type PostUsersMeFiscalApiResponse = /** status 201 Created */ {
  address: {
    country: string;
    province: string;
    city: string;
    street: string;
    streetNumber?: string;
    cityCode: string;
  };
  type: FiscalType;
  birthPlace?: {
    city?: string;
    province?: string;
  };
  fiscalId: string;
  fiscalStatus: "Verified" | "Unverified";
  gender: "male" | "female";
};
export type PostUsersMeFiscalApiArg = {
  body: {
    address: {
      country: string;
      province: string;
      city: string;
      street: string;
      streetNumber: string;
      cityCode: string;
    };
    type: FiscalType;
    birthPlace?: FiscalBirthCity;
    fiscalId: string;
    gender: "male" | "female";
  };
};
export type PutUsersMeFiscalApiResponse = /** status 200 OK */ {
  address: {
    country: string;
    province: string;
    city: string;
    street: string;
    streetNumber?: string;
    cityCode: string;
  };
  type: FiscalType;
  birthPlace?: {
    city?: string;
    province?: string;
  };
  fiscalId: string;
  fiscalStatus: "Verified" | "Unverified";
  gender: "male" | "female";
};
export type PutUsersMeFiscalApiArg = {
  body: {
    address: {
      country: string;
      province: string;
      city: string;
      street: string;
      streetNumber: string;
      cityCode: string;
    };
    type: FiscalType;
    birthPlace?: FiscalBirthCity;
    fiscalId: string;
    gender: "male" | "female";
  };
};
export type GetUsersMeCampaignsApiResponse = /** status 200 OK */ {
  results?: ({
    id: number;
  } & Campaign)[];
  limit?: number;
  size?: number;
  start?: number;
  total?: number;
};
export type GetUsersMeCampaignsApiArg = {
  /** Items to skip for pagination */
  start?: number;
  /** Max items to retrieve */
  limit?: number;
  /** Key-value Array for item filtering */
  filterBy?: object;
  /** How to localize values */
  locale?: "en" | "it";
  /** How to order values (ASC, DESC) */
  order?: "ASC" | "DESC";
  /** The field for item order */
  orderBy?: "name" | "start_date" | "end_date" | "close_date";
};
export type GetUsersMePopupsApiResponse = /** status 200 OK */ {
  id?: number;
  title?: string;
  content?: string;
  once?: boolean;
}[];
export type GetUsersMePopupsApiArg = {
  /** Show all popup history, expired popups included */
  showExpired?: boolean;
  /** How to order values (ASC, DESC) */
  order?: "ASC" | "DESC";
};
export type PostUsersMeCampaignsByCampaignIdBugsApiResponse =
  /** status 200 OK */ {
    id: number;
    internalId?: string;
    testerId: number;
    title: string;
    description: string;
    status: "PENDING" | "APPROVED" | "REFUSED" | "NEED-REVIEW";
    expected: string;
    current: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    replicability: "ONCE" | "SOMETIMES" | "ALWAYS";
    type:
      | "CRASH"
      | "GRAPHIC"
      | "MALFUNCTION"
      | "OTHER"
      | "PERFORMANCE"
      | "SECURITY"
      | "TYPO"
      | "USABILITY";
    notes: string;
    usecase: string;
    device: UserDevice;
    media: string[];
    additional?: {
      slug: string;
      value: string;
    }[];
  };
export type PostUsersMeCampaignsByCampaignIdBugsApiArg = {
  /** the campaign id */
  campaignId: string;
  body: {
    title: string;
    description: string;
    expected: string;
    current: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    replicability: "ONCE" | "SOMETIMES" | "ALWAYS";
    type:
      | "CRASH"
      | "GRAPHIC"
      | "MALFUNCTION"
      | "OTHER"
      | "PERFORMANCE"
      | "SECURITY"
      | "TYPO"
      | "USABILITY";
    notes: string;
    lastSeen: string;
    usecase: number;
    device: number;
    media: string[];
    additional?: {
      slug: string;
      value: string;
    }[];
  };
};
export type GetUsersMePopupsByPopupApiResponse = /** status 200 OK */ {
  id?: number;
} & Popup;
export type GetUsersMePopupsByPopupApiArg = {
  popup: number;
};
export type GetUsersMeDevicesApiResponse = /** status 200 OK */ ({
  id?: number;
} & UserDevice)[];
export type GetUsersMeDevicesApiArg = void;
export type PostUsersMeDevicesApiResponse = /** status 201 Created */ {
  id?: number;
} & UserDevice;
export type PostUsersMeDevicesApiArg = {
  body: {
    device: {} | {};
    operating_system: number;
  };
};
export type GetUsersMeDevicesByDeviceIdApiResponse = /** status 200 OK */ {
  id?: number;
} & UserDevice;
export type GetUsersMeDevicesByDeviceIdApiArg = {
  deviceId: number;
};
export type PatchUsersMeDevicesByDeviceIdApiResponse = /** status 200 OK */ {
  id?: number;
} & UserDevice;
export type PatchUsersMeDevicesByDeviceIdApiArg = {
  deviceId: number;
  body: {
    operating_system: number;
  };
};
export type DeleteUsersMeDevicesByDeviceIdApiResponse = /** status 200 OK */ {
  message?: string;
};
export type DeleteUsersMeDevicesByDeviceIdApiArg = {
  deviceId: number;
};
export type PostUsersMeCertificationsApiResponse =
  /** status 201 Created */
  | Certification
  | {
      message: string;
    };
export type PostUsersMeCertificationsApiArg = {
  body:
    | {
        certifications: boolean;
      }
    | {
        certification_id: number;
        achievement_date: string;
      };
};
export type DeleteUsersMeCertificationsByCertificationIdApiResponse =
  /** status 200 OK */ {
    message?: string;
  };
export type DeleteUsersMeCertificationsByCertificationIdApiArg = {
  /** The id of the certification */
  certificationId: number;
};
export type PostUsersMeLanguagesApiResponse = /** status 201 Created */ {
  id: string;
  name: string;
};
export type PostUsersMeLanguagesApiArg = {
  body: {
    languageId?: number;
  };
};
export type PutUsersMeLanguagesApiResponse = /** status 200 OK */ {
  id?: number;
  name?: string;
}[];
export type PutUsersMeLanguagesApiArg = {
  body: number[];
};
export type DeleteUsersMeLanguagesByLanguageIdApiResponse =
  /** status 200 OK */ {
    message?: string;
  };
export type DeleteUsersMeLanguagesByLanguageIdApiArg = {
  /** The id of the language */
  languageId: number;
};
export type PutUsersMeAdditionalsByFieldIdApiResponse =
  /** status 200 OK */
  AdditionalField[] | AdditionalField;
export type PutUsersMeAdditionalsByFieldIdApiArg = {
  /** The id of the field to edit */
  fieldId: number;
  body:
    | {
        value: string;
        is_candidate?: boolean;
      }[]
    | {
        value: string;
        is_candidate?: boolean;
      };
};
export type GetUsersMePendingBootyApiResponse = /** status 200 OK */ {
  results?: ({
    id: number;
  } & {
    name: string;
    amount: {
      value?: number;
      currency?: string;
    };
    attributionDate: string;
  })[];
  limit?: number;
  size: number;
  start: number;
  total?: number;
};
export type GetUsersMePendingBootyApiArg = {
  /** Items to skip for pagination */
  start?: number;
  /** Max items to retrieve */
  limit?: number;
  /** The field for item order */
  orderBy?: "id" | "attributionDate" | "amount" | "activityName";
  /** How to order values (ASC, DESC) */
  order?: "ASC" | "DESC";
};
export type GetUsersMePaymentsApiResponse = /** status 200 OK */ {
  results?: ({
    id: number;
  } & {
    status: "paid" | "processing";
    amount: {
      value?: number;
      currency?: string;
    };
    paidDate: any | "-";
    method: {
      type: "paypal" | "iban";
      note: string;
    };
    receipt?: string;
  })[];
  limit?: number;
  size: number;
  start: number;
  total?: number;
};
export type GetUsersMePaymentsApiArg = {
  /** Items to skip for pagination */
  start?: number;
  /** Max items to retrieve */
  limit?: number;
  /** The field for item order */
  orderBy?: string;
  /** How to order values (ASC, DESC) */
  order?: "ASC" | "DESC";
};
export type PostUsersMePaymentsApiResponse = /** status 200 OK */ {
  id?: number;
  amount?: number;
};
export type PostUsersMePaymentsApiArg = {
  body: {
    method:
      | {
          type: "paypal";
          email: string;
        }
      | {
          type: "iban";
          accountHolderName: string;
          iban: string;
        };
  };
};
export type GetUsersMePaymentsByPaymentApiResponse = /** status 200 OK */ {
  results: ({
    id: number;
  } & {
    type: string;
    amount: {
      value: number;
      currency: string;
    };
    date: string;
    activity: string;
  })[];
  limit?: number;
  size: number;
  total?: number;
  start: number;
};
export type GetUsersMePaymentsByPaymentApiArg = {
  payment: string;
  /** Max items to retrieve */
  limit?: number;
  /** Items to skip for pagination */
  start?: number;
  /** How to order values (ASC, DESC) */
  order?: "ASC" | "DESC";
  /** The value to order by */
  orderBy?: "amount" | "type" | "date" | "activity";
};
export type GetUsersMeRankApiResponse = /** status 200 OK */ {
  level: MonthlyLevel;
  previousLevel: MonthlyLevel;
  rank: number;
  points: number;
  prospect: {
    level: MonthlyLevel;
    maintenance?: number;
    next?: {
      points: number;
      level: MonthlyLevel;
    };
  };
};
export type GetUsersMeRankApiArg = void;
export type GetUsersMeRankListApiResponse = /** status 200 OK */ {
  tops: RankingItem[];
  peers: RankingItem[];
};
export type GetUsersMeRankListApiArg = void;
export type GetCustomUserFieldsApiResponse = /** status 200 OK */ {
  group: {
    id: number;
    name: TranslatablePage;
    description?: TranslatablePage;
  };
  fields?: CustomUserFieldsData[];
}[];
export type GetCustomUserFieldsApiArg = void;
export type GetCountriesByCodeRegionApiResponse = /** status 200 OK */ {
  name: string;
  value: string;
}[];
export type GetCountriesByCodeRegionApiArg = {
  code: string;
  languageCode?: string;
};
export type GetPaymentsApiResponse = /** status 200 OK */ {
  limit?: number;
  size: number;
  start: number;
  total?: number;
  items: {
    created: string;
    updated: string;
    id: number;
    amount: {
      value: number;
      currency: string;
    };
    type: "paypal" | "transferwise";
    tryber: {
      id: number;
      name: string;
      surname: string;
    };
    error?: string;
  }[];
};
export type GetPaymentsApiArg = {
  /** The status of the payment */
  status?: "pending" | "failed";
  /** How to order values (ASC, DESC) */
  order?: "ASC" | "DESC";
  /** The value to order by */
  orderBy?: "created" | "updated" | "id";
  /** Items to skip for pagination */
  start?: number;
  /** Max items to retrieve */
  limit?: number;
  /** Key-value Array for item filtering */
  filterBy?: object;
};
export type PostPaymentsByPaymentIdApiResponse = /** status 200 OK */ undefined;
export type PostPaymentsByPaymentIdApiArg = {
  paymentId: string;
};
export type DeletePaymentsByPaymentIdApiResponse =
  /** status 200 OK */ undefined;
export type DeletePaymentsByPaymentIdApiArg = {
  paymentId: string;
};
export type GetLevelsApiResponse = /** status 200 OK */ LevelDefinition[];
export type GetLevelsApiArg = void;
export type GetUsersMeCampaignsByCampaignIdApiResponse = /** status 200 OK */ {
  id: number;
  title: string;
  language?: {
    code: string;
    message: string;
  };
  titleRule?: boolean;
  minimumMedia: number;
  useCases: {
    id: number;
    name: string;
  }[];
  additionalFields?: CampaignAdditionalField[];
  bugTypes: {
    valid: string[];
    invalid: string[];
  };
  bugSeverity: {
    valid: string[];
    invalid: string[];
  };
  bugReplicability: {
    valid: string[];
    invalid: string[];
  };
  hasBugForm: boolean;
  devices?: ({
    id: number;
  } & UserDevice)[];
  validFileExtensions: string[];
};
export type GetUsersMeCampaignsByCampaignIdApiArg = {
  campaignId: string;
};
export type PostUsersMeCampaignsByCampaignIdMediaApiResponse =
  /** status 200 OK */ {
    files?: {
      name: string;
      path: string;
    }[];
    failed?: {
      name: string;
      errorCode: "FILE_TOO_BIG" | "INVALID_FILE_EXTENSION" | "GENERIC_ERROR";
    }[];
  };
export type PostUsersMeCampaignsByCampaignIdMediaApiArg = {
  campaignId: string;
  body: {
    media?: {} | string[];
  };
};
export type GetUsersMeCampaignsByCampaignIdDevicesApiResponse =
  /** status 200 OK */ UserDevice[];
export type GetUsersMeCampaignsByCampaignIdDevicesApiArg = {
  campaignId: string;
};
export type Project = {
  name?: string;
};
export type BugSeverity = {
  id?: number;
  name?: string;
};
export type BugType = {
  id?: number;
};
export type Replicability = {
  id?: string;
};
export type User = {
  username?: string;
  name?: string;
  surname?: string;
  email?: string;
  image?: string;
  id?: number;
  wp_user_id?: number;
  role?: string;
  is_verified?: boolean;
};
export type CampaignField = {
  id?: number;
};
export type TranslatablePage = {
  en?: string;
  it?: string;
  es?: string;
};
export type CampaignOptional = {
  name?: string;
  customer_title?: string;
  internal_id?: string;
  dates?: {
    start?: string;
    end?: string;
    close?: string;
  };
  status?: boolean;
  language?: string;
  public?: boolean;
  hasBugParade?: boolean;
  devices?: {
    id?: string;
  }[];
  minNumberOfMedia?: number;
  titleRule?: boolean;
  allowed?: {
    severities?: BugSeverity[];
    bug_types?: BugType[];
    replicabilities?: Replicability[];
  };
  projectManager?: User;
  customerCanViewReviewing?: boolean;
  additionalFields?: CampaignField[];
  tokens?: number;
  csm_effort?: number;
  ux_effort?: number;
  preview_link?: TranslatablePage;
  manual_link?: TranslatablePage;
  bugform_link?: {} | TranslatablePage;
  applied?: boolean;
};
export type CampaignType = {} | {};
export type CampaignRequired = {
  name: string;
  internal_id: string;
  dates: {
    start: string;
    end: string;
    close: string;
  };
  devices: {
    id: string;
  }[];
  projectManager: User;
  campaign_type: CampaignType;
};
export type Campaign = CampaignOptional & CampaignRequired;
export type Customer = User & {
  customer_name?: string;
};
export type TaskOptional = {
  name?: string;
  content?: string;
  campaign_id?: number;
  group?: number;
  allow_media?: boolean;
};
export type TaskRequired = {
  name: string;
  content: string;
  campaign_id: number;
};
export type Task = TaskOptional & TaskRequired;
export type UserDevice = {
  type: string;
  id: number;
  device:
    | {
        manufacturer: string;
        model: string;
        id?: number;
      }
    | {
        pc_type: string;
      };
  operating_system: {
    id: number;
    platform: string;
    version: string;
  };
};
export type Popup = {
  profiles?:
    | number[]
    | (
        | "all"
        | "italian"
        | "non-italian"
        | "logged-in-year"
        | "not-logged-in-year"
      );
  once?: boolean;
  content?: string;
  title?: string;
};
export type AdditionalField = {
  field_id: number;
  name: string;
  value: string;
  text?: string;
  is_candidate?: boolean;
};
export type Certification = {
  id?: number;
  name: string;
  area: string;
  institute: string;
  achievement_date: string;
};
export type BugStatus = {
  id?: number;
  name?: string;
  description?: string;
};
export type Bug = {
  severity?: BugSeverity;
  status?: BugStatus;
  campaign?: CampaignOptional & {
    id?: number;
  };
  title?: string;
};
export type FiscalType =
  | "withholding"
  | "witholding-extra"
  | "other"
  | "non-italian";
export type FiscalBirthCity =
  | {
      city: string;
      province: string;
    }
  | {
      placeId: string;
    };
export type MonthlyLevel = {
  id: number;
  name: string;
};
export type RankingItem = {
  position: number;
  image: string;
  id: number;
  name: string;
  monthly_exp: number;
};
export type CustomUserFieldsDataOption = {
  id: number;
  name: string;
};
export type CustomUserFieldsData = {
  id: number;
  type: "select" | "multiselect" | "text";
  placeholder?: TranslatablePage;
  allow_other?: boolean;
  name: TranslatablePage;
  format?: string;
  options?: CustomUserFieldsDataOption[];
};
export type LevelDefinition = {
  id: number;
  name: string;
  reach?: number;
  hold?: number;
};
export type CampaignAdditionalField = {
  name: string;
  slug: string;
  error: string;
} & (
  | {
      type: "select";
      options: string[];
    }
  | {
      type: "text";
      regex: string;
    }
);
export const {
  useGetQuery,
  usePostAuthenticateMutation,
  useGetProjectsQuery,
  useGetCustomersQuery,
  usePostCustomersMutation,
  useGetCustomersByCustomerQuery,
  usePutCustomersByCustomerMutation,
  useGetCustomersByCustomerProjectsAndProjectCampaignsQuery,
  usePostCustomersByCustomerProjectsAndProjectCampaignsMutation,
  usePostCampaignsMutation,
  useGetCampaignsQuery,
  useGetCampaignsByCampaignQuery,
  usePutCampaignsByCampaignMutation,
  useGetCampaignsByCampaignTasksQuery,
  usePostCampaignsByCampaignTasksMutation,
  useGetCampaignsByCampaignTasksAndTaskQuery,
  usePutCampaignsByCampaignTasksAndTaskMutation,
  usePostCampaignsByCampaignCandidatesMutation,
  useGetPopupsQuery,
  usePostPopupsMutation,
  useGetPopupsByPopupQuery,
  usePatchPopupsByPopupMutation,
  useGetDevicesByDeviceTypeModelsQuery,
  useGetCertificationsQuery,
  useGetDevicesByDeviceTypeOperatingSystemsQuery,
  useGetDevicesByDeviceTypeOsVersionsQuery,
  useGetLanguagesQuery,
  useGetEmploymentsQuery,
  useGetEducationQuery,
  usePostMediaMutation,
  useDeleteMediaMutation,
  useGetUsersQuery,
  usePostUsersMutation,
  useGetUsersMeQuery,
  usePutUsersMeMutation,
  usePatchUsersMeMutation,
  useDeleteUsersMeMutation,
  useGetUsersMeBugsQuery,
  useGetUsersMeExperienceQuery,
  useGetUsersMeFiscalQuery,
  usePostUsersMeFiscalMutation,
  usePutUsersMeFiscalMutation,
  useGetUsersMeCampaignsQuery,
  useGetUsersMePopupsQuery,
  usePostUsersMeCampaignsByCampaignIdBugsMutation,
  useGetUsersMePopupsByPopupQuery,
  useGetUsersMeDevicesQuery,
  usePostUsersMeDevicesMutation,
  useGetUsersMeDevicesByDeviceIdQuery,
  usePatchUsersMeDevicesByDeviceIdMutation,
  useDeleteUsersMeDevicesByDeviceIdMutation,
  usePostUsersMeCertificationsMutation,
  useDeleteUsersMeCertificationsByCertificationIdMutation,
  usePostUsersMeLanguagesMutation,
  usePutUsersMeLanguagesMutation,
  useDeleteUsersMeLanguagesByLanguageIdMutation,
  usePutUsersMeAdditionalsByFieldIdMutation,
  useGetUsersMePendingBootyQuery,
  useGetUsersMePaymentsQuery,
  usePostUsersMePaymentsMutation,
  useGetUsersMePaymentsByPaymentQuery,
  useGetUsersMeRankQuery,
  useGetUsersMeRankListQuery,
  useGetCustomUserFieldsQuery,
  useGetCountriesByCodeRegionQuery,
  useGetPaymentsQuery,
  usePostPaymentsByPaymentIdMutation,
  useDeletePaymentsByPaymentIdMutation,
  useGetLevelsQuery,
  useGetUsersMeCampaignsByCampaignIdQuery,
  usePostUsersMeCampaignsByCampaignIdMediaMutation,
  useGetUsersMeCampaignsByCampaignIdDevicesQuery,
} = injectedRtkApi;
