import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router'
import './style/index.css'
import AuthFrovider from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
    <AuthFrovider>
        <Router />
    </AuthFrovider>
</React.StrictMode>,
)