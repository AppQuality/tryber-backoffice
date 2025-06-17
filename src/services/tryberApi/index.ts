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
    patchBugsByBugIdStatus: build.mutation<
      PatchBugsByBugIdStatusApiResponse,
      PatchBugsByBugIdStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/bugs/${queryArg.bugId}/status`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    getCampaignTypes: build.query<
      GetCampaignTypesApiResponse,
      GetCampaignTypesApiArg
    >({
      query: () => ({ url: `/campaignTypes` }),
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
    getCampaignsByCampaignBugsAndBugId: build.query<
      GetCampaignsByCampaignBugsAndBugIdApiResponse,
      GetCampaignsByCampaignBugsAndBugIdApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.campaign}/bugs/${queryArg.bugId}`,
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
    getCustomUserFields: build.query<
      GetCustomUserFieldsApiResponse,
      GetCustomUserFieldsApiArg
    >({
      query: () => ({ url: `/custom_user_fields` }),
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
    getDossiersByCampaign: build.query<
      GetDossiersByCampaignApiResponse,
      GetDossiersByCampaignApiArg
    >({
      query: (queryArg) => ({ url: `/dossiers/${queryArg.campaign}` }),
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
    getLanguages: build.query<GetLanguagesApiResponse, GetLanguagesApiArg>({
      query: () => ({ url: `/languages` }),
    }),
    getLevels: build.query<GetLevelsApiResponse, GetLevelsApiArg>({
      query: () => ({ url: `/levels` }),
    }),
    deleteMedia: build.mutation<DeleteMediaApiResponse, DeleteMediaApiArg>({
      query: (queryArg) => ({
        url: `/media`,
        method: "DELETE",
        body: queryArg.body,
      }),
    }),
    postMedia: build.mutation<PostMediaApiResponse, PostMediaApiArg>({
      query: (queryArg) => ({
        url: `/media`,
        method: "POST",
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
    deletePaymentsByPaymentId: build.mutation<
      DeletePaymentsByPaymentIdApiResponse,
      DeletePaymentsByPaymentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/payments/${queryArg.paymentId}`,
        method: "DELETE",
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
    getUsersMe: build.query<GetUsersMeApiResponse, GetUsersMeApiArg>({
      query: (queryArg) => ({
        url: `/users/me`,
        params: { fields: queryArg.fields },
      }),
    }),
    patchUsersMe: build.mutation<PatchUsersMeApiResponse, PatchUsersMeApiArg>({
      query: (queryArg) => ({
        url: `/users/me`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    putUsersMe: build.mutation<PutUsersMeApiResponse, PutUsersMeApiArg>({
      query: (queryArg) => ({
        url: `/users/me`,
        method: "PUT",
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
    getUsersMeCampaignsByCampaignCompatibleDevices: build.query<
      GetUsersMeCampaignsByCampaignCompatibleDevicesApiResponse,
      GetUsersMeCampaignsByCampaignCompatibleDevicesApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/campaigns/${queryArg.campaign}/compatible_devices`,
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
    deleteUsersMeDevicesByDeviceId: build.mutation<
      DeleteUsersMeDevicesByDeviceIdApiResponse,
      DeleteUsersMeDevicesByDeviceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/devices/${queryArg.deviceId}`,
        method: "DELETE",
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
        company: string;
        id: number;
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
export type DeleteAgreementsByAgreementIdApiResponse = /** status 200 OK */ {};
export type DeleteAgreementsByAgreementIdApiArg = {
  agreementId: string;
};
export type GetAgreementsByAgreementIdApiResponse = /** status 200 OK */ {
  id: number;
} & Agreement & {
    customer: {
      company: string;
      id: number;
    };
  };
export type GetAgreementsByAgreementIdApiArg = {
  agreementId: string;
};
export type PutAgreementsByAgreementIdApiResponse = /** status 200 OK */ {
  id: number;
} & Agreement & {
    customer: {
      company: string;
      id: number;
    };
  };
export type PutAgreementsByAgreementIdApiArg = {
  agreementId: string;
  body: Agreement & {
    customerId: number;
  };
};
export type PostAuthenticateApiResponse =
  /** status 200 Authentication data. The token can be used to authenticate the protected requests */ {
    exp?: number;
    firstName?: string;
    iat?: number;
    id?: number;
    lastName?: string;
    token?: string;
    username?: string;
  };
export type PostAuthenticateApiArg = {
  /** A JSON containing username and password */
  body: {
    password: string;
    username: string;
  };
};
export type GetBrowsersApiResponse = /** status 200 OK */ {
  results: {
    id: number;
    name: string;
  }[];
};
export type GetBrowsersApiArg = void;
export type PatchBugsByBugIdStatusApiResponse = /** status 200 OK */ {};
export type PatchBugsByBugIdStatusApiArg = {
  bugId: string;
  body: {
    status_id: number;
  };
};
export type GetCampaignTypesApiResponse = /** status 200  */ {
  customRoles: {
    roleId: number;
    userIds: number[];
  }[];
  id: number;
  name: string;
}[];
export type GetCampaignTypesApiArg = void;
export type GetCampaignsApiResponse = /** status 200 OK */ {
  items?: {
    csm?: {
      id: number;
      name: string;
      surname: string;
    };
    customer?: {
      id?: number;
      name: string;
    };
    customerTitle?: string;
    endDate?: string;
    id?: number;
    name?: string;
    phase?: {
      id: number;
      name: string;
    };
    project?: {
      id?: number;
      name: string;
    };
    quote?: {
      id: number;
      price: string;
      status: string;
    };
    resultType?: "bug" | "bugparade" | "no";
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
    startDate?: string;
    status?: "running" | "closed" | "incoming";
    type?: {
      area: "quality" | "experience";
      name: string;
    };
    visibility?: "admin" | "smallgroup" | "logged" | "public" | "target";
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
export type GetCampaignsFormsApiResponse = /** status 200 OK */ {
  limit?: number;
  results: {
    campaign?: number;
    id: number;
    name: string;
  }[];
  size: number;
  start: number;
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
export type PostCampaignsFormsApiResponse = /** status 201 Created */ {
  campaign?: {
    id: number;
    name: string;
  };
  fields?: ({
    id: number;
  } & PreselectionFormQuestion)[];
  id: number;
  name: string;
};
export type PostCampaignsFormsApiArg = {
  body: {
    campaign?: number;
    creationDate?: string;
    fields: PreselectionFormQuestion[];
    name: string;
  };
};
export type GetCampaignsFormsByFormIdApiResponse = /** status 200 OK */ {
  campaign?: {
    id: number;
    name: string;
  };
  fields: ({
    id: number;
  } & PreselectionFormQuestion)[];
  id: number;
  name: string;
};
export type GetCampaignsFormsByFormIdApiArg = {
  formId: string;
};
export type PutCampaignsFormsByFormIdApiResponse = /** status 200 OK */ {
  campaign?: {
    id: number;
    name: string;
  };
  fields: ({
    id: number;
  } & PreselectionFormQuestion)[];
  id: number;
  name: string;
};
export type PutCampaignsFormsByFormIdApiArg = {
  formId: string;
  body: {
    campaign?: number;
    fields: ({
      id?: number;
    } & PreselectionFormQuestion)[];
    name: string;
  };
};
export type GetCampaignsOwnersApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
  surname: string;
}[];
export type GetCampaignsOwnersApiArg = void;
export type GetCampaignsByCampaignApiResponse = /** status 200 OK */ {
  id: number;
  plan?: {
    id: number;
    name: string;
  };
  preselectionFormId?: number;
  title: string;
  type: string;
  typeDescription: string;
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
    created: string;
    duplication: "father" | "unique" | "duplicated";
    id: number;
    internalId: string;
    isFavourite: boolean;
    severity: {
      id: number;
      name: string;
    };
    status: {
      id: number;
      name: string;
    };
    tags?: BugTag[];
    tester: {
      id: number;
    };
    title: string;
    type: {
      id: number;
      name: string;
    };
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
export type GetCampaignsByCampaignBugsAndBugIdApiResponse =
  /** status 200 OK */ {
    actual_result: string;
    description: string;
    expected_result: string;
    id: number;
    media: {
      id: number;
    }[];
    note: string;
    reason: string;
    replicability: {
      id: number;
      name: string;
    };
    severity: BugSeverity;
    status: BugStatus;
    status_history: {
      date: string;
      reason: string;
      status: string;
    }[];
    title: string;
    type: {
      id: number;
      name: string;
    };
    usecase: {
      description: string;
      id: number;
      title: string;
    };
  };
export type GetCampaignsByCampaignBugsAndBugIdApiArg = {
  /** A campaign id */
  campaign: string;
  bugId: string;
};
export type GetCampaignsByCampaignCandidatesApiResponse = /** status 200 OK */ {
  results?: {
    age: number;
    businessCps: number;
    businessCpsLastMonth: number;
    devices: {
      id: number;
      manufacturer?: string;
      model?: string;
      os: string;
      osVersion: string;
    }[];
    experience: number;
    gender: Gender;
    id: number;
    levels: {
      bugHunting: string;
      metal: string;
    };
    name: string;
    questions?: {
      id?: number;
      title?: string;
      value?: string;
    }[];
    status?: "candidate" | "excluded" | "selected";
    surname: string;
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
export type PostCampaignsByCampaignCandidatesApiResponse =
  /** status 200 OK */
  | {
      results: {
        campaignId?: number;
        device?: {} | {};
        tester_id: number;
      }[];
    }
  | /** status 207 Multi-Status (WebDAV) */ {
      invalidTesters?: number[];
      results: {
        campaignId?: number;
        device?: "any" | number;
        tester_id: number;
      }[];
    };
export type PostCampaignsByCampaignCandidatesApiArg = {
  /** A campaign id */
  campaign: string;
  body:
    | {
        device?: {} | {};
        tester_id: number;
      }[]
    | {
        device?: {} | {};
        tester_id: number;
      };
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
      cluster: {
        id: number;
        name: string;
      };
      id: number;
      media: {
        id: number;
        streamUrl: string;
        url: string;
      };
      name: string;
      tester: {
        id: number;
        name: string;
      };
      time: number;
    }[];
  };
export type GetCampaignsByCampaignObservationsApiArg = {
  /** A campaign id */
  campaign: string;
  filterBy?: any;
};
export type GetCampaignsByCampaignPayoutsApiResponse = /** status 200 OK */ {
  completionRule: {
    bugs?: number;
    usecases?: number;
  };
  maxBonusBug: number;
  testFailure: {
    message: string;
    payout: number;
    points: number;
  };
  testSuccess: {
    message: string;
    payout: number;
    points: number;
  };
};
export type GetCampaignsByCampaignPayoutsApiArg = {
  /** A campaign id */
  campaign: string;
};
export type GetCampaignsByCampaignProspectApiResponse = /** status 200 OK */ {
  items: {
    bugs: {
      critical: number;
      high: number;
      low: number;
      medium: number;
    };
    experience: {
      completion: number;
      extra: number;
    };
    isCompleted: boolean;
    isTopTester: boolean;
    note: string;
    payout: {
      bug: number;
      completion: number;
      extra: number;
      refund: number;
    };
    status: "pending" | "done";
    tester: {
      group: number;
      id: number;
      name: string;
      surname: string;
    };
    usecases: {
      completed: number;
      required: number;
    };
    weightedBugs: number;
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
export type PatchCampaignsByCampaignProspectApiResponse = unknown;
export type PatchCampaignsByCampaignProspectApiArg = {
  campaign: string;
  body: {
    status?: ProspectStatus;
  };
};
export type PutCampaignsByCampaignProspectApiResponse = unknown;
export type PutCampaignsByCampaignProspectApiArg = {
  campaign: string;
  body: {
    items: {
      completed: boolean;
      experience: {
        completion: number;
        extra: number;
      };
      note?: string;
      payout: {
        bug: number;
        completion: number;
        extra: number;
        refund: number;
      };
      tester: {
        id: number;
      };
    }[];
    status: ProspectStatus;
  };
};
export type PutCampaignsByCampaignProspectAndTesterIdApiResponse =
  /** status 200 OK */ {
    completed: boolean;
    experience: {
      completion: number;
      extra: number;
    };
    note: string;
    payout: {
      bugs: number;
      completion: number;
      extra: number;
      refund: number;
    };
  };
export type PutCampaignsByCampaignProspectAndTesterIdApiArg = {
  /** A campaign id */
  campaign: string;
  testerId: string;
  body: {
    completed: boolean;
    experience: {
      completion: number;
      extra: number;
    };
    note: string;
    payout: {
      bugs: number;
      completion: number;
      extra: number;
      refund: number;
    };
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
    methodology: {
      description: string;
      name: string;
      type: "qualitative" | "quantitative" | "quali-quantitative";
    };
    questions: {
      id: number;
      name: string;
    }[];
    sentiments: {
      cluster: {
        id: number;
        name: string;
      };
      comment: string;
      id: number;
      value: number;
    }[];
    usersNumber: number;
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
    methodology?: {
      description: string;
      type: string;
    };
    questions?: {
      id?: number;
      name: string;
    }[];
    sentiments?: {
      clusterId: number;
      comment: string;
      id?: number;
      value: number;
    }[];
    usersNumber?: number;
    visible?: number;
  };
};
export type GetCertificationsApiResponse = /** status 200 OK */ {
  area: string;
  id: number;
  institute: string;
  name: string;
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
export type GetCustomUserFieldsApiResponse = /** status 200 OK */ {
  fields?: CustomUserFieldsData[];
  group: {
    description?: TranslatablePage;
    id: number;
    name: TranslatablePage;
  };
}[];
export type GetCustomUserFieldsApiArg = void;
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
      campaign?: number;
      fields?: number;
      mailMerges?: number;
      pages?: number;
      testers?: number;
      useCases?: number;
    };
  } & {
    skipPagesAndTasks?: number;
  };
};
export type GetDossiersByCampaignApiResponse = /** status 200 OK */ {
  browsers?: {
    id: number;
    name: string;
  }[];
  closeDate: string;
  countries?: CountryCode[];
  csm: {
    id: number;
    name: string;
  };
  customer: {
    id: number;
    name: string;
  };
  description?: string;
  deviceList: {
    id: number;
    name: string;
  }[];
  deviceRequirements?: string;
  endDate: string;
  goal?: string;
  id: number;
  languages?: {
    name: string;
  }[];
  notes?: string;
  outOfScope?: string;
  phase: {
    id: number;
    name: string;
  };
  productLink?: string;
  productType?: {
    id: number;
    name: string;
  };
  project: {
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
  startDate: string;
  target?: {
    cap?: number;
    genderQuote?: string;
    notes?: string;
    size?: number;
  };
  testType: {
    id: number;
    name: string;
  };
  title: {
    customer: string;
    tester: string;
  };
  visibilityCriteria?: {
    ageRanges?: {
      max: number;
      min: number;
    }[];
    cuf?: {
      cufId: number;
      cufValueIds: number[];
    }[];
    gender?: number[];
    province?: string[];
  };
};
export type GetDossiersByCampaignApiArg = {
  /** A campaign id */
  campaign: string;
};
export type PutDossiersByCampaignApiResponse = /** status 200 OK */ {};
export type PutDossiersByCampaignApiArg = {
  /** A campaign id */
  campaign: string;
  dossierCreationData: DossierCreationData;
};
export type PostDossiersByCampaignManualApiResponse = /** status 200 OK */ {};
export type PostDossiersByCampaignManualApiArg = {
  /** A campaign id */
  campaign: string;
  body: {
    importFrom: number;
  };
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
export type PostDossiersByCampaignPreviewApiResponse =
  /** status 200 OK */ object;
export type PostDossiersByCampaignPreviewApiArg = {
  /** A campaign id */
  campaign: string;
  body: {
    importFrom: number;
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
    notes?: string;
    quote?: string;
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
        phase_id: number;
        phase_name: string;
        title: string;
      };
      quote: {
        amount: string;
        id: number;
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
export type GetJotformsFormsApiResponse = /** status 200 OK */ {
  createdAt: string;
  id: string;
  name: string;
}[];
export type GetJotformsFormsApiArg = void;
export type GetJotformsFormsByFormIdQuestionsApiResponse =
  /** status 200 OK */ {
    description?: string;
    id: string;
    name: string;
    title: string;
    type: string;
  }[];
export type GetJotformsFormsByFormIdQuestionsApiArg = {
  formId: string;
};
export type PostJotformsByCampaignApiResponse = /** status 200 OK */ {};
export type PostJotformsByCampaignApiArg = {
  /** A campaign id */
  campaign: string;
  body: {
    formId: string;
    testerIdColumn: string;
  };
};
export type GetLanguagesApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
}[];
export type GetLanguagesApiArg = void;
export type GetLevelsApiResponse = /** status 200 OK */ LevelDefinition[];
export type GetLevelsApiArg = void;
export type DeleteMediaApiResponse = /** status 200 OK */ undefined;
export type DeleteMediaApiArg = {
  body: {
    url: string;
  };
};
export type PostMediaApiResponse = /** status 200 OK */ {
  failed?: {
    errorCode: string;
    name: string;
  }[];
  files: {
    name: string;
    path: string;
  }[];
};
export type PostMediaApiArg = {
  body: {
    media?: {} | Blob[];
  };
};
export type GetPaymentsApiResponse = /** status 200 OK */ {
  items: {
    amount: {
      currency: string;
      value: number;
    };
    created: string;
    error?: string;
    id: number;
    tryber: {
      id: number;
      name: string;
      surname: string;
    };
    type: "paypal" | "transferwise";
    updated: string;
  }[];
  limit?: number;
  size: number;
  start: number;
  total?: number;
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
export type DeletePaymentsByPaymentIdApiResponse =
  /** status 200 OK */ undefined;
export type DeletePaymentsByPaymentIdApiArg = {
  paymentId: string;
};
export type PostPaymentsByPaymentIdApiResponse = /** status 200 OK */ undefined;
export type PostPaymentsByPaymentIdApiArg = {
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
    birthDate: string;
    country: string;
    email: string;
    name: string;
    password: string;
    referral?: string;
    surname: string;
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
export type DeleteUsersMeApiResponse = /** status 200 OK */ undefined;
export type DeleteUsersMeApiArg = {
  body: {
    reason: string;
  };
};
export type GetUsersMeApiResponse = /** status 200 OK */ {
  additional?: AdditionalField[];
  approved_bugs?: number;
  attended_cp?: number;
  birthDate?: string;
  booty?: {
    gross: Currency;
    net?: Currency;
  };
  booty_threshold?: {
    isOver: boolean;
    value: number;
  };
  certifications?: Certification[] | boolean;
  city?: string;
  completionPercent?: number;
  country?: string;
  education?: {
    id: number;
    name: string;
  };
  email?: string;
  gender?: Gender;
  id: number;
  image?: string;
  is_verified?: boolean;
  languages?: {
    name?: string;
  }[];
  name?: string;
  onboarding_completed?: boolean;
  pending_booty?: {
    gross: Currency;
    net?: Currency;
  };
  phone?: string;
  profession?: {
    id: number;
    name: string;
  };
  rank?: string;
  role?: string;
  surname?: string;
  total_exp_pts?: number;
  username?: string;
  wp_user_id?: number;
};
export type GetUsersMeApiArg = {
  /** Comma separated string of specific fields requested */
  fields?: string;
};
export type PatchUsersMeApiResponse = /** status 200 OK */ {
  additional?: AdditionalField[];
  approved_bugs?: number;
  attended_cp?: number;
  birthDate?: string;
  booty?: {
    gross: Currency;
    net?: Currency;
  };
  certifications?: Certification[] | boolean;
  city?: string;
  completionPercent?: number;
  country?: string;
  education?: {
    id: number;
    name: string;
  };
  email?: string;
  gender?: "male" | "female" | "not-specified" | "other";
  id: number;
  image?: string;
  is_verified?: boolean;
  languages?: {
    id?: number;
    name?: string;
  }[];
  name?: string;
  onboarding_completed?: boolean;
  pending_booty?: {
    gross: Currency;
    net?: Currency;
  };
  phone?: string;
  profession?: {
    id: number;
    name: string;
  };
  rank?: string;
  role?: string;
  surname?: string;
  total_exp_pts?: number;
  username?: string;
  wp_user_id?: number;
};
export type PatchUsersMeApiArg = {
  body: {
    birthDate?: string;
    city?: string;
    country?: string;
    education?: number;
    email?: string;
    gender?: "male" | "female" | "not-specified" | "other";
    name?: string;
    oldPassword?: string;
    onboarding_completed?: boolean;
    password?: string;
    phone?: string;
    profession?: number;
    surname?: string;
  };
};
export type PutUsersMeApiResponse = /** status 200 OK */ User;
export type PutUsersMeApiArg = {
  body: {
    email?: string;
    name?: string;
    password?: string;
    surname?: string;
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
        is_candidate?: boolean;
        value: string;
      }[]
    | {
        is_candidate?: boolean;
        value: string;
      };
};
export type GetUsersMeBugsApiResponse = /** status 200 OK */ {
  limit?: number;
  results: ({
    id: number;
  } & Bug)[];
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
  limit?: number;
  results?: ({
    id: number;
  } & Campaign)[];
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
  additionalFields?: CampaignAdditionalField[];
  bugReplicability: {
    invalid: string[];
    valid: string[];
  };
  bugSeverity: {
    invalid: string[];
    valid: string[];
  };
  bugTypes: {
    invalid: string[];
    valid: string[];
  };
  devices?: ({
    id: number;
  } & UserDevice)[];
  hasBugForm: boolean;
  id: number;
  language?: {
    code: string;
    message: string;
  };
  minimumMedia: number;
  title: string;
  titleRule?: boolean;
  useCases: {
    id: number;
    name: string;
  }[];
  validFileExtensions: string[];
};
export type GetUsersMeCampaignsByCampaignIdApiArg = {
  campaignId: string;
};
export type PostUsersMeCampaignsByCampaignIdBugsApiResponse =
  /** status 200 OK */ {
    additional?: {
      slug: string;
      value: string;
    }[];
    current: string;
    description: string;
    device: UserDevice;
    expected: string;
    id: number;
    internalId?: string;
    media: string[];
    notes: string;
    replicability: "ONCE" | "SOMETIMES" | "ALWAYS";
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    status: "PENDING" | "APPROVED" | "REFUSED" | "NEED-REVIEW";
    testerId: number;
    title: string;
    type: string;
    usecase: string;
  };
export type PostUsersMeCampaignsByCampaignIdBugsApiArg = {
  /** the campaign id */
  campaignId: string;
  body: {
    additional?: {
      slug: string;
      value: string;
    }[];
    current: string;
    description: string;
    device: number;
    expected: string;
    lastSeen: string;
    media: string[];
    notes: string;
    replicability: "ONCE" | "SOMETIMES" | "ALWAYS";
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    title: string;
    type: string;
    usecase: number;
  };
};
export type GetUsersMeCampaignsByCampaignIdDevicesApiResponse =
  /** status 200 OK */ UserDevice[];
export type GetUsersMeCampaignsByCampaignIdDevicesApiArg = {
  campaignId: string;
};
export type GetUsersMeCampaignsByCampaignIdFormsApiResponse =
  /** status 200 OK */ ({
    id: number;
    question: string;
    short_name?: string;
    validation?: {
      error?: string;
      regex: string;
    };
    value?:
      | number
      | {
          city?: string;
          country?: string;
        }
      | number[]
      | string;
  } & (
    | {
        type: PreselectionQuestionSimple;
      }
    | {
        options: string[];
        type: PreselectionQuestionMultiple;
      }
    | {
        options?: number[];
        type: PreselectionQuestionCuf;
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
    device?: number[];
    form?: {
      question: number;
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
    }[];
  };
};
export type PostUsersMeCampaignsByCampaignIdMediaApiResponse =
  /** status 200 OK */ {
    failed?: {
      errorCode: "FILE_TOO_BIG" | "INVALID_FILE_EXTENSION" | "GENERIC_ERROR";
      name: string;
    }[];
    files?: {
      name: string;
      path: string;
    }[];
  };
export type PostUsersMeCampaignsByCampaignIdMediaApiArg = {
  campaignId: string;
  body: {
    media?: {} | string[];
  };
};
export type GetUsersMeCampaignsByCampaignCompatibleDevicesApiResponse =
  /** status 200 OK */ UserDevice[];
export type GetUsersMeCampaignsByCampaignCompatibleDevicesApiArg = {
  /** A campaign id */
  campaign: string;
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
        achievement_date: string;
        certification_id: number;
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
export type DeleteUsersMeDevicesByDeviceIdApiResponse = /** status 200 OK */ {
  message?: string;
};
export type DeleteUsersMeDevicesByDeviceIdApiArg = {
  deviceId: number;
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
export type GetUsersMeExperienceApiResponse = /** status 200 OK */ {
  limit?: number;
  results: {
    activity: {
      id: number;
    };
    amount: number;
    campaign: {
      id: number;
      title?: string;
    };
    date: string;
    id: number;
    note?: string;
  }[];
  size?: number;
  start?: number;
  sum: number;
  total?: number;
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
    city: string;
    cityCode: string;
    country: string;
    province: string;
    street: string;
    streetNumber?: string;
  };
  birthPlace: {
    city?: string;
    province?: string;
  };
  fiscalId: string;
  fiscalStatus: "Verified" | "Unverified";
  gender: "male" | "female";
  type: FiscalType | "internal";
};
export type GetUsersMeFiscalApiArg = void;
export type PostUsersMeFiscalApiResponse = /** status 201 Created */ {
  address: {
    city: string;
    cityCode: string;
    country: string;
    province: string;
    street: string;
    streetNumber?: string;
  };
  birthPlace?: {
    city?: string;
    province?: string;
  };
  fiscalId: string;
  fiscalStatus: "Verified" | "Unverified";
  gender: "male" | "female";
  type: FiscalType;
};
export type PostUsersMeFiscalApiArg = {
  body: {
    address: {
      city: string;
      cityCode: string;
      country: string;
      province: string;
      street: string;
      streetNumber: string;
    };
    birthPlace?: FiscalBirthCity;
    fiscalId: string;
    gender: "male" | "female";
    type: FiscalType;
  };
};
export type PutUsersMeFiscalApiResponse = /** status 200 OK */ {
  address: {
    city: string;
    cityCode: string;
    country: string;
    province: string;
    street: string;
    streetNumber?: string;
  };
  birthPlace?: {
    city?: string;
    province?: string;
  };
  fiscalId: string;
  fiscalStatus: "Verified" | "Unverified";
  gender: "male" | "female";
  type: FiscalType;
};
export type PutUsersMeFiscalApiArg = {
  body: {
    address: {
      city: string;
      cityCode: string;
      country: string;
      province: string;
      street: string;
      streetNumber: string;
    };
    birthPlace?: FiscalBirthCity;
    fiscalId: string;
    gender: "male" | "female";
    type: FiscalType;
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
  limit?: number;
  results?: ({
    id: number;
  } & {
    amount: {
      gross: Currency;
      net: Currency;
    };
    method: {
      note: string;
      type: "paypal" | "iban";
    };
    paidDate: any | "-";
    receipt?: string;
    status: "paid" | "processing";
  })[];
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
  amount?: number;
  id?: number;
};
export type PostUsersMePaymentsApiArg = {
  body: {
    method:
      | {
          email: string;
          type: "paypal";
        }
      | {
          accountHolderName: string;
          iban: string;
          type: "iban";
        };
  };
};
export type GetUsersMePaymentsByPaymentApiResponse = /** status 200 OK */ {
  limit?: number;
  results: ({
    id: number;
  } & {
    activity: string;
    amount: {
      gross: Currency;
      net?: Currency;
    };
    date: string;
    type: string;
  })[];
  size: number;
  start: number;
  total?: number;
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
  limit?: number;
  results?: ({
    id: number;
  } & {
    activity: string;
    amount: {
      gross: Currency;
      net?: Currency;
    };
    attributionDate: string;
    name: string;
  })[];
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
  content?: string;
  id?: number;
  once?: boolean;
  title?: string;
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
  points: number;
  previousLevel: MonthlyLevel;
  prospect: {
    level: MonthlyLevel;
    maintenance?: number;
    next?: {
      level: MonthlyLevel;
      points: number;
    };
  };
  rank: number;
};
export type GetUsersMeRankApiArg = void;
export type GetUsersMeRankListApiResponse = /** status 200 OK */ {
  peers: RankingItem[];
  tops: RankingItem[];
};
export type GetUsersMeRankListApiArg = void;
export type Agreement = {
  expirationDate: string;
  isTokenBased?: boolean;
  note?: string;
  startDate: string;
  title: string;
  tokens: number;
  unitPrice: number;
};
export type PaginationData = {
  limit?: number;
  size: number;
  start: number;
  total?: number;
};
export type CampaignField = {
  id?: number;
};
export type BugType = {
  id?: number;
};
export type Replicability = {
  id?: string;
};
export type BugSeverity = {
  id?: number;
  name?: string;
};
export type TranslatablePage = {
  en?: string;
  es?: string;
  it?: string;
};
export type User = {
  email?: string;
  id?: number;
  image?: string;
  is_verified?: boolean;
  name?: string;
  role?: string;
  surname?: string;
  username?: string;
  wp_user_id?: number;
};
export type CampaignOptional = {
  additionalFields?: CampaignField[];
  allowed?: {
    bug_types?: BugType[];
    replicabilities?: Replicability[];
    severities?: BugSeverity[];
  };
  applied?: boolean;
  bugform_link?: boolean | TranslatablePage;
  csm_effort?: number;
  customerCanViewReviewing?: boolean;
  customer_title?: string;
  dates?: {
    close?: string;
    end?: string;
    start?: string;
  };
  devices?: {
    id?: string;
  }[];
  hasBugParade?: boolean;
  internal_id?: string;
  language?: string;
  manual_link?: TranslatablePage;
  minNumberOfMedia?: number;
  name?: string;
  preview_link?: TranslatablePage;
  projectManager?: User;
  public?: boolean;
  status?: boolean;
  titleRule?: boolean;
  tokens?: number;
  ux_effort?: number;
  visibility?: {
    freeSpots?: number;
    totalSpots?: number;
    type?: "available" | "unavailable" | "candidate";
  };
};
export type CampaignType = {} | {};
export type CampaignRequired = {
  campaign_type: CampaignType;
  dates: {
    close: string;
    end: string;
    start: string;
  };
  name: string;
};
export type Campaign = CampaignOptional & CampaignRequired;
export type Project = {
  name?: string;
};
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
      options?: {
        isInvalid?: boolean;
        value: string;
      }[];
      type: PreselectionQuestionMultiple;
    }
  | {
      options?: {
        isInvalid?: boolean;
        value: number;
      }[];
      type: PreselectionQuestionCuf;
    }
);
export type BugTag = {
  id: number;
  name: string;
};
export type BugStatus = {
  description?: string;
  id?: number;
  name?: string;
};
export type Gender = "male" | "female" | "not-specified" | "other";
export type ProspectStatus = "draft" | "confirmed" | "done";
export type TaskOptional = {
  allow_media?: boolean;
  campaign_id?: number;
  content?: string;
  group?: number;
  name?: string;
};
export type TaskRequired = {
  campaign_id: number;
  content: string;
  name: string;
};
export type Task = TaskOptional & TaskRequired;
export type CustomUserFieldsDataOption = {
  id: number;
  name: string;
};
export type CustomUserFieldsType = "text" | "select" | "multiselect";
export type CustomUserFieldsData = {
  allow_other?: boolean;
  format?: string;
  id: number;
  name: TranslatablePage;
  options?: CustomUserFieldsDataOption[];
  placeholder?: TranslatablePage;
  type: CustomUserFieldsType;
};
export type CampaignAdditionalField = {
  error: string;
  name: string;
  slug: string;
} & (
  | {
      options: string[];
      type: "select";
    }
  | {
      regex: string;
      type: "text";
    }
);
export type CountryCode = string;
export type DossierCreationData = {
  additionals?: ({
    showInStats?: boolean;
  } & CampaignAdditionalField)[];
  browsers?: number[];
  bugTypes?: number[];
  closeDate?: string;
  countries?: CountryCode[];
  csm?: number;
  description?: string;
  deviceList: number[];
  deviceRequirements?: string;
  endDate?: string;
  goal?: string;
  languages?: string[];
  notes?: string;
  outOfScope?: string;
  productLink?: string;
  productType?: number;
  project: number;
  roles?: {
    role: number;
    user: number;
  }[];
  startDate: string;
  target?: {
    cap?: number;
    genderQuote?: string;
    notes?: string;
    size?: number;
  };
  testType: number;
  title: {
    customer: string;
    tester?: string;
  };
  visibilityCriteria?: {
    ageRanges?: {
      max: number;
      min: number;
    }[];
    cuf?: {
      cufId: number;
      cufValueIds: number[];
    }[];
    gender?: number[];
    provinces?: string[];
  };
};
export type LevelDefinition = {
  hold?: number;
  id: number;
  name: string;
  reach?: number;
};
export type Popup = {
  content?: string;
  once?: boolean;
  profiles?:
    | number[]
    | (
        | "all"
        | "italian"
        | "non-italian"
        | "logged-in-year"
        | "not-logged-in-year"
      );
  title?: string;
};
export type AdditionalField = {
  field_id: number;
  is_candidate?: boolean;
  name: string;
  text?: string;
  value: string;
};
export type Currency = {
  currency: string;
  value: number;
};
export type Certification = {
  achievement_date: string;
  area: string;
  id?: number;
  institute: string;
  name: string;
};
export type Bug = {
  campaign?: CampaignOptional & {
    id?: number;
  };
  severity?: BugSeverity;
  status?: BugStatus;
  title?: string;
};
export type UserDevice = {
  device:
    | {
        id?: number;
        manufacturer: string;
        model: string;
      }
    | {
        pc_type: string;
      };
  id: number;
  operating_system: {
    id: number;
    platform: string;
    version: string;
  };
  type: string;
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
  id: number;
  image: string;
  monthly_exp: number;
  name: string;
  position: number;
};
export const {
  useGetQuery,
  useGetAgreementsQuery,
  usePostAgreementsMutation,
  useDeleteAgreementsByAgreementIdMutation,
  useGetAgreementsByAgreementIdQuery,
  usePutAgreementsByAgreementIdMutation,
  usePostAuthenticateMutation,
  useGetBrowsersQuery,
  usePatchBugsByBugIdStatusMutation,
  useGetCampaignTypesQuery,
  useGetCampaignsQuery,
  usePostCampaignsMutation,
  useGetCampaignsFormsQuery,
  usePostCampaignsFormsMutation,
  useGetCampaignsFormsByFormIdQuery,
  usePutCampaignsFormsByFormIdMutation,
  useGetCampaignsOwnersQuery,
  useGetCampaignsByCampaignQuery,
  usePutCampaignsByCampaignMutation,
  useGetCampaignsByCampaignBugsQuery,
  useGetCampaignsByCampaignBugsAndBugIdQuery,
  useGetCampaignsByCampaignCandidatesQuery,
  usePostCampaignsByCampaignCandidatesMutation,
  useGetCampaignsByCampaignClustersQuery,
  useGetCampaignsByCampaignFormsQuery,
  useGetCampaignsByCampaignGroupsQuery,
  useGetCampaignsByCampaignObservationsQuery,
  useGetCampaignsByCampaignPayoutsQuery,
  useGetCampaignsByCampaignProspectQuery,
  usePatchCampaignsByCampaignProspectMutation,
  usePutCampaignsByCampaignProspectMutation,
  usePutCampaignsByCampaignProspectAndTesterIdMutation,
  useGetCampaignsByCampaignStatsQuery,
  useGetCampaignsByCampaignTasksQuery,
  usePostCampaignsByCampaignTasksMutation,
  useGetCampaignsByCampaignTasksAndTaskQuery,
  usePutCampaignsByCampaignTasksAndTaskMutation,
  useGetCampaignsByCampaignUxQuery,
  usePatchCampaignsByCampaignUxMutation,
  useGetCertificationsQuery,
  useGetCountriesByCodeRegionQuery,
  useGetCustomUserFieldsQuery,
  useGetCustomersQuery,
  usePostCustomersMutation,
  useGetCustomersByCustomerProjectsQuery,
  usePostCustomersByCustomerProjectsMutation,
  useGetDevicesByDeviceTypeModelsQuery,
  useGetDevicesByDeviceTypeOperatingSystemsQuery,
  useGetDevicesByDeviceTypeOsVersionsQuery,
  usePostDossiersMutation,
  useGetDossiersByCampaignQuery,
  usePutDossiersByCampaignMutation,
  usePostDossiersByCampaignManualMutation,
  usePutDossiersByCampaignPhasesMutation,
  usePostDossiersByCampaignPreviewMutation,
  usePostDossiersByCampaignQuotationsMutation,
  usePatchDossiersByCampaignQuotationsAndQuoteMutation,
  useGetDossiersByCampaignQuotesHistoryQuery,
  useGetEducationQuery,
  useGetEmploymentsQuery,
  useGetJotformsFormsQuery,
  useGetJotformsFormsByFormIdQuestionsQuery,
  usePostJotformsByCampaignMutation,
  useGetLanguagesQuery,
  useGetLevelsQuery,
  useDeleteMediaMutation,
  usePostMediaMutation,
  useGetPaymentsQuery,
  useDeletePaymentsByPaymentIdMutation,
  usePostPaymentsByPaymentIdMutation,
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
  useDeleteUsersMeMutation,
  useGetUsersMeQuery,
  usePatchUsersMeMutation,
  usePutUsersMeMutation,
  usePutUsersMeAdditionalsByFieldIdMutation,
  useGetUsersMeBugsQuery,
  useGetUsersMeCampaignsQuery,
  useGetUsersMeCampaignsByCampaignIdQuery,
  usePostUsersMeCampaignsByCampaignIdBugsMutation,
  useGetUsersMeCampaignsByCampaignIdDevicesQuery,
  useGetUsersMeCampaignsByCampaignIdFormsQuery,
  usePostUsersMeCampaignsByCampaignIdFormsMutation,
  usePostUsersMeCampaignsByCampaignIdMediaMutation,
  useGetUsersMeCampaignsByCampaignCompatibleDevicesQuery,
  usePostUsersMeCertificationsMutation,
  useDeleteUsersMeCertificationsByCertificationIdMutation,
  useGetUsersMeDevicesQuery,
  usePostUsersMeDevicesMutation,
  useDeleteUsersMeDevicesByDeviceIdMutation,
  useGetUsersMeDevicesByDeviceIdQuery,
  usePatchUsersMeDevicesByDeviceIdMutation,
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
} = injectedRtkApi;
