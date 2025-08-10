import { BrowserRouter } from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import './index.css'




// CONTEXT
import { SearchProvider } from "./contexts/SearchContext.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SearchProvider>
  </StrictMode>,
)
