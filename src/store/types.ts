import { CommitOptions, DispatchOptions, Store } from 'vuex';
import { MoneyMutations } from './money/mutations';
import { MoneyActions } from './money/actions';
import { MoneyGetters } from './money/getters';
import { MoneyState } from './money/state';

export type RootState = { Money: MoneyState };
type MergedMutations = MoneyMutations;
type MergedGetters = MoneyGetters;
type MergedActions = MoneyActions;

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
