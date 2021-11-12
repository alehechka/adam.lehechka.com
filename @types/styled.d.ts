// styled.d.ts
import 'styled-components';
interface IComponent {
	background: string;
	hover: string;
	color: string;
	disabled: string;
}
interface IColors {
	primary: string;
	secondary: string;
	ternary: string;
	dark: string;
	light: string;
}
declare module 'styled-components' {
	export interface DefaultTheme {
		body: string;
		text: string;
		components: {
			iconButton: IComponent;
		};
		colors: IColors;
	}
}
