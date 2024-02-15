import { Checkbox } from "@appquality/appquality-design-system";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";

const NewSelectionFilters = ({
  mail,
  setMail,
  provider,
  setProvider,
  os,
  setOs,
}: {
  mail: string[];
  setMail: Dispatch<SetStateAction<string[]>>;
  provider: string[];
  setProvider: Dispatch<SetStateAction<string[]>>;
  os: string[];
  setOs: Dispatch<SetStateAction<string[]>>;
}) => {
  const handleCheckboxChange = (e: any) => {
    console.log(e);
  };
  const handleMailChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (!mail.includes(target.value)) {
      setMail([...mail, target.value]);
    } else {
      setMail(mail.filter((m) => m !== target.value));
    }
  };
  const handleProviderChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (!provider.includes(target.value)) {
      setProvider([...provider, target.value]);
    } else {
      setProvider(provider.filter((p) => p !== target.value));
    }
  };
  const handleOsChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (!os.includes(target.value)) {
      setOs([...os, target.value]);
    } else {
      setOs(os.filter((o) => o !== target.value));
    }
  };
  return (
    //<div style={{maxHeight: "500px", overflow: "scroll"}}>
    <div>
      <div className="aq-mb-3">
        <strong>Age</strong>
        <div style={{ display: "flex", marginBottom: "5px" }}>
          <label htmlFor="minAge">Min</label>
          <input
            style={{ width: "50px", marginLeft: "10px" }}
            id="minAge"
            value="18"
            type="number"
          />
        </div>
        <div style={{ display: "flex" }}>
          <label>Max</label>
          <input
            style={{ width: "50px", marginLeft: "10px" }}
            value="56"
            type="number"
          />
        </div>
      </div>
      <div className="aq-mb-3">
        <strong>Gender</strong>
        <Checkbox label="M" value="M" onChange={handleCheckboxChange} />
        <Checkbox label="F" value="F" onChange={handleCheckboxChange} />
      </div>
      <div className="aq-mb-3">
        <strong>UX Level</strong>
        <Checkbox
          label="Newbie"
          value="Newbie"
          onChange={handleCheckboxChange}
        />
        <Checkbox
          label="Rookie"
          value="Rookie"
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="aq-mb-3">
        <strong>Bh Level</strong>
        <Checkbox
          label="Newbie"
          value="Newbie"
          onChange={handleCheckboxChange}
        />
        <Checkbox
          label="Rookie"
          value="Rookie"
          onChange={handleCheckboxChange}
        />
        <Checkbox
          label="Advanced"
          value="Advanced"
          onChange={handleCheckboxChange}
        />
        <Checkbox
          label="Expert"
          value="Expert"
          onChange={handleCheckboxChange}
        />
        <Checkbox
          label="Champion"
          value="Champion"
          onChange={handleCheckboxChange}
        />
        <Checkbox
          label="Veteran"
          value="Veteran"
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="aq-mb-3">
        <strong>Device</strong>
        <Checkbox label="Android" value="Android" onChange={handleOsChange} />
        <Checkbox label="iOS" value="iOS" onChange={handleOsChange} />
      </div>
      <div className="aq-mb-3">
        <strong>
          Hai una Mail Virgilio? Verranno selezionati sia tryber con mail
          virgilio che con altri servizi di posta
        </strong>
        <Checkbox label="Si" value="Si" onChange={handleMailChange} />
        <Checkbox label="No" value="No" onChange={handleMailChange} />
      </div>
      <div className="aq-mb-3">
        <strong>
          Indica i servizi di posta con i quali hai delle caselle di posta
          attive (con varie mail)
        </strong>
        * Gmail, Libero, Outlook / Live / Hotmail, Yahoo, Altro
        <Checkbox label="Gmail" value="Gmail" onChange={handleProviderChange} />
        <Checkbox
          label="Libero"
          value="Libero"
          onChange={handleProviderChange}
        />
        <Checkbox
          label="Outlook / Live / Hotmail"
          value="Outlook / Live / Hotmail"
          onChange={handleProviderChange}
        />
        <Checkbox label="Yahoo" value="Yahoo" onChange={handleProviderChange} />
        <Checkbox label="Altro" value="Altro" onChange={handleProviderChange} />
      </div>
    </div>
  );
};

export default NewSelectionFilters;
