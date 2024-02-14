import { Checkbox } from "@appquality/appquality-design-system";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";

const NewSelectionFilters = ({
  mail,
  setMail,
}: {
  mail: string[];
  setMail: Dispatch<SetStateAction<string[]>>;
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
  return (
    <>
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
        <strong>
          Hai una Mail Virgilio? Verranno selezionati sia tryber con mail
          virgilio che con altri servizi di posta
        </strong>
        <Checkbox label="Si" value="Si" onChange={handleMailChange} />
        <Checkbox label="No" value="No" onChange={handleMailChange} />
      </div>
    </>
  );
};

export default NewSelectionFilters;
