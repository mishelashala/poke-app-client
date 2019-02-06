import { IFluxStandardAction } from "../models";

type ReduxReducer = <T>(s: T, a: IFluxStandardAction) => T;

interface IHandlers {
  [key: string]: ReduxReducer;
}

export function createReducer<T>(initialState: T, handlers: IHandlers) {
  return function reducer(
    state: T = initialState,
    action: IFluxStandardAction
  ) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
