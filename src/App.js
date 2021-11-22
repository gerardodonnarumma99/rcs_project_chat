import { RecoilRoot } from 'recoil';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0088cc',
      light: '#5cb8ff',
      dark: '#005b9b'
    },
    secondary: {
      main: '#d5e7f6',
      light: '#ffffff',
      dark: '#a3b5c3'
    },
    success: {
      main: '#4caf50'
    }
  },
  typography: {
    fontFamily: "'Ubuntu', sans-serif",
    fontSize: 14,
    h3: {
      fontWeight: 700,
      fontSize: '2.2rem'
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem'
    },
    h5: {
      fontWeight: 500
    },
    h6: {
      fontWeight: 500
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme} >
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
