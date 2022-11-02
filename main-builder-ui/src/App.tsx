import React from 'react';
import './App.css';
import { client } from './ApolloClient';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './hooks/useAuth';
import { SnackbarProvider } from 'notistack';
import { Router } from './Router';

function App() {
  return (
    <ApolloProvider client={client}>
        <div className="main">
          <SnackbarProvider
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  maxSnack={5}
                  iconVariant={{
                      success: '✅',
                      error: '✖️',
                      warning: '⚠️',
                      info: 'ℹ️',
                  }}
              >
            <AuthProvider>
              <Router />
            </AuthProvider>
          </SnackbarProvider>
        </div>
    </ApolloProvider>
  );
}

export default App;
