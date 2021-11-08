import { css } from 'styled-components';

export const FontFamilyMixin = css`
	font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
		Helvetica Neue, sans-serif;
`;

export const ORANGE = '#FF6700';
export const BLACK = '#2E282A';
export const SILVER = '#BFC0C0';
export const LIGHT_BLUE = '#3A6EA5';
export const DARK_BLUE = '#004E98';
export const CYAN = '#ADEEE3';

export const theme = {
	colors: {
		primary: LIGHT_BLUE,
		secondary: ORANGE,
		ternary: DARK_BLUE,
		dark: BLACK,
		light: SILVER,
	},
} as const;

export const lightTheme = {
	body: '#FFF',
	...theme,
} as const;

export const darkTheme = {
	body: '#363537',
	...theme,
} as const;

export type Theme = typeof lightTheme | typeof darkTheme;

export type ThemeObjectProps = { theme: Theme };
