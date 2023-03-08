import StatusFilter from "./StatusFilter";
import SeverityFilter from "./SeverityFilter";
import Search from "./Search";
import TagsFilter from "./TagsFilter";
import DuplicationFilter from "./DuplicationFilter";

const Filters = ({ id }: { id: string }) => {
  return (
    <>
      <div className="aq-mb-3">
        <Search />
      </div>
      <div className="aq-mb-3">
        <SeverityFilter id={id} />
      </div>
      <div className="aq-mb-3">
        <StatusFilter id={id} />
      </div>
      <div className="aq-mb-3">
        <TagsFilter id={id} />
      </div>
      <div>
        <DuplicationFilter id={id} />
      </div>
    </>
  );
};

export default Filters;
