import { aqBootstrapTheme, SelectType } from '@appquality/appquality-design-system';
import { components, operations } from 'src/utils/schema';

declare global {
  type Theme = typeof aqBootstrapTheme;
  type ApiOperations = operations;
  type ApiComponents = components;
  type SelectOptionType = SelectType.Option;
  type OrderType = "DESC" | "ASC";
}
