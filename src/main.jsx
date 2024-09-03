import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';

import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
//import { store } from './store/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
		<NextUIProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</NextUIProvider>
  </StrictMode>,
)
