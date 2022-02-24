import { combineReducers } from 'redux';

import adminPayments from './adminPayments/reducer';
import messages from './siteWideMessages/reducer';

export default combineReducers({
  messages,
  adminPayments,
});
