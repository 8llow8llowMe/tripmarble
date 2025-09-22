import { Providers, ReactQueryProvider } from '@/store/provider';
import RootNavigation from './src/navigations';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import UseNetworkCheck from '@/hooks/useNetworkCheck';
import NetworkStatusBar from '@/components/common/NetworkStatusBar';

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <ReactQueryProvider>
        <Providers>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <UseNetworkCheck />
              <NetworkStatusBar />
              <RootNavigation />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </Providers>
      </ReactQueryProvider>
    </SafeAreaProvider>
  );
}
