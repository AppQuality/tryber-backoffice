import { FC } from "react";
import { Button } from "@appquality/appquality-design-system";
import siteWideMessageStore from "src/redux/siteWideMessages";

export const CopyLinkButton: FC<{ id: string }> = ({ id }) => {
  const { add } = siteWideMessageStore();
  const copyToClipboard = async (linkToCopy: string) => {
    await window.navigator.clipboard.writeText(
      window.location.origin + linkToCopy
    );
    add({ message: "link copied to clipboard", type: "success", expire: 1 });
  };

  return (
    <Button
      onClick={() => {
        copyToClipboard(
          `/wp-admin/admin.php?page=preselection_form_builder&backoffice_page=campaigns%2Fpreselection-forms%2F${id}`
        );
      }}
      className="aq-ml-4"
    >
      copy link to share
    </Button>
  );
};
