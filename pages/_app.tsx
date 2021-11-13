import Navbar from '@components/Navbar';
import useThemeToggle from '@hooks/useThemeToggle';
import { lightTheme, darkTheme } from '@styles/global.style';
import Layout from '@styles/Layout';
import { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
      Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.6;
    font-size: 18px;
	background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
	transition: all 0.50s linear;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: #0070f3;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;

const App = ({ Component, pageProps }: AppProps) => {
	const [theme, toggleTheme] = useThemeToggle();
	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<GlobalStyles />
			<Layout>
				<Navbar theme={theme} toggleTheme={toggleTheme} />
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
};

export default App;
