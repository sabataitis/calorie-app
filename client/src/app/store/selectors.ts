import {createFeatureSelector, createSelector} from "@ngrx/store";
import {GraphsState, ProductState, State, UsernamesState, UserState} from "./state";

export const selectStoreState = createFeatureSelector<State>('store');

export const selectUsernamesState =
  createSelector(selectStoreState, (state: State): UsernamesState =>
    state.usernamesState);

export const selectUserState =
  createSelector(selectStoreState, (state: State): UserState =>
    state.userState);

export const selectProductState =
  createSelector(selectStoreState, (state: State): ProductState =>
    state.productState);

export const selectGraphsState =
  createSelector(selectStoreState, (state: State): GraphsState =>
    state.graphsState);
