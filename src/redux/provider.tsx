import { Provider, useDispatch } from 'react-redux';
import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

const middlewares = [thunk];
const store: Store<
  GeneralState,
  {
    type: string;
  }
> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(...middlewares));

export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export

export default ({ children }: any) => (
  <Provider store={store}>{children}</Provider>
);
