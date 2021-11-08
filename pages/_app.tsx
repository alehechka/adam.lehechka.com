import ThemeToggle from '@components/ThemeToggle';
import useThemeToggle from '@hooks/useThemeToggle';
import { ThemeObjectProps, lightTheme, darkTheme } from '@styles/global.style';
import { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle<ThemeObjectProps>`
  ${reset};
  body {
	background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.colors.primary};
	transition: all 0.50s linear;
  }
`;

const App = ({ Component, pageProps }: AppProps) => {
	const [theme, themeToggler] = useThemeToggle();
	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<GlobalStyles />
			<ThemeToggle themeToggler={themeToggler} />
			<Component {...pageProps} />
		</ThemeProvider>
	);
};

export default App;
