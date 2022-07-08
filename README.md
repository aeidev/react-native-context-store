# react-native-context-store
Simple state manager that integrates with react context api.

## Installation

```sh
npm install react-native-context-store
```

## Usage

```js
import { ContextStore, createProvider, StoreState } from "react-native-context-store";


//Define your types (optional)
export interface AppStoreState extends StoreState {
    count: number;
    userName: string;
}
const appStoreState: AppStoreState = {
    count: 0,
    userName: "Test Name"
}

//create your reacte context
export const appContext = React.createContext<AppStoreState>(appStoreState);
//create your store
export const appStore = new ContextStore<AppStoreState>(appStoreState);

//create your react context provider using your react context and app context store.
const AppContextProviderComp = createProvider(appContext);
export const AppContextProvider = (props: any) => {
    return <AppContextProviderComp store={appStore}>
        {props.children}
    </AppContextProviderComp>
}


//now use the AppContextProvider just like you would any other react context provider.
const IncrementComponent = () => {
  const localContext = React.useContext(appContext);
  const onPress = () => appStore.dispatchValue("value", ++localContext.count); //you can also use appStore.dispatch(newState) to update all values.
  return (
    <View>
      <Button title="increment" onPress={onPress} />
      <Text>Count: {localContext.count}</Text>
    </View>
  );
}
function App() {
  return (
    <AppContextProvider>
      <View>
        <IncrementComponent />
      </View>
    </AppContextProvider>
  );
}


// ...
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
