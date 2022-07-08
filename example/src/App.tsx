import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { appContext, AppContextProvider, appStore } from './AppStore';

const IncrementComponent = () => {
  const localContext = React.useContext(appContext);
  const onPress = () => appStore.dispatchValue("value", ++localContext.count);
  return (
    <View>
      <Button title="increment" onPress={onPress} />
      <Text>Count: {localContext.count}</Text>
    </View>
  );
}

export default function App() {
  return (
    <AppContextProvider>
      <View style={styles.container}>
        <IncrementComponent />
      </View>
    </AppContextProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
function AppStoreState(AppStoreState: any, arg1: number) {
  throw new Error('Function not implemented.');
}

