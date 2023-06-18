import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { CountProvider } from './Context/CountContext'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='802254813565-8il0cldpmu6butm3ouq0jadvm78onjog.apps.googleusercontent.com'>
    <React.StrictMode>
      <CountProvider>
        <App />
      </CountProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
)
