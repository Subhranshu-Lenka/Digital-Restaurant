import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google';


// const CLIENT_ID = "792659374495-phli3tvhq3icgi5rvoeq21nq4k34pqgm.apps.googleusercontent.com"
const CLIENT_ID = "792659374495-phli3tvhq3icgi5rvoeq21nq4k34pqgm.apps.googleusercontent.com"
//                 792659374495-phli3tvhq3icgi5rvoeq21nq4k34pqgm.apps.googleusercontent.com

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
