type ThemeToggleProps = {
	themeToggler: VoidFunction;
};

const ThemeToggle = ({ themeToggler }: ThemeToggleProps) => {
	return <button onClick={themeToggler}>Switch Theme</button>;
};

export default ThemeToggle;
