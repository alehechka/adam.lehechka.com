import Navbar from '@components/Navbar';
import useThemeToggle from '@hooks/useThemeToggle';
import { lightTheme, darkTheme } from '@styles/global.style';
import Layout from '@styles/Layout';
import { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset};
  body {
	background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.colors.primary};
	transition: all 0.50s linear;
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
