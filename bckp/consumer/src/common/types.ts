import { Action } from 'redux';

export type Dispatch = (action: Action) => void;

export interface ActionWithPayload<T> extends Action {
  payload: T;
}
