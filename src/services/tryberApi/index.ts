import { api } from "./api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    get: build.query<GetApiResponse, GetApiArg>({
      query: () => ({ url: `/` }),
    }),
    getAgreements: build.query<GetAgreementsApiResponse, GetAgreementsApiArg>({
      query: (queryArg) => ({
        url: `/agreements`,
        params: {
          filterBy: queryArg.filterBy,
          start: queryArg.start,
          limit: queryArg.limit,
        },
      }),
    }),
    postAgreements: build.mutation<
      PostAgreementsApiResponse,
      PostAgreementsApiArg
    >({
      query: (queryArg) => ({
        url: `/agreements`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    putAgreementsByAgreementId: build.mutation<
      PutAgreementsByAgreementIdApiResponse,
      PutAgreementsByAgreementIdApiArg
    >({
      query: (queryArg) => ({
        url: `/agreements/${queryArg.agreementId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteAgreementsByAgreementId: build.mutation<
      DeleteAgreementsByAgreementIdApiResponse,
      DeleteAgreementsByAgreementIdApiArg
    >({
      query: (queryArg) => ({
        url: `/agreements/${queryArg.agreementId}`,
        method: "DELETE",
      }),
    }),
    getAgreementsByAgreementId: build.query<
      GetAgreementsByAgreementIdApiResponse,
      GetAgreementsByAgreementIdApiArg
    >({
      query: (queryArg) => ({ url: `/agreements/${queryArg.agreementId}` }),
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
    getBrowsers: build.query<GetBrowsersApiResponse, GetBrowsersApiArg>({
      query: () => ({ url: `/browsers` }),
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
      query: (queryArg) => ({
        url: `/campaigns`,
        params: {
          fields: queryArg.fields,
          start: queryArg.start,
          limit: queryArg.limit,
          mine: queryArg.mine,
          search: queryArg.search,
          order: queryArg.order,
          orderBy: queryArg.orderBy,
          filterBy: queryArg.filterBy,
        },
      }),
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
    getCampaignsByCampaignBugs: build.query<
      GetCampaignsByCampaignBugsApiResponse,
      GetCampaignsByCampaignBugsApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.campaign}/bugs`,
        params: {
          limit: queryArg.limit,
          start: queryArg.start,
          search: queryArg.search,
          order: queryArg.order,
          orderBy: queryArg.orderBy,
          filterBy: queryArg.filterBy,
        },
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
    getCampaignsByCampaignCandidates: build.query<
      GetCampaignsByCampaignCandidatesApiResponse,
      GetCampaignsByCampaignCandidatesApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.campaign}/candidates`,
        params: {
          limit: queryArg.limit,
          start: queryArg.start,
          fields: queryArg.fields,
          filterByInclude: queryArg.filterByInclude,
          filterByExclude: queryArg.filterByExclude,
          filterByAge: queryArg.filterByAge,
          show: queryArg.show,
        },
      }),
    }),
    getCampaignsByCampaignClusters: build.query<
      GetCampaignsByCampaignClustersApiResponse,
      GetCampaignsByCampaignClustersApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.campaign}/clusters`,
      }),
    }),
    getCampaignsByCampaignForms: build.query<
      GetCampaignsByCampaignFormsApiResponse,
      GetCampaignsByCampaignFormsApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.campaign}/forms` }),
    }),
    getCampaignsByCampaignGroups: build.query<
      GetCampaignsByCampaignGroupsApiResponse,
      GetCampaignsByCampaignGroupsApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.campaign}/groups` }),
    }),
    getCampaignsByCampaignObservations: build.query<
      GetCampaignsByCampaignObservationsApiResponse,
      GetCampaignsByCampaignObservationsApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.campaign}/observations`,
        params: { filterBy: queryArg.filterBy },
      }),
    }),
    getCampaignsByCampaignPayouts: build.query<
      GetCampaignsByCampaignPayoutsApiResponse,
      GetCampaignsByCampaignPayoutsApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.campaign}/payouts` }),
    }),
    getCampaignsByCampaignProspect: build.query<
      GetCampaignsByCampaignProspectApiResponse,
      GetCampaignsByCampaignProspectApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.campaign}/prospect`,
        params: {
          filterByInclude: queryArg.filterByInclude,
          filterByExclude: queryArg.filterByExclude,
        },
      }),
    }),
    putCampaignsByCampaignProspect: build.mutation<
      PutCampaignsByCampaignProspectApiResponse,
      PutCampaignsByCampaignProspectApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.campaign}/prospect`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    patchCampaignsByCampaignProspect: build.mutation<
      PatchCampaignsByCampaignProspectApiResponse,
      PatchCampaignsByCampaignProspectApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.campaign}/prospect`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    putCampaignsByCampaignProspectAndTesterId: build.mutation<
      PutCampaignsByCampaignProspectAndTesterIdApiResponse,
      PutCampaignsByCampaignProspectAndTesterIdApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.campaign}/prospect/${queryArg.testerId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    getCampaignsByCampaignStats: build.query<
      GetCampaignsByCampaignStatsApiResponse,
      GetCampaignsByCampaignStatsApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.campaign}/stats` }),
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
    getCampaignsByCampaignUx: build.query<
      GetCampaignsByCampaignUxApiResponse,
      GetCampaignsByCampaignUxApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.campaign}/ux` }),
    }),
    patchCampaignsByCampaignUx: build.mutation<
      PatchCampaignsByCampaignUxApiResponse,
      PatchCampaignsByCampaignUxApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.campaign}/ux`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    postCampaignsForms: build.mutation<
      PostCampaignsFormsApiResponse,
      PostCampaignsFormsApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/forms`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getCampaignsForms: build.query<
      GetCampaignsFormsApiResponse,
      GetCampaignsFormsApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/forms`,
        params: {
          searchBy: queryArg.searchBy,
          search: queryArg.search,
          limit: queryArg.limit,
          start: queryArg.start,
        },
      }),
    }),
    getCampaignsFormsByFormId: build.query<
      GetCampaignsFormsByFormIdApiResponse,
      GetCampaignsFormsByFormIdApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/forms/${queryArg.formId}` }),
    }),
    putCampaignsFormsByFormId: build.mutation<
      PutCampaignsFormsByFormIdApiResponse,
      PutCampaignsFormsByFormIdApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/forms/${queryArg.formId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    getCampaignsOwners: build.query<
      GetCampaignsOwnersApiResponse,
      GetCampaignsOwnersApiArg
    >({
      query: () => ({ url: `/campaigns/owners` }),
    }),
    getCampaignTypes: build.query<
      GetCampaignTypesApiResponse,
      GetCampaignTypesApiArg
    >({
      query: () => ({ url: `/campaignTypes` }),
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
    getCountriesByCodeRegion: build.query<
      GetCountriesByCodeRegionApiResponse,
      GetCountriesByCodeRegionApiArg
    >({
      query: (queryArg) => ({
        url: `/countries/${queryArg.code}/region`,
        params: { languageCode: queryArg.languageCode },
      }),
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
        body: queryArg.body,
      }),
    }),
    getCustomersByCustomerProjects: build.query<
      GetCustomersByCustomerProjectsApiResponse,
      GetCustomersByCustomerProjectsApiArg
    >({
      query: (queryArg) => ({
        url: `/customers/${queryArg.customer}/projects`,
      }),
    }),
    postCustomersByCustomerProjects: build.mutation<
      PostCustomersByCustomerProjectsApiResponse,
      PostCustomersByCustomerProjectsApiArg
    >({
      query: (queryArg) => ({
        url: `/customers/${queryArg.customer}/projects`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getCustomUserFields: build.query<
      GetCustomUserFieldsApiResponse,
      GetCustomUserFieldsApiArg
    >({
      query: () => ({ url: `/custom_user_fields` }),
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
    postDossiers: build.mutation<PostDossiersApiResponse, PostDossiersApiArg>({
      query: (queryArg) => ({
        url: `/dossiers`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    putDossiersByCampaign: build.mutation<
      PutDossiersByCampaignApiResponse,
      PutDossiersByCampaignApiArg
    >({
      query: (queryArg) => ({
        url: `/dossiers/${queryArg.campaign}`,
        method: "PUT",
        body: queryArg.dossierCreationData,
      }),
    }),
    getDossiersByCampaign: build.query<
      GetDossiersByCampaignApiResponse,
      GetDossiersByCampaignApiArg
    >({
      query: (queryArg) => ({ url: `/dossiers/${queryArg.campaign}` }),
    }),
    putDossiersByCampaignPhases: build.mutation<
      PutDossiersByCampaignPhasesApiResponse,
      PutDossiersByCampaignPhasesApiArg
    >({
      query: (queryArg) => ({
        url: `/dossiers/${queryArg.campaign}/phases`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    postDossiersByCampaignQuotations: build.mutation<
      PostDossiersByCampaignQuotationsApiResponse,
      PostDossiersByCampaignQuotationsApiArg
    >({
      query: (queryArg) => ({
        url: `/dossiers/${queryArg.campaign}/quotations`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    patchDossiersByCampaignQuotationsAndQuote: build.mutation<
      PatchDossiersByCampaignQuotationsAndQuoteApiResponse,
      PatchDossiersByCampaignQuotationsAndQuoteApiArg
    >({
      query: (queryArg) => ({
        url: `/dossiers/${queryArg.campaign}/quotations/${queryArg.quote}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    getDossiersByCampaignQuotesHistory: build.query<
      GetDossiersByCampaignQuotesHistoryApiResponse,
      GetDossiersByCampaignQuotesHistoryApiArg
    >({
      query: (queryArg) => ({
        url: `/dossiers/${queryArg.campaign}/quotesHistory`,
      }),
    }),
    getEducation: build.query<GetEducationApiResponse, GetEducationApiArg>({
      query: () => ({ url: `/education` }),
    }),
    getEmployments: build.query<
      GetEmploymentsApiResponse,
      GetEmploymentsApiArg
    >({
      query: () => ({ url: `/employments` }),
    }),
    postJotformsByCampaign: build.mutation<
      PostJotformsByCampaignApiResponse,
      PostJotformsByCampaignApiArg
    >({
      query: (queryArg) => ({
        url: `/jotforms/${queryArg.campaign}`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getJotformsForms: build.query<
      GetJotformsFormsApiResponse,
      GetJotformsFormsApiArg
    >({
      query: () => ({ url: `/jotforms/forms` }),
    }),
    getJotformsFormsByFormIdQuestions: build.query<
      GetJotformsFormsByFormIdQuestionsApiResponse,
      GetJotformsFormsByFormIdQuestionsApiArg
    >({
      query: (queryArg) => ({
        url: `/jotforms/forms/${queryArg.formId}/questions`,
      }),
    }),
    getLanguages: build.query<GetLanguagesApiResponse, GetLanguagesApiArg>({
      query: () => ({ url: `/languages` }),
    }),
    getLevels: build.query<GetLevelsApiResponse, GetLevelsApiArg>({
      query: () => ({ url: `/levels` }),
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
    getPhases: build.query<GetPhasesApiResponse, GetPhasesApiArg>({
      query: () => ({ url: `/phases` }),
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
    getProductTypes: build.query<
      GetProductTypesApiResponse,
      GetProductTypesApiArg
    >({
      query: () => ({ url: `/productTypes` }),
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
    headUsersByEmailByEmail: build.mutation<
      HeadUsersByEmailByEmailApiResponse,
      HeadUsersByEmailByEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/users/by-email/${queryArg.email}`,
        method: "HEAD",
      }),
    }),
    getUsersByRoleByRole: build.query<
      GetUsersByRoleByRoleApiResponse,
      GetUsersByRoleByRoleApiArg
    >({
      query: (queryArg) => ({ url: `/users/by-role/${queryArg.role}` }),
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
    getUsersMeCampaignsByCampaignId: build.query<
      GetUsersMeCampaignsByCampaignIdApiResponse,
      GetUsersMeCampaignsByCampaignIdApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/campaigns/${queryArg.campaignId}`,
      }),
    }),
    getUsersMeCampaignsByCampaignCompatibleDevices: build.query<
      GetUsersMeCampaignsByCampaignCompatibleDevicesApiResponse,
      GetUsersMeCampaignsByCampaignCompatibleDevicesApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/campaigns/${queryArg.campaign}/compatible_devices`,
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
    getUsersMeCampaignsByCampaignIdDevices: build.query<
      GetUsersMeCampaignsByCampaignIdDevicesApiResponse,
      GetUsersMeCampaignsByCampaignIdDevicesApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/campaigns/${queryArg.campaignId}/devices`,
      }),
    }),
    getUsersMeCampaignsByCampaignIdForms: build.query<
      GetUsersMeCampaignsByCampaignIdFormsApiResponse,
      GetUsersMeCampaignsByCampaignIdFormsApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/campaigns/${queryArg.campaignId}/forms`,
      }),
    }),
    postUsersMeCampaignsByCampaignIdForms: build.mutation<
      PostUsersMeCampaignsByCampaignIdFormsApiResponse,
      PostUsersMeCampaignsByCampaignIdFormsApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/campaigns/${queryArg.campaignId}/forms`,
        method: "POST",
        body: queryArg.body,
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
    getUsersMePermissions: build.query<
      GetUsersMePermissionsApiResponse,
      GetUsersMePermissionsApiArg
    >({
      query: () => ({ url: `/users/me/permissions` }),
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
    getUsersMePopupsByPopup: build.query<
      GetUsersMePopupsByPopupApiResponse,
      GetUsersMePopupsByPopupApiArg
    >({
      query: (queryArg) => ({ url: `/users/me/popups/${queryArg.popup}` }),
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
    postDossiersByCampaignManual: build.mutation<
      PostDossiersByCampaignManualApiResponse,
      PostDossiersByCampaignManualApiArg
    >({
      query: (queryArg) => ({
        url: `/dossiers/${queryArg.campaign}/manual`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postDossiersByCampaignPreview: build.mutation<
      PostDossiersByCampaignPreviewApiResponse,
      PostDossiersByCampaignPreviewApiArg
    >({
      query: (queryArg) => ({
        url: `/dossiers/${queryArg.campaign}/preview`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as tryberApi };
export type GetApiResponse = /** status 200 OK */ {};
export type GetApiArg = void;
export type GetAgreementsApiResponse = /** status 200 OK */ {
  items: ({
    id: number;
  } & Agreement & {
      customer: {
        id: number;
        company: string;
      };
    })[];
} & PaginationData;
export type GetAgreementsApiArg = {
  /** Key-value Array for item filtering */
  filterBy?: object;
  /** Items to skip for pagination */
  start?: number;
  /** Max items to retrieve */
  limit?: number;
};
export type PostAgreementsApiResponse = /** status 200 OK */ {
  agreementId: number;
};
export type PostAgreementsApiArg = {
  body: {
    customerId: number;
  } & Agreement;
};
export type PutAgreementsByAgreementIdApiResponse = /** status 200 OK */ {
  id: number;
} & Agreement & {
    customer: {
      id: number;
      company: string;
    };
  };
export type PutAgreementsByAgreementIdApiArg = {
  agreementId: string;
  body: Agreement & {
    customerId: number;
  };
};
export type DeleteAgreementsByAgreementIdApiResponse = /** status 200 OK */ {};
export type DeleteAgreementsByAgreementIdApiArg = {
  agreementId: string;
};
export type GetAgreementsByAgreementIdApiResponse = /** status 200 OK */ {
  id: number;
} & Agreement & {
    customer: {
      id: number;
      company: string;
    };
  };
export type GetAgreementsByAgreementIdApiArg = {
  agreementId: string;
};
export type PostAuthenticateApiResponse =
  /** status 200 Authentication data. The token can be used to authenticate the protected requests */ {
    id?: number;
    firstName?: string;
    lastName?: string;
    token?: string;
    username?: string;
    iat?: number;
    exp?: number;
  };
export type PostAuthenticateApiArg = {
  /** A JSON containing username and password */
  body: {
    username: string;
    password: string;
  };
};
export type GetBrowsersApiResponse = /** status 200 OK */ {
  results: {
    id: number;
    name: string;
  }[];
};
export type GetBrowsersApiArg = void;
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
export type GetCampaignsApiResponse = /** status 200 OK */ {
  items?: {
    id?: number;
    name?: string;
    customerTitle?: string;
    startDate?: string;
    endDate?: string;
    status?: "running" | "closed" | "incoming";
    visibility?: "admin" | "smallgroup" | "logged" | "public" | "target";
    resultType?: "bug" | "bugparade" | "no";
    csm?: {
      id: number;
      name: string;
      surname: string;
    };
    customer?: {
      id?: number;
      name: string;
    };
    type?: {
      name: string;
      area: "quality" | "experience";
    };
    project?: {
      id?: number;
      name: string;
    };
    phase?: {
      id: number;
      name: string;
    };
    roles?: {
      role: {
        id: number;
        name: string;
      };
      user: {
        id: number;
        name: string;
        surname: string;
      };
    }[];
    quote?: {
      id: number;
      price: string;
      status: string;
    };
  }[];
} & PaginationData;
export type GetCampaignsApiArg = {
  fields?: string;
  /** Items to skip for pagination */
  start?: number;
  /** Max items to retrieve */
  limit?: number;
  /** Return only your campaign? */
  mine?: "true";
  /** A value to search in id or title */
  search?: string;
  /** How to order values (ASC, DESC) */
  order?: "ASC" | "DESC";
  /** The parameter to order by */
  orderBy?: "id" | "startDate" | "endDate";
  filterBy?: any;
};
export type GetCampaignsByCampaignApiResponse = /** status 200 OK */ {
  id: number;
  title: string;
  type: string;
  typeDescription: string;
  preselectionFormId?: number;
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
export type GetCampaignsByCampaignBugsApiResponse = /** status 200 OK */ {
  items: {
    id: number;
    title: string;
    internalId: string;
    status: {
      id: number;
      name: string;
    };
    type: {
      id: number;
      name: string;
    };
    severity: {
      id: number;
      name: string;
    };
    tester: {
      id: number;
    };
    tags?: BugTag[];
    duplication: "father" | "unique" | "duplicated";
    isFavourite: boolean;
    created: string;
    updated: string;
  }[];
} & PaginationData;
export type GetCampaignsByCampaignBugsApiArg = {
  /** A campaign id */
  campaign: string;
  /** Max items to retrieve */
  limit?: number;
  /** Items to skip for pagination */
  start?: number;
  /** The value to search for */
  search?: string;
  /** How to order values (ASC, DESC) */
  order?: "ASC" | "DESC";
  /** Order values by STATUS, TESTERID, SEVERITY, TYPE, ID */
  orderBy?: "severity" | "testerId" | "status" | "type" | "id";
  /** Key-value Array for item filtering */
  filterBy?: object;
};
export type PostCampaignsByCampaignCandidatesApiResponse =
  /** status 200 OK */
  | {
      results: {
        tester_id: number;
        device?: {} | {};
        campaignId?: number;
      }[];
    }
  | /** status 207 Multi-Status (WebDAV) */ {
      results: {
        tester_id: number;
        device?: "any" | number;
        campaignId?: number;
      }[];
      invalidTesters?: number[];
    };
export type PostCampaignsByCampaignCandidatesApiArg = {
  /** A campaign id */
  campaign: string;
  body:
    | {
        tester_id: number;
        device?: {} | {};
      }[]
    | {
        tester_id: number;
        device?: {} | {};
      };
};
export type GetCampaignsByCampaignCandidatesApiResponse = /** status 200 OK */ {
  results?: {
    id: number;
    name: string;
    surname: string;
    gender: Gender;
    age: number;
    experience: number;
    businessCps: number;
    businessCpsLastMonth: number;
    levels: {
      bugHunting: string;
      metal: string;
    };
    devices: {
      manufacturer?: string;
      model?: string;
      os: string;
      osVersion: string;
      id: number;
    }[];
    questions?: {
      id?: number;
      title?: string;
      value?: string;
    }[];
    status?: "candidate" | "excluded" | "selected";
  }[];
} & PaginationData;
export type GetCampaignsByCampaignCandidatesApiArg = {
  /** A campaign id */
  campaign: string;
  /** Max items to retrieve */
  limit?: number;
  /** Items to skip for pagination */
  start?: number;
  /** The fields to add to the results */
  fields?: string;
  /** Key-value Array for item filtering */
  filterByInclude?: any;
  /** Key-value Array for item filtering */
  filterByExclude?: any;
  /** Array with min and max */
  filterByAge?: any;
  /** Show accepted/candidates or both */
  show?: "onlyAccepted" | "onlyCandidates" | "all" | "candidatesAndExcluded";
};
export type GetCampaignsByCampaignClustersApiResponse =
  /** status 200 A UseCase linked with the Campaign */ {
    items: {
      id: number;
      name: string;
    }[];
  };
export type GetCampaignsByCampaignClustersApiArg = {
  /** A campaign id */
  campaign: string;
};
export type GetCampaignsByCampaignFormsApiResponse = /** status 200 OK */ {
  id: number;
  question: string;
  shortName?: string;
}[];
export type GetCampaignsByCampaignFormsApiArg = {
  campaign: string;
};
export type GetCampaignsByCampaignGroupsApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
}[];
export type GetCampaignsByCampaignGroupsApiArg = {
  /** A campaign id */
  campaign: string;
};
export type GetCampaignsByCampaignObservationsApiResponse =
  /** status 200 A UseCase linked with the Campaign */ {
    items: {
      id: number;
      name: string;
      time: number;
      tester: {
        id: number;
        name: string;
      };
      cluster: {
        id: number;
        name: string;
      };
      media: {
        id: number;
        url: string;
        streamUrl: string;
      };
    }[];
  };
export type GetCampaignsByCampaignObservationsApiArg = {
  /** A campaign id */
  campaign: string;
  filterBy?: any;
};
export type GetCampaignsByCampaignPayoutsApiResponse = /** status 200 OK */ {
  maxBonusBug: number;
  completionRule: {
    bugs?: number;
    usecases?: number;
  };
  testSuccess: {
    payout: number;
    points: number;
    message: string;
  };
  testFailure: {
    payout: number;
    points: number;
    message: string;
  };
};
export type GetCampaignsByCampaignPayoutsApiArg = {
  /** A campaign id */
  campaign: string;
};
export type GetCampaignsByCampaignProspectApiResponse = /** status 200 OK */ {
  items: {
    tester: {
      id: number;
      name: string;
      surname: string;
      group: number;
    };
    usecases: {
      completed: number;
      required: number;
    };
    bugs: {
      critical: number;
      high: number;
      medium: number;
      low: number;
    };
    payout: {
      completion: number;
      bug: number;
      refund: number;
      extra: number;
    };
    experience: {
      completion: number;
      extra: number;
    };
    note: string;
    status: "pending" | "done";
    weightedBugs: number;
    isCompleted: boolean;
    isTopTester: boolean;
  }[];
  status: ProspectStatus;
};
export type GetCampaignsByCampaignProspectApiArg = {
  campaign: string;
  /** Key-value Array for item filtering */
  filterByInclude?: any;
  /** Key-value Array for item filtering */
  filterByExclude?: any;
};
export type PutCampaignsByCampaignProspectApiResponse = unknown;
export type PutCampaignsByCampaignProspectApiArg = {
  campaign: string;
  body: {
    status: ProspectStatus;
    items: {
      tester: {
        id: number;
      };
      experience: {
        completion: number;
        extra: number;
      };
      payout: {
        completion: number;
        bug: number;
        extra: number;
        refund: number;
      };
      note?: string;
      completed: boolean;
    }[];
  };
};
export type PatchCampaignsByCampaignProspectApiResponse = unknown;
export type PatchCampaignsByCampaignProspectApiArg = {
  campaign: string;
  body: {
    status?: ProspectStatus;
  };
};
export type PutCampaignsByCampaignProspectAndTesterIdApiResponse =
  /** status 200 OK */ {
    payout: {
      completion: number;
      bugs: number;
      refund: number;
      extra: number;
    };
    experience: {
      completion: number;
      extra: number;
    };
    note: string;
    completed: boolean;
  };
export type PutCampaignsByCampaignProspectAndTesterIdApiArg = {
  /** A campaign id */
  campaign: string;
  testerId: string;
  body: {
    payout: {
      completion: number;
      bugs: number;
      refund: number;
      extra: number;
    };
    experience: {
      completion: number;
      extra: number;
    };
    note: string;
    completed: boolean;
  };
};
export type GetCampaignsByCampaignStatsApiResponse = /** status 200 OK */ {
  selected: number;
};
export type GetCampaignsByCampaignStatsApiArg = {
  campaign: string;
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
export type GetCampaignsByCampaignUxApiResponse =
  /** status 200 A UseCase linked with the Campaign */ {
    goal: string;
    usersNumber: number;
    sentiments: {
      id: number;
      value: number;
      comment: string;
      cluster: {
        id: number;
        name: string;
      };
    }[];
    methodology: {
      name: string;
      type: "qualitative" | "quantitative" | "quali-quantitative";
      description: string;
    };
    questions: {
      id: number;
      name: string;
    }[];
    visible: number;
  };
export type GetCampaignsByCampaignUxApiArg = {
  /** A campaign id */
  campaign: string;
};
export type PatchCampaignsByCampaignUxApiResponse = /** status 200 OK */ {};
export type PatchCampaignsByCampaignUxApiArg = {
  /** A campaign id */
  campaign: string;
  body: {
    goal?: string;
    usersNumber?: number;
    visible?: number;
    methodology?: {
      description: string;
      type: string;
    };
    sentiments?: {
      clusterId: number;
      value: number;
      comment: string;
      id?: number;
    }[];
    questions?: {
      name: string;
      id?: number;
    }[];
  };
};
export type PostCampaignsFormsApiResponse = /** status 201 Created */ {
  id: number;
  name: string;
  campaign?: {
    id: number;
    name: string;
  };
  fields?: ({
    id: number;
  } & PreselectionFormQuestion)[];
};
export type PostCampaignsFormsApiArg = {
  body: {
    name: string;
    fields: PreselectionFormQuestion[];
    campaign?: number;
    creationDate?: string;
  };
};
export type GetCampaignsFormsApiResponse = /** status 200 OK */ {
  results: {
    id: number;
    name: string;
    campaign?: number;
  }[];
  limit?: number;
  start: number;
  size: number;
  total?: number;
};
export type GetCampaignsFormsApiArg = {
  /** A comma separated list of fields which will be searched */
  searchBy?: string;
  /** The value to search for */
  search?: string;
  /** Max items to retrieve */
  limit?: number;
  /** Items to skip for pagination */
  start?: number;
};
export type GetCampaignsFormsByFormIdApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
  campaign?: {
    id: number;
    name: string;
  };
  fields: ({
    id: number;
  } & PreselectionFormQuestion)[];
};
export type GetCampaignsFormsByFormIdApiArg = {
  formId: string;
};
export type PutCampaignsFormsByFormIdApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
  fields: ({
    id: number;
  } & PreselectionFormQuestion)[];
  campaign?: {
    id: number;
    name: string;
  };
};
export type PutCampaignsFormsByFormIdApiArg = {
  formId: string;
  body: {
    name: string;
    campaign?: number;
    fields: ({
      id?: number;
    } & PreselectionFormQuestion)[];
  };
};
export type GetCampaignsOwnersApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
  surname: string;
}[];
export type GetCampaignsOwnersApiArg = void;
export type GetCampaignTypesApiResponse = /** status 200  */ {
  id: number;
  name: string;
  customRoles: {
    roleId: number;
    userIds: number[];
  }[];
}[];
export type GetCampaignTypesApiArg = void;
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
export type GetCountriesByCodeRegionApiResponse = /** status 200 OK */ {
  name: string;
  value: string;
}[];
export type GetCountriesByCodeRegionApiArg = {
  code: string;
  languageCode?: string;
};
export type GetCustomersApiResponse =
  /** status 200 An array of Customer objects */ {
    id?: number;
    name?: string;
  }[];
export type GetCustomersApiArg = void;
export type PostCustomersApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
};
export type PostCustomersApiArg = {
  body: {
    name: string;
  };
};
export type GetCustomersByCustomerProjectsApiResponse = /** status 200 OK */ {
  results: {
    id: number;
    name: string;
  }[];
};
export type GetCustomersByCustomerProjectsApiArg = {
  customer: string;
};
export type PostCustomersByCustomerProjectsApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
};
export type PostCustomersByCustomerProjectsApiArg = {
  customer: string;
  body: {
    name: string;
  };
};
export type GetCustomUserFieldsApiResponse = /** status 200 OK */ {
  group: {
    id: number;
    name: TranslatablePage;
    description?: TranslatablePage;
  };
  fields?: CustomUserFieldsData[];
}[];
export type GetCustomUserFieldsApiArg = void;
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
export type GetDevicesByDeviceTypeOperatingSystemsApiResponse =
  /** status 200 OK */ {
    id: number;
    name: string;
    type: string;
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
export type PostDossiersApiResponse =
  /** status 201 Created */
  | {
      id: number;
      message?: "HOOK_FAILED";
    }
  | /** status 206 Partial Content */ {
      id?: number;
    };
export type PostDossiersApiArg = {
  body: DossierCreationData & {
    duplicate?: {
      fields?: number;
      useCases?: number;
      mailMerges?: number;
      pages?: number;
      testers?: number;
      campaign?: number;
    };
  } & {
    skipPagesAndTasks?: number;
  };
};
export type PutDossiersByCampaignApiResponse = /** status 200 OK */ {};
export type PutDossiersByCampaignApiArg = {
  /** A campaign id */
  campaign: string;
  dossierCreationData: DossierCreationData;
};
export type GetDossiersByCampaignApiResponse = /** status 200 OK */ {
  id: number;
  title: {
    customer: string;
    tester: string;
  };
  startDate: string;
  endDate: string;
  closeDate: string;
  customer: {
    id: number;
    name: string;
  };
  project: {
    id: number;
    name: string;
  };
  testType: {
    id: number;
    name: string;
  };
  deviceList: {
    id: number;
    name: string;
  }[];
  csm: {
    id: number;
    name: string;
  };
  roles?: {
    role?: {
      id: number;
      name: string;
    };
    user?: {
      id: number;
      name: string;
      surname: string;
    };
  }[];
  description?: string;
  productLink?: string;
  goal?: string;
  outOfScope?: string;
  deviceRequirements?: string;
  target?: {
    notes?: string;
    size?: number;
    cap?: number;
  };
  countries?: CountryCode[];
  languages?: {
    name: string;
  }[];
  browsers?: {
    id: number;
    name: string;
  }[];
  productType?: {
    id: number;
    name: string;
  };
  phase: {
    id: number;
    name: string;
  };
  notes?: string;
};
export type GetDossiersByCampaignApiArg = {
  /** A campaign id */
  campaign: string;
};
export type PutDossiersByCampaignPhasesApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
};
export type PutDossiersByCampaignPhasesApiArg = {
  /** A campaign id */
  campaign: string;
  body: {
    phase: number;
  };
};
export type PostDossiersByCampaignQuotationsApiResponse =
  /** status 201 Created */ {
    id?: number;
  };
export type PostDossiersByCampaignQuotationsApiArg = {
  /** A campaign id */
  campaign: string;
  body: {
    quote?: string;
    notes?: string;
  };
};
export type PatchDossiersByCampaignQuotationsAndQuoteApiResponse =
  /** status 200 OK */ {};
export type PatchDossiersByCampaignQuotationsAndQuoteApiArg = {
  /** A campaign id */
  campaign: string;
  quote: string;
  body: {
    amount?: string;
  };
};
export type GetDossiersByCampaignQuotesHistoryApiResponse =
  /** status 200 OK */ {
    items: {
      campaign: {
        id: number;
        title: string;
        phase_id: number;
        phase_name: string;
      };
      quote: {
        id: number;
        amount: string;
        status: "pending" | "proposed" | "approved" | "rejected";
      };
    }[];
  };
export type GetDossiersByCampaignQuotesHistoryApiArg = {
  /** A campaign id */
  campaign: string;
};
export type GetEducationApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
}[];
export type GetEducationApiArg = void;
export type GetEmploymentsApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
}[];
export type GetEmploymentsApiArg = void;
export type PostJotformsByCampaignApiResponse = /** status 200 OK */ {};
export type PostJotformsByCampaignApiArg = {
  /** A campaign id */
  campaign: string;
  body: {
    formId: string;
    testerIdColumn: string;
  };
};
export type GetJotformsFormsApiResponse = /** status 200 OK */ {
  id: string;
  name: string;
  createdAt: string;
}[];
export type GetJotformsFormsApiArg = void;
export type GetJotformsFormsByFormIdQuestionsApiResponse =
  /** status 200 OK */ {
    id: string;
    name: string;
    title: string;
    description?: string;
    type: string;
  }[];
export type GetJotformsFormsByFormIdQuestionsApiArg = {
  formId: string;
};
export type GetLanguagesApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
}[];
export type GetLanguagesApiArg = void;
export type GetLevelsApiResponse = /** status 200 OK */ LevelDefinition[];
export type GetLevelsApiArg = void;
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
export type GetPhasesApiResponse = /** status 200 OK */ {
  results: {
    id: number;
    name: string;
    type: {
      id: number;
      name: string;
    };
  }[];
};
export type GetPhasesApiArg = void;
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
export type GetProductTypesApiResponse = /** status 200 OK */ {
  results: {
    id: number;
    name: string;
  }[];
};
export type GetProductTypesApiArg = void;
export type GetUsersApiResponse = /** status 200 OK */ User[];
export type GetUsersApiArg = void;
export type PostUsersApiResponse = /** status 201 Created */ {
  id: number;
};
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
export type HeadUsersByEmailByEmailApiResponse = unknown;
export type HeadUsersByEmailByEmailApiArg = {
  email: string;
};
export type GetUsersByRoleByRoleApiResponse = /** status 200 OK */ {
  results: {
    id: number;
    name: string;
    surname: string;
  }[];
};
export type GetUsersByRoleByRoleApiArg = {
  role: "tester_lead" | "quality_leader" | "ux_researcher" | "assistants";
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
  booty?: {
    net?: Currency;
    gross: Currency;
  };
  pending_booty?: {
    net?: Currency;
    gross: Currency;
  };
  languages?: {
    name?: string;
  }[];
  onboarding_completed?: boolean;
  additional?: AdditionalField[];
  gender?: Gender;
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
  booty?: {
    gross: Currency;
    net?: Currency;
  };
  pending_booty?: {
    gross: Currency;
    net?: Currency;
  };
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
  orderBy?: "name" | "start_date" | "end_date" | "close_date" | "visibility";
};
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
export type GetUsersMeCampaignsByCampaignCompatibleDevicesApiResponse =
  /** status 200 OK */ UserDevice[];
export type GetUsersMeCampaignsByCampaignCompatibleDevicesApiArg = {
  /** A campaign id */
  campaign: string;
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
    type: string;
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
    type: string;
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
export type GetUsersMeCampaignsByCampaignIdDevicesApiResponse =
  /** status 200 OK */ UserDevice[];
export type GetUsersMeCampaignsByCampaignIdDevicesApiArg = {
  campaignId: string;
};
export type GetUsersMeCampaignsByCampaignIdFormsApiResponse =
  /** status 200 OK */ ({
    question: string;
    short_name?: string;
    value?:
      | number
      | {
          city?: string;
          country?: string;
        }
      | number[]
      | string;
    validation?: {
      regex: string;
      error?: string;
    };
    id: number;
  } & (
    | {
        type: PreselectionQuestionSimple;
      }
    | {
        type: PreselectionQuestionMultiple;
        options: string[];
      }
    | {
        type: PreselectionQuestionCuf;
        options?: number[];
      }
  ))[];
export type GetUsersMeCampaignsByCampaignIdFormsApiArg = {
  campaignId: string;
};
export type PostUsersMeCampaignsByCampaignIdFormsApiResponse =
  /** status 200 OK */ undefined;
export type PostUsersMeCampaignsByCampaignIdFormsApiArg = {
  campaignId: string;
  body: {
    form?: {
      value: {
        id?: number | number[];
        serialized?:
          | string
          | string[]
          | {
              city: string;
              country: string;
            };
      };
      question: number;
    }[];
    device?: number[];
  };
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
export type GetUsersMeDevicesApiResponse = /** status 200 OK */ ({
  id?: number;
} & UserDevice &
  object)[];
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
  type: FiscalType | "internal";
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
export type PostUsersMeLanguagesApiResponse = /** status 201 Created */ {
  name: string;
};
export type PostUsersMeLanguagesApiArg = {
  body: {
    language_name?: string;
  };
};
export type PutUsersMeLanguagesApiResponse = /** status 200 OK */ {
  name?: string;
}[];
export type PutUsersMeLanguagesApiArg = {
  body: string[];
};
export type DeleteUsersMeLanguagesByLanguageIdApiResponse =
  /** status 200 OK */ {
    message?: string;
  };
export type DeleteUsersMeLanguagesByLanguageIdApiArg = {
  /** The id of the language */
  languageId: number;
};
export type GetUsersMePaymentsApiResponse = /** status 200 OK */ {
  results?: ({
    id: number;
  } & {
    status: "paid" | "processing";
    amount: {
      net: Currency;
      gross: Currency;
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
      net?: Currency;
      gross: Currency;
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
  orderBy?: "type" | "date" | "activity" | "net" | "gross";
};
export type GetUsersMePendingBootyApiResponse = /** status 200 OK */ {
  results?: ({
    id: number;
  } & {
    name: string;
    amount: {
      net?: Currency;
      gross: Currency;
    };
    attributionDate: string;
    activity: string;
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
  orderBy?:
    | "id"
    | "attributionDate"
    | "activityName"
    | "net"
    | "gross"
    | "activity";
  /** How to order values (ASC, DESC) */
  order?: "ASC" | "DESC";
};
export type GetUsersMePermissionsApiResponse = /** status 200 OK */ {
  appq_bug?: Olp;
  appq_campaign?: Olp;
  appq_message_center?: Olp;
  appq_prospect?: Olp;
  appq_tester_selection?: Olp;
};
export type GetUsersMePermissionsApiArg = void;
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
export type GetUsersMePopupsByPopupApiResponse = /** status 200 OK */ {
  id?: number;
} & Popup;
export type GetUsersMePopupsByPopupApiArg = {
  popup: number;
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
export type PostDossiersByCampaignManualApiResponse = /** status 200 OK */ {};
export type PostDossiersByCampaignManualApiArg = {
  /** A campaign id */
  campaign: string;
  body: {
    importFrom: number;
  };
};
export type PostDossiersByCampaignPreviewApiResponse =
  /** status 200 OK */ object;
export type PostDossiersByCampaignPreviewApiArg = {
  /** A campaign id */
  campaign: string;
  body: {
    importFrom: number;
  };
};
export type Agreement = {
  title: string;
  tokens: number;
  unitPrice: number;
  startDate: string;
  expirationDate: string;
  note?: string;
  isTokenBased?: boolean;
};
export type PaginationData = {
  start: number;
  limit?: number;
  size: number;
  total?: number;
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
  bugform_link?: boolean | TranslatablePage;
  applied?: boolean;
  visibility?: {
    freeSpots?: number;
    totalSpots?: number;
    type?: "available" | "unavailable" | "candidate";
  };
};
export type CampaignType = {} | {};
export type CampaignRequired = {
  name: string;
  dates: {
    start: string;
    end: string;
    close: string;
  };
  campaign_type: CampaignType;
};
export type Campaign = CampaignOptional & CampaignRequired;
export type Project = {
  name?: string;
};
export type BugTag = {
  id: number;
  name: string;
};
export type Gender = "male" | "female" | "not-specified" | "other";
export type ProspectStatus = "draft" | "confirmed" | "done";
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
export type PreselectionQuestionSimple =
  | "gender"
  | "text"
  | "phone_number"
  | "address";
export type PreselectionQuestionMultiple = "multiselect" | "select" | "radio";
export type PreselectionQuestionCuf = string;
export type PreselectionFormQuestion = {
  question: string;
  short_name?: string;
} & (
  | {
      type: PreselectionQuestionSimple;
    }
  | {
      type: PreselectionQuestionMultiple;
      options?: {
        value: string;
        isInvalid?: boolean;
      }[];
    }
  | {
      type: PreselectionQuestionCuf;
      options?: {
        value: number;
        isInvalid?: boolean;
      }[];
    }
);
export type CustomUserFieldsType = "text" | "select" | "multiselect";
export type CustomUserFieldsDataOption = {
  id: number;
  name: string;
};
export type CustomUserFieldsData = {
  id: number;
  type: CustomUserFieldsType;
  placeholder?: TranslatablePage;
  allow_other?: boolean;
  name: TranslatablePage;
  format?: string;
  options?: CustomUserFieldsDataOption[];
};
export type CountryCode = string;
export type DossierCreationData = {
  project: number;
  testType: number;
  title: {
    customer: string;
    tester?: string;
  };
  startDate: string;
  endDate?: string;
  closeDate?: string;
  deviceList: number[];
  csm?: number;
  roles?: {
    role: number;
    user: number;
  }[];
  description?: string;
  productLink?: string;
  goal?: string;
  outOfScope?: string;
  deviceRequirements?: string;
  target?: {
    notes?: string;
    size?: number;
    cap?: number;
  };
  countries?: CountryCode[];
  languages?: string[];
  browsers?: number[];
  productType?: number;
  notes?: string;
};
export type LevelDefinition = {
  id: number;
  name: string;
  reach?: number;
  hold?: number;
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
export type Currency = {
  value: number;
  currency: string;
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
export type FiscalType =
  | "withholding"
  | "witholding-extra"
  | "non-italian"
  | "vat"
  | "company";
export type FiscalBirthCity =
  | {
      city: string;
      province: string;
    }
  | {
      placeId: string;
    };
export type Olp = number[] | boolean;
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
export const {
  useGetQuery,
  useGetAgreementsQuery,
  usePostAgreementsMutation,
  usePutAgreementsByAgreementIdMutation,
  useDeleteAgreementsByAgreementIdMutation,
  useGetAgreementsByAgreementIdQuery,
  usePostAuthenticateMutation,
  useGetBrowsersQuery,
  usePostCampaignsMutation,
  useGetCampaignsQuery,
  useGetCampaignsByCampaignQuery,
  usePutCampaignsByCampaignMutation,
  useGetCampaignsByCampaignBugsQuery,
  usePostCampaignsByCampaignCandidatesMutation,
  useGetCampaignsByCampaignCandidatesQuery,
  useGetCampaignsByCampaignClustersQuery,
  useGetCampaignsByCampaignFormsQuery,
  useGetCampaignsByCampaignGroupsQuery,
  useGetCampaignsByCampaignObservationsQuery,
  useGetCampaignsByCampaignPayoutsQuery,
  useGetCampaignsByCampaignProspectQuery,
  usePutCampaignsByCampaignProspectMutation,
  usePatchCampaignsByCampaignProspectMutation,
  usePutCampaignsByCampaignProspectAndTesterIdMutation,
  useGetCampaignsByCampaignStatsQuery,
  useGetCampaignsByCampaignTasksQuery,
  usePostCampaignsByCampaignTasksMutation,
  useGetCampaignsByCampaignTasksAndTaskQuery,
  usePutCampaignsByCampaignTasksAndTaskMutation,
  useGetCampaignsByCampaignUxQuery,
  usePatchCampaignsByCampaignUxMutation,
  usePostCampaignsFormsMutation,
  useGetCampaignsFormsQuery,
  useGetCampaignsFormsByFormIdQuery,
  usePutCampaignsFormsByFormIdMutation,
  useGetCampaignsOwnersQuery,
  useGetCampaignTypesQuery,
  useGetCertificationsQuery,
  useGetCountriesByCodeRegionQuery,
  useGetCustomersQuery,
  usePostCustomersMutation,
  useGetCustomersByCustomerProjectsQuery,
  usePostCustomersByCustomerProjectsMutation,
  useGetCustomUserFieldsQuery,
  useGetDevicesByDeviceTypeModelsQuery,
  useGetDevicesByDeviceTypeOperatingSystemsQuery,
  useGetDevicesByDeviceTypeOsVersionsQuery,
  usePostDossiersMutation,
  usePutDossiersByCampaignMutation,
  useGetDossiersByCampaignQuery,
  usePutDossiersByCampaignPhasesMutation,
  usePostDossiersByCampaignQuotationsMutation,
  usePatchDossiersByCampaignQuotationsAndQuoteMutation,
  useGetDossiersByCampaignQuotesHistoryQuery,
  useGetEducationQuery,
  useGetEmploymentsQuery,
  usePostJotformsByCampaignMutation,
  useGetJotformsFormsQuery,
  useGetJotformsFormsByFormIdQuestionsQuery,
  useGetLanguagesQuery,
  useGetLevelsQuery,
  usePostMediaMutation,
  useDeleteMediaMutation,
  useGetPaymentsQuery,
  usePostPaymentsByPaymentIdMutation,
  useDeletePaymentsByPaymentIdMutation,
  useGetPhasesQuery,
  useGetPopupsQuery,
  usePostPopupsMutation,
  useGetPopupsByPopupQuery,
  usePatchPopupsByPopupMutation,
  useGetProductTypesQuery,
  useGetUsersQuery,
  usePostUsersMutation,
  useHeadUsersByEmailByEmailMutation,
  useGetUsersByRoleByRoleQuery,
  useGetUsersMeQuery,
  usePutUsersMeMutation,
  usePatchUsersMeMutation,
  useDeleteUsersMeMutation,
  usePutUsersMeAdditionalsByFieldIdMutation,
  useGetUsersMeBugsQuery,
  useGetUsersMeCampaignsQuery,
  useGetUsersMeCampaignsByCampaignIdQuery,
  useGetUsersMeCampaignsByCampaignCompatibleDevicesQuery,
  usePostUsersMeCampaignsByCampaignIdBugsMutation,
  useGetUsersMeCampaignsByCampaignIdDevicesQuery,
  useGetUsersMeCampaignsByCampaignIdFormsQuery,
  usePostUsersMeCampaignsByCampaignIdFormsMutation,
  usePostUsersMeCampaignsByCampaignIdMediaMutation,
  usePostUsersMeCertificationsMutation,
  useDeleteUsersMeCertificationsByCertificationIdMutation,
  useGetUsersMeDevicesQuery,
  usePostUsersMeDevicesMutation,
  useGetUsersMeDevicesByDeviceIdQuery,
  usePatchUsersMeDevicesByDeviceIdMutation,
  useDeleteUsersMeDevicesByDeviceIdMutation,
  useGetUsersMeExperienceQuery,
  useGetUsersMeFiscalQuery,
  usePostUsersMeFiscalMutation,
  usePutUsersMeFiscalMutation,
  usePostUsersMeLanguagesMutation,
  usePutUsersMeLanguagesMutation,
  useDeleteUsersMeLanguagesByLanguageIdMutation,
  useGetUsersMePaymentsQuery,
  usePostUsersMePaymentsMutation,
  useGetUsersMePaymentsByPaymentQuery,
  useGetUsersMePendingBootyQuery,
  useGetUsersMePermissionsQuery,
  useGetUsersMePopupsQuery,
  useGetUsersMePopupsByPopupQuery,
  useGetUsersMeRankQuery,
  useGetUsersMeRankListQuery,
  usePostDossiersByCampaignManualMutation,
  usePostDossiersByCampaignPreviewMutation,
} = injectedRtkApi;
