import React from 'react';
import './App.css';
import { client } from './ApolloClient';
import { ApolloProvider } from '@apollo/client';
import { Router } from './Router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
