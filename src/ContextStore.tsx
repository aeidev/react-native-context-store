import type Store from "./types/Store";
import type { StoreState } from "./types/StoreState";
import type { StoreSubscriber } from "./types/StoreSubscriber";

export default class ContextStore<Type extends StoreState> implements Store<StoreState> {
    private subscribers: Array<Function> = [];
    private state: Type;
    constructor(initialState: Type) {
        this.state = initialState;
    }

    /**
     * Updates the store state with the new values. Notifies all subscribers.
     * @param newState 
     */
    dispatch(newState: Type): void {
        this.state = this.reduceStoreState(this.state, newState);
        this.subscribers.forEach((subscriber) => {
            subscriber(this.state)
        })
    }
    /**
    * Updates a single key value in the store.
    * @param newState 
    */
    dispatchValue(keyName: string, value: any): void {
        this.state = this.reduceStoreStateSingleValue(this.state, keyName, value)
        this.subscribers.forEach((subscriber) => {
            subscriber(this.state)
        })
    }
    /**
     * Adds a new subscriber to the context store.
     * @param subscriber function called everytime the state is update.
     * @param notifyOnSubscribe set this to true if you would like to be notified of the store
     * state when the subscriber is added.
     * @returns unsubscribe fuinction.
     */
    subscribe(subscriber: StoreSubscriber<Type>, notifyOnSubscribe: boolean): Function {
        this.subscribers.push(subscriber);
        if (notifyOnSubscribe === true) {
            subscriber(this.state)
        }
        return () => {
            const index = this.subscribers.indexOf(subscriber);
            if (index >= 0) {
                this.subscribers.splice(index, 1);
            }
        }
    }
    /**
     * 
     * @returns returns the current store values.
     */
    getState() {
        return this.state;
    }

    /**
     * Merges the old state with the new desired state.
     * @param currentState 
     * @param newState 
     * @returns 
     */
    private reduceStoreState(currentState: Type, newState: Type) {
        return { ...currentState, ...newState };
    }

    private reduceStoreStateSingleValue(currentState: Type, keyName: string, value: any) {
        return { ...currentState, keyName: value };
    }
}