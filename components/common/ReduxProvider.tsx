'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import GlowNestSpinner from './GlowNestSpinner';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={<GlowNestSpinner/>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
