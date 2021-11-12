import { css, DefaultTheme } from 'styled-components';

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

export const lightTheme: DefaultTheme = {
	body: '#FFF',
	text: '#363537',
	components: {
		iconButton: {
			background: '#FCFCFC',
			hover: '#CFCFCF',
			color: '#363537',
			disabled: '#FFF',
		},
	},
	...theme,
} as const;

export const darkTheme: DefaultTheme = {
	body: '#363537',
	text: '#FFF',
	components: {
		iconButton: {
			background: '#353436',
			hover: '#616161',
			color: '#FFF',
			disabled: '#2D2C2E',
		},
	},
	...theme,
} as const;

export type Theme = typeof lightTheme | typeof darkTheme;

export type ThemeObjectProps = { theme: Theme };
