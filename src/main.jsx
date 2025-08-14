import { BrowserRouter } from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import './index.css'

console.log(`
##   ##    ####    ##  ##  ##  #####
##   ##   ##  ##   ##  ##  ##  ## 
## # ##   ##  ##   ##  ##  ##  ####
#  #  #   ##  ##    #  #   ##  ##  
#     #    ####      ##    ##  #####
  `);


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter basename="/"> 
        <App />
      </BrowserRouter>
  </StrictMode>,
)
