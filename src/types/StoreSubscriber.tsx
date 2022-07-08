import type { StoreState } from "./StoreState";

export type StoreSubscriber<Type extends StoreState> = (newState: Type) => void