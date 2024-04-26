import { tryberApi } from ".";

tryberApi.enhanceEndpoints({
  endpoints: {
    postAuthenticate: {
      invalidatesTags: ["Users"],
    },
    postCampaigns: {
      invalidatesTags: ["Campaigns"],
    },
    getCampaigns: {
      providesTags: ["Campaigns"],
    },
    getCampaignsByCampaign: {
      providesTags: ["Campaigns"],
    },
    putCampaignsByCampaign: {
      invalidatesTags: ["Campaigns"],
    },
    postCampaignsByCampaignCandidates: {
      invalidatesTags: ["Selection"],
    },
    getCampaignsByCampaignCandidates: {
      providesTags: ["Selection"],
    },
    getCampaignsByCampaignTasks: {
      providesTags: ["Campaigns"],
    },
    postCampaignsByCampaignTasks: {
      invalidatesTags: ["Campaigns"],
    },
    getCampaignsByCampaignTasksAndTask: {
      providesTags: ["Campaigns"],
    },
    putCampaignsByCampaignTasksAndTask: {
      invalidatesTags: ["Campaigns"],
    },
    postCampaignsForms: {
      invalidatesTags: ["Campaigns"],
    },
    getCampaignsForms: {
      providesTags: ["Campaigns"],
    },
    getCampaignsFormsByFormId: {
      providesTags: ["Campaigns"],
    },
    putCampaignsFormsByFormId: {
      invalidatesTags: ["Campaigns"],
    },
    getCampaignsByCampaignForms: {
      providesTags: ["Campaigns", "CampaignForms"],
    },
    getCustomers: {
      providesTags: ["Customers"],
    },
    getCustomUserFields: {
      providesTags: ["CustomUserFields"],
    },
    getDevicesByDeviceTypeModels: {
      providesTags: ["Devices"],
    },
    getDevicesByDeviceTypeOperatingSystems: {
      providesTags: ["Devices"],
    },
    getDevicesByDeviceTypeOsVersions: {
      providesTags: ["Devices"],
    },
    getEducation: {
      providesTags: ["Users"],
    },
    getEmployments: {
      providesTags: ["Users"],
    },
    getLanguages: {
      providesTags: ["Languages"],
    },
    getLevels: {
      providesTags: ["Levels"],
    },
    postMedia: {
      invalidatesTags: ["Media"],
    },
    deleteMedia: {
      invalidatesTags: ["Media"],
    },
    getPayments: {
      providesTags: ["Payments"],
    },
    postPaymentsByPaymentId: {
      invalidatesTags: ["Payments"],
    },
    deletePaymentsByPaymentId: {
      invalidatesTags: ["Payments"],
    },
    getPopups: {
      providesTags: ["Popups"],
    },
    postPopups: {
      invalidatesTags: ["Popups"],
    },
    getPopupsByPopup: {
      providesTags: ["Popups"],
    },
    patchPopupsByPopup: {
      invalidatesTags: ["Popups"],
    },
    getUsers: {
      providesTags: ["Users"],
    },
    postUsers: {
      invalidatesTags: ["Users"],
    },
    getUsersMe: {
      providesTags: ["Users"],
    },
    getUsersMeCampaigns: {
      providesTags: ["Campaigns"],
    },
    getUsersMeCampaignsByCampaignId: {
      providesTags: ["Campaigns"],
    },
    getUsersMeCampaignsByCampaignCompatibleDevices: {
      providesTags: ["Campaigns", "Devices"],
    },
    postUsersMeCampaignsByCampaignIdBugs: {
      invalidatesTags: ["Bugs"],
    },
    getUsersMeCampaignsByCampaignIdDevices: {
      providesTags: ["Campaigns", "Devices"],
    },
    postUsersMeCampaignsByCampaignIdMedia: {
      invalidatesTags: ["Media"],
    },
    postUsersMeCertifications: {
      invalidatesTags: ["Users"],
    },
    deleteUsersMeCertificationsByCertificationId: {
      invalidatesTags: ["Users"],
    },
    getUsersMeDevices: {
      providesTags: ["Devices"],
    },
    postUsersMeDevices: {
      invalidatesTags: ["Devices"],
    },
    getUsersMeDevicesByDeviceId: {
      providesTags: ["Devices"],
    },
    patchUsersMeDevicesByDeviceId: {
      invalidatesTags: ["Devices"],
    },
    deleteUsersMeDevicesByDeviceId: {
      invalidatesTags: ["Devices"],
    },
    getUsersMeExperience: {
      providesTags: ["ExperiencePoints"],
    },
    getUsersMeFiscal: {
      providesTags: ["Users"],
    },
    postUsersMeFiscal: {
      invalidatesTags: ["Users"],
    },
    putUsersMeFiscal: {
      invalidatesTags: ["Users"],
    },
    postUsersMeLanguages: {
      invalidatesTags: ["Languages"],
    },
    putUsersMeLanguages: {
      invalidatesTags: ["Languages"],
    },
    deleteUsersMeLanguagesByLanguageId: {
      invalidatesTags: ["Languages"],
    },
    getUsersMePayments: {
      providesTags: ["Payments"],
    },
    postUsersMePayments: {
      invalidatesTags: ["Payments"],
    },
    getUsersMePaymentsByPayment: {
      providesTags: ["Payments"],
    },
    getUsersMePendingBooty: {
      providesTags: ["Users"],
    },
    getUsersMePopups: {
      providesTags: ["Popups"],
    },
    getUsersMePopupsByPopup: {
      providesTags: ["Popups"],
    },
    getUsersMeRank: {
      providesTags: ["Users"],
    },
    getUsersMeRankList: {
      providesTags: ["Users"],
    },
    getUsersMeCampaignsByCampaignIdForms: {
      providesTags: ["Campaigns"],
    },
    postUsersMeCampaignsByCampaignIdForms: {
      invalidatesTags: ["Campaigns"],
    },
    getCampaignsByCampaignProspect: {
      providesTags: ["Prospect"],
    },
    putCampaignsByCampaignProspect: {
      invalidatesTags: ["Prospect"],
    },
    patchCampaignsByCampaignProspect: {
      invalidatesTags: ["Prospect"],
    },
    getCampaignsByCampaignUx: {
      providesTags: ["UX"],
    },
    patchCampaignsByCampaignUx: {
      invalidatesTags: ["UX"],
    },
    getJotformsForms: {
      providesTags: ["Forms"],
    },
    postJotformsByCampaign: {
      invalidatesTags: ["Selection", "Campaigns", "CampaignForms"],
    },
    getCustomersByCustomerProjects: {
      providesTags: ["Customers", "Projects"],
    },
    postCustomersByCustomerProjects: {
      invalidatesTags: ["Projects"],
    },
  },
});

export { tryberApi as tryberApiSlice };
