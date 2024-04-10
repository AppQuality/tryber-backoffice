import {
  aqBootstrapTheme,
  SelectType,
} from "@appquality/appquality-design-system";
import { components, operations } from "src/utils/schema";

declare global {
  type Theme = typeof aqBootstrapTheme;
  type ApiOperations = operations;
  type HttpError = HttpError;
  type ApiComponents = components;
  type SelectOptionType = SelectType.Option;
  type OrderType = "DESC" | "ASC";

  var react_env: {
    REACT_APP_ENVIRONMENT: string;
    REACT_APP_VERSION: string;
    REACT_APP_REPORT_WEBHOOK: string;
  };
}
