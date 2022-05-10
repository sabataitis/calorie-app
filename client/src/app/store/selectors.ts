import {createFeatureSelector, createSelector} from "@ngrx/store";
import {
  CategoryGraphState,
  LinearGraphState,
  ProductState,
  State,
  UsernamesState,
  UserState
} from "./state";

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

export const selectUserCategoryGraphState =
  createSelector(selectStoreState, (state: State): CategoryGraphState =>
    state.categoryGraphState);

export const selectUserLinearGraphState =
  createSelector(selectStoreState, (state: State): LinearGraphState =>
    state.linearGraphState);
