import { Reducer } from "react";
import {
  BlackjackActionTypes,
  BlackjackActions,
} from "../actions/blackjackActions";

export interface IBlackJackState {
  answerId: number;
  loading: boolean;
  errorMessage: string;
}

const initialBlackjackState: IBlackJackState = {
  answerId: null,
  loading: false,
  errorMessage: "",
};

export const blackjackReducer: Reducer<IBlackJackState, BlackjackActions> = (
  state = initialBlackjackState,
  action
) => {
  switch (action.type) {
    case BlackjackActionTypes.GET_TIPP: {
      return {
        ...state,
        answerId: action.answerId,
      };
    }
    case BlackjackActionTypes.LOAD_TIPP: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case BlackjackActionTypes.ERROR: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        answerId: -1,
      };
    }
    default:
      return state;
  }
};
