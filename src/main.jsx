import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { reducers } from './store/store.js';
import App from './App.jsx';
import './index.css';

const store = createStore(reducers)

createRoot(document.getElementById('root')).render(
  <StrictMode>
		<Provider store={store} >
			<NextUIProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</NextUIProvider>
		</Provider>
  </StrictMode>,
)
