import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import NavBar from '../components/NavBar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: "ref5BmVNZwb7rNahf192"
      }}
    >
      <NavBar />
      <Component {...pageProps} />
    </FpjsProvider>
  )
}

export default MyApp
