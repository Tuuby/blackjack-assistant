import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IBlackJackState } from "../reducers/blackjackReducer";

export enum BlackjackActionTypes {
  GET_TIPP = "GET_TIPP",
  LOAD_TIPP = "LOAD_TIPP",
  ERROR = "ERROR",
}

export interface IGetTippAction {
  type: BlackjackActionTypes.GET_TIPP;
  answerId: number;
}

export interface ILoadTippAction {
  type: BlackjackActionTypes.LOAD_TIPP;
  loading: boolean;
}

export interface IErrorAction {
  type: BlackjackActionTypes.ERROR;
  errorMessage: string;
}
export type BlackjackActions = IGetTippAction | ILoadTippAction | IErrorAction;

export const GetTippAction: ActionCreator<
  ThunkAction<Promise<any>, IBlackJackState, null, IGetTippAction>
> = (playerCard1: number, playerCard2: number, dealerCard: number) => {
  return async (dispatch: Dispatch) => {
    try {
      let result = await (
        await fetch(/* API URL here with parameters*/ "test.url")
      ).json();
      if (result.status !== "success") {
        throw new Error(result.message);
      }
      dispatch({
        answerId: result.message,
        type: BlackjackActionTypes.GET_TIPP,
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: BlackjackActionTypes.ERROR, errorMessage: err });
      dispatch({ type: BlackjackActionTypes.LOAD_TIPP, loading: false });
    }
  };
};

export const LoadTippAction: ActionCreator<
  ThunkAction<any, IBlackJackState, null, ILoadTippAction>
> = (shouldLoad: boolean) => (dispatch: Dispatch) =>
  dispatch({ type: BlackjackActionTypes.LOAD_TIPP, loading: shouldLoad });
