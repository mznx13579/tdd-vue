import { CommitOptions, DispatchOptions, Store } from 'vuex';
import { UserMutations } from './user/mutations';
import { UserActions } from './user/actions';
import { UserGetters } from './user/getters';
import { UserState } from './user/state';

export type RootState = { User: UserState };
type MergedMutations = UserMutations;
type MergedGetters = UserGetters;
type MergedActions = UserActions;

/* 하단은 건들지 마시오 */
type CustomMutations = {
  commit<K extends keyof MergedMutations, P extends Parameters<MergedMutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions,
  ): ReturnType<MergedMutations[K]>;
};

type CustomActions = {
  dispatch<K extends keyof MergedActions>(
    key: K,
    payload?: Parameters<MergedActions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<MergedActions[K]>;
};

type CustomGetters = {
  getters: {
    [K in keyof MergedGetters]: ReturnType<MergedGetters[K]>;
  };
};

export type CustomStore = Omit<Store<RootState>, 'commit' | 'dispatch' | 'getters'> &
  CustomMutations &
  CustomActions &
  CustomGetters;
