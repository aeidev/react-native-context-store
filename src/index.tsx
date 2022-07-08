import * as React from 'react';
import { useState } from 'react';
import ContextStore from './ContextStore';
import type Store from './types/Store';
import type { StoreState } from "./types/StoreState";

/**
 * creates a context provider to use with your context store.
 * @param context your react context
 * @returns context privder that updates when your store values change.
 */
function createProvider<TStoreState extends StoreState>(context: React.Context<TStoreState>) {
  return function contextProvider(props: { store: Store<TStoreState>, children: React.ReactNode }) {
    let mounted = false;
    const [storeState, setStoreState] = useState(props.store.getState())
    React.useEffect(() => {
      mounted = true;
      const unsub = props.store.subscribe(updateState, true);
      return () => {
        mounted = false;
        unsub();
      }
    }, []);

    const updateState = (newState: TStoreState) => {
      if (mounted === true) {
        //note this won't work if newState is the same object but just a value change.
        //This is currently handled in the ContextStore reducer functions but
        // will revsit this.
        setStoreState(newState);
      }
    }
    return (
      <context.Provider value={storeState}>
        {props.children}
      </context.Provider>
    )
  }
}

export { ContextStore, createProvider }
export type { StoreState }