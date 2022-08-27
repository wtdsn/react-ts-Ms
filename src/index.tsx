import React from 'react';
import ReactDOM from 'react-dom/client';
import Suspense from '@/components/Suspense/index'
import App from './App';

import './assets/style/common.less'
import 'antd/dist/antd.min.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Suspense>
    <App />
  </Suspense>
);

