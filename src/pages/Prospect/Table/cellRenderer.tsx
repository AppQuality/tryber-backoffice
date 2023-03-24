import { Item } from "../EdiTable/types";
import { Row } from "../types";

export const euroRenderer = (value: Item<Row>[keyof Row]) => `${value} €`;
export const bugRenderer = (value: Item<Row>[keyof Row]) => `${value} 🪲`;
export const pointsRenderer = (value: Item<Row>[keyof Row]) => `${value} pts.`;
