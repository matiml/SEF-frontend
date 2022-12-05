import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import './index.scss';
import Home from './components/Home/Home';
import App from './App';
import StepsControl from './components/Settings/StepsControl/StepsControl';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import BotConfig from './components/Settings/BotConfig/BotConfig';
import Preferences from './components/Settings/Preferences/Preferences';
import PasswordRecovery from './components/Settings/PasswordRecovery/PasswordRecovery';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recover" element={<PasswordRecovery />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sessions" element={<Home />} />
          <Route path="/control" element={<StepsControl />} />
          <Route path="/settings" element={<Preferences />}>
            <Route path="/settings/bot" element={<BotConfig />} />
          </Route>
        </Routes>
        <ReactQueryDevtools />
      </BrowserRouter>
    </QueryClientProvider>
  </>
);
