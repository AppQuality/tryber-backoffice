import SeverityFilter from "./SeverityFilter";
import Search from "./Search";

const Filters = ({ id }: { id: string }) => {
  return (
    <>
      <Search />
      <SeverityFilter id={id} />
    </>
  );
};

export default Filters;
