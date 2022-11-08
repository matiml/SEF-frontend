import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import './index.scss';
import Home from './components/Home/Home';
import App from './App';
import Steps from './components/Steps/Steps';
import SignUp from './components/SignUp/SignUp';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/sessions" element={<Home />} />
          <Route path="/control" element={<Steps />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
        <ReactQueryDevtools />
      </BrowserRouter>
    </QueryClientProvider>
  </>
);
