import { useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

const useThemeToggle = () => {
	const [theme, setTheme] = useState<ThemeMode>('light');

	const setMode = (mode: ThemeMode) => {
		window.localStorage.setItem('theme', mode);
		setTheme(mode);
	};

	const themeToggler = () => {
		theme === 'light' ? setMode('dark') : setMode('light');
	};

	useEffect(() => {
		const localTheme = window.localStorage.getItem('theme') as ThemeMode;
		localTheme && setTheme(localTheme);
	}, []);

	return [theme, themeToggler] as const;
};

export default useThemeToggle;
