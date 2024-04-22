import { Option } from "./fields/components/Select";
interface Item extends Option {
  type: string;
}

type Accumulator = {
  [key: string]: Item[];
};

export function groupDevicesByType(items: Item[]) {
  return items.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = []; // Initialize it as an empty array if not present
    }
    acc[item.type].push(item); // Push the current item into the correct type array
    return acc; // Return the updated accumulator
  }, {} as Accumulator);
}
