import { useEffect } from "react";
import { useFormikContext } from "formik";
import { useAppSelector } from "src/store";

const FocusError = () => {
  const { errors, isSubmitting, isValidating } = useFormikContext();
  const { list } = useAppSelector((state) => state.jotform);

  useEffect(() => {
    if (isSubmitting && !isValidating) {
      let keys = Object.keys(errors);
      if (keys.length > 0) {
        keys = keys.filter((k) => k !== "additional");
        const e = errors as any;
        if (e.additional) {
          const additionalKeys = Object.keys(e.additional);
          let subKeys: string[] = [];
          list.forEach((l) => {
            additionalKeys.forEach((a) => {
              if (a === l.id.toString()) {
                if (!!e.additional[a]?.title)
                  subKeys.push(`additional.${a}.title`);
                else if (!!e.additional[a]?.options)
                  subKeys.push(`additional.${a}.options`);
              }
            });
          });
          keys = keys.concat(subKeys);
        }
        const selector = `[id="${keys[0]}"]`;
        const errorElement = document.querySelector(selector) as HTMLElement;
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
          errorElement.focus({ preventScroll: true });
        }
      }
    }
  }, [errors, isSubmitting, isValidating]);

  return null;
};

export default FocusError;
