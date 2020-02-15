import { createSelector } from "reselect";
import { create } from "domain";

export const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectUserId = create(
  [selectCurrentUser],
  currentUser => currentUser.id
)
