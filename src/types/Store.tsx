import type { StoreState } from "./StoreState";
import type { StoreSubscriber } from "./StoreSubscriber";

export default interface Store<Type extends StoreState> {
    getState(): Type;
    dispatch(newState: Type): void;
    dispatchValue(key: string, value: any): void;
    subscribe(subscriber: StoreSubscriber<Type>, notifyOnSubscribe: boolean): Function
}