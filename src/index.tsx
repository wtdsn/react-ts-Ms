import React from 'react';
import ReactDOM from 'react-dom/client';
import Suspense from '@/components/Suspense/index'
import App from './App';

/* 引入 store */
import { Provider } from 'react-redux'
import { store } from '@/Store/index'

import './assets/style/common.less'
import 'antd/dist/antd.min.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Suspense>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
);

