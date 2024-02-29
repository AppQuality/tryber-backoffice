import { Checkbox, Title } from "@appquality/appquality-design-system";
import { useAppDispatch } from "src/store";
import { changeTablePage, setFilters } from "../../../selectionSlice";

const CheckboxFilter = ({
  title,
  key,
  options,
  onSelect,
}: {
  title: string;
  key: string;
  options: string[];
  onSelect: (checked: boolean, option: string) => ReturnType<typeof setFilters>;
}) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Title size="s">{title}</Title>
      {options.map((d) => (
        <div key={d}>
          <Checkbox
            name={`filters.${key}.${d}`}
            label={d}
            onChange={(e) => {
              dispatch(changeTablePage({ newPage: 1 }));
              dispatch(onSelect(e.target.checked, d));
            }}
          />
        </div>
      ))}
    </>
  );
};

export { CheckboxFilter };
