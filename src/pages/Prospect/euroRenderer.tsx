import { Item } from "./EdiTable/types";
import { Row } from "./types";

const renderer = (value: Item<Row>[keyof Row]) => `${value} €`;
export default renderer;
