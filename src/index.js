import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import './index.scss';
import Home from './components/Home/Home';
import App from './App';
import StepsControl from './components/StepsControl/StepsControl';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/new-session" element={<App />} />
          <Route path="/sessions" element={<Home />} />
          <Route path="/control" element={<StepsControl />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
        <ReactQueryDevtools />
      </BrowserRouter>
    </QueryClientProvider>
  </>
);
