import { ThemeMode } from '@hooks/useThemeToggle';
import IconButton from '@components/IconButton';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

export interface ThemeToggleProps {
	theme: ThemeMode;
	toggleTheme: VoidFunction;
}

const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {
	return (
		<IconButton onClick={toggleTheme}>
			{theme === 'light' ? <BsFillSunFill size={20} /> : <BsFillMoonFill size={20} />}
		</IconButton>
	);
};

export default ThemeToggle;
