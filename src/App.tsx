import { LoadingProvider } from '@/contexts/LoadingContext';
import { OidcProvider } from '@/oidc';
import AppProvider from '@/providers/AppProvider';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import './main.css';
import AppRoutes from './routes';
import { setupStore } from './store';

function App() {
  const store = setupStore();
  return (
    <OidcProvider>
      <LoadingProvider>
        <Provider store={store}>
          <SnackbarProvider>
            <AppProvider>
              <AppRoutes />
            </AppProvider>
          </SnackbarProvider>
        </Provider>
      </LoadingProvider>
    </OidcProvider>
  );
}

export default App;
