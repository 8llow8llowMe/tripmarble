import { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import LoadingSpinner from '@/components/common/loading/LoadingSpinner';
import { persistor, store } from '@/store/store';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

const ReactQueryProvider = ({ children }: React.PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 0, //  default 0
          gcTime: 1000 * 60 * 5, // 5분 동안 메모리에 유지 - default 5 분
          retry: 1, // 실패 시 1번만 재시도
          retryDelay: 1000, // 재시도 간격 1초 (밀리초 단위)
        },
      },
    }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export { Providers, ReactQueryProvider };
