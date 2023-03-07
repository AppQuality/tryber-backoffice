import StatusFilter from "./StatusFilter";
import SeverityFilter from "./SeverityFilter";
import Search from "./Search";
import TagsFilter from "./TagsFilter";

const Filters = ({ id }: { id: string }) => {
  return (
    <>
      <Search />
      <SeverityFilter id={id} />
      <StatusFilter id={id} />
      <TagsFilter id={id} />
    </>
  );
};

export default Filters;
