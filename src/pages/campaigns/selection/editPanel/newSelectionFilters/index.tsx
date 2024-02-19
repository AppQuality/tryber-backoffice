import { Button, Checkbox } from "@appquality/appquality-design-system";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";

const NewSelectionFilters = ({
  mail,
  setMail,
  provider,
  setProvider,
  os,
  setOs,
  bhLevel,
  setBhLevel,
  uxLevel,
  setUxLevel,
  age,
  setAge,
}: {
  mail: string[];
  setMail: Dispatch<SetStateAction<string[]>>;
  provider: string[];
  setProvider: Dispatch<SetStateAction<string[]>>;
  os: string[];
  setOs: Dispatch<SetStateAction<string[]>>;
  bhLevel: string[];
  setBhLevel: Dispatch<SetStateAction<string[]>>;
  uxLevel: string[];
  setUxLevel: Dispatch<SetStateAction<string[]>>;
  age: { min: number; max: number };
  setAge: Dispatch<SetStateAction<{ min: number; max: number }>>;
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
  const handleBhLevelChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (!bhLevel.includes(target.value)) {
      setBhLevel([...bhLevel, target.value]);
    } else {
      setBhLevel(bhLevel.filter((b) => b !== target.value));
    }
  };
  const handleUxLevelChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (!uxLevel.includes(target.value)) {
      setUxLevel([...uxLevel, target.value]);
    } else {
      setUxLevel(uxLevel.filter((b) => b !== target.value));
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
            value={age.min}
            type="number"
            onChange={(e) =>
              setAge({ ...age, min: parseInt(e.target.value.toString()) })
            }
          />
        </div>
        <div style={{ display: "flex" }}>
          <label>Max</label>
          <input
            style={{ width: "50px", marginLeft: "10px" }}
            value={age.max}
            type="number"
            onChange={(e) =>
              setAge({ ...age, max: parseInt(e.target.value.toString()) })
            }
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
          onChange={handleUxLevelChange}
        />
        <Checkbox
          label="Rookie"
          value="Rookie"
          onChange={handleUxLevelChange}
        />
      </div>
      <div className="aq-mb-3">
        <strong>Bh Level</strong>
        <Checkbox
          label="Newbie"
          value="Newbie"
          onChange={handleBhLevelChange}
        />
        <Checkbox
          label="Rookie"
          value="Rookie"
          onChange={handleBhLevelChange}
        />
        <Checkbox
          label="Advanced"
          value="Advanced"
          onChange={handleBhLevelChange}
        />
        <Checkbox
          label="Expert"
          value="Expert"
          onChange={handleBhLevelChange}
        />
        <Checkbox
          label="Champion"
          value="Champion"
          onChange={handleBhLevelChange}
        />
        <Checkbox
          label="Veteran"
          value="Veteran"
          onChange={handleBhLevelChange}
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
