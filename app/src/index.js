import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import theme from './theme/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { AppProvider } from './context/appContext'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <ChakraProvider theme={theme}>
        <React.StrictMode>
            <AppProvider>
                <GoogleOAuthProvider clientId='527204857901-j09cfnmra64lfomgnf9fmj5mp87secv3.apps.googleusercontent.com'>
                    <App />
                </GoogleOAuthProvider>
            </AppProvider>
        </React.StrictMode>
    </ChakraProvider>
)
