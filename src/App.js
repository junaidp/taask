import { BrowserRouter } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
import './App.css';
import { ThemeProvider } from '@mui/material';
import { mainTheme } from './theme';


// ----------------------------------------------------------------------

export default function App() {
  return (
    // <HelmetProvider>

      <BrowserRouter >
          <ThemeProvider theme={mainTheme}>
            <Router />
          </ThemeProvider>
      </BrowserRouter>
    // </HelmetProvider>
  );
}
