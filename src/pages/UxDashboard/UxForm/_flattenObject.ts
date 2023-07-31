export function flattenObject(
  ob: { [key: string]: any },
  prefix?: string,
  result?: { [key: string]: any }
) {
  result = result || {};

  // Preserve empty objects and arrays, they are lost otherwise
  if (
    prefix &&
    typeof ob === "object" &&
    ob !== null &&
    Object.keys(ob).length === 0
  ) {
    result[prefix] = Array.isArray(ob) ? [] : {};
    return result;
  }

  prefix = prefix ? prefix + "." : "";

  for (const i in ob) {
    if (Object.prototype.hasOwnProperty.call(ob, i)) {
      // Only recurse on true objects and arrays, ignore custom classes like dates
      if (
        typeof ob[i] === "object" &&
        (Array.isArray(ob[i]) ||
          Object.prototype.toString.call(ob[i]) === "[object Object]") &&
        ob[i] !== null
      ) {
        // Recursion on deeper objects
        flattenObject(ob[i], prefix + i, result);
      } else {
        result[prefix + i] = ob[i];
      }
    }
  }
  return result;
}
