import { Providers, ReactQueryProvider } from '@/store/provider';
import RootNavigation from './src/navigations';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <ReactQueryProvider>
        <Providers>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <RootNavigation />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </Providers>
      </ReactQueryProvider>
    </SafeAreaProvider>
  );
}
