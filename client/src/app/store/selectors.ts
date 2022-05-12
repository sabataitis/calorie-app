import {createFeatureSelector, createSelector} from "@ngrx/store";
import {
  PolarChartState,
  BarChartState,
  ProductState,
  State,
  UsernamesState,
  UserState, CategoryState
} from "./state";

export const selectStoreState = createFeatureSelector<State>('store');

export const selectUsernamesState =
  createSelector(selectStoreState, (state: State): UsernamesState =>
    state.usernamesState);

export const selectCategoryState =
  createSelector(selectStoreState, (state: State): CategoryState =>
    state.categoryState);

export const selectUserState =
  createSelector(selectStoreState, (state: State): UserState =>
    state.userState);

export const selectProductState =
  createSelector(selectStoreState, (state: State): ProductState =>
    state.productState);

export const selectPolarChartState =
  createSelector(selectStoreState, (state: State): PolarChartState =>
    state.polarChartState);

export const selectBarChartState =
  createSelector(selectStoreState, (state: State): BarChartState =>
    state.barChartState);
