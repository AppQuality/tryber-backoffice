import {
  Button,
  FormGroup,
  FormLabel,
  Text,
  Input,
} from "@appquality/appquality-design-system";
import { useState } from "react";
import { GetUsersMeApiResponse } from "src/services/tryberApi";
import siteWideMessageStore from "src/redux/siteWideMessages";

const Report = ({
  userData,
  campaignId,
}: {
  userData?: GetUsersMeApiResponse;
  campaignId: string;
}) => {
  const [value, setValue] = useState<string>(userData?.email || "");
  const { add } = siteWideMessageStore();
  const handleChange = (val: string) => {
    setValue(val);
  };
  const getReport = () => {
    if (window.confirm("Send Report to " + value + "?")) {
      postData();
    }
  };

  async function postData() {
    try {
      const response = await fetch(
        "https://hooks.zapier.com/hooks/catch/5196925/3xcaqeu/",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cp_id: campaignId,
            email: value,
            show: "onlyAccepted",
          }),
        }
      );
      add({
        type: "success",
        message: "Report requested successfully, check your email! ",
      });
    } catch (error) {
      add({
        type: "danger",
        message: "There was an error: " + error,
      });
      console.error("Error:", error);
    }
  }
  return (
    <>
      <Text className="aq-mb-3">
        Receive a report listing data of already selected trybers
      </Text>
      <FormGroup>
        <FormLabel htmlFor="reportMail" label="Your Email" />
        <Input
          type="mail"
          id="reportMail"
          value={value}
          onChange={handleChange}
        />
      </FormGroup>
      <Button size="block" kind="primary" onClick={getReport}>
        Get Report
      </Button>
    </>
  );
};

export default Report;
