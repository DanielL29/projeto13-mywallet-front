import { UserProvider } from '../contexts/UserContext';
import { GlobalStyle } from './global/GlobalStyle';
import Router from './Router';

export default function App() {
  return (
    <UserProvider>
      <GlobalStyle />
      <Router />
    </UserProvider>
  )
}
