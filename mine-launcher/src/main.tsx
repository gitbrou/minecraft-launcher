import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ensurePlatformBridge } from './platform/platformBridge'

  // На Android подменяем electronAPI заглушкой
ensurePlatformBridge()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
