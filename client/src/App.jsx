import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider,createHttpLink, InMemoryCache } from '@apollo/client';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});





const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
    <>
      <Navbar />
      <Routes>
            <Route path='/' element={<SearchBooks />} /> {/* Render the SearchBooks component */}
            <Route path='/saved' element={<SavedBooks />} /> {/* Render the SavedBooks component */}
            <Route path='*' element={<h1 className='display-2'>Wrong page!</h1>} /> {/* Render a default error message for wrong page */}
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;