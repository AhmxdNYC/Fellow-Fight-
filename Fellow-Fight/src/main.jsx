import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CanvasWidthProvider } from './CanvasContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CanvasWidthProvider>
        <App />
    </CanvasWidthProvider>
  </React.StrictMode>
)
