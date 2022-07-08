
import { ContextStore, createProvider, StoreState } from "react-native-context-store";
import * as React from 'react';

export interface AppStoreState extends StoreState {
    count: number;
    userName: string;
}
const appStoreState: AppStoreState = {
    count: 0,
    userName: "Test Name"
}

export const appContext = React.createContext<AppStoreState>(appStoreState);
export const appStore = new ContextStore<AppStoreState>(appStoreState);
const AppContextProviderComp = createProvider(appContext);
export const AppContextProvider = (props: any) => {
    return <AppContextProviderComp store={appStore}>
        {props.children}
    </AppContextProviderComp>
}




