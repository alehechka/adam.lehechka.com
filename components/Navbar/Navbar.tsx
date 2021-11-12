import ThemeToggle, { ThemeToggleProps } from '@components/ThemeToggle';
import Link from '@components/Link';
import styled from 'styled-components';

interface Props extends ThemeToggleProps {}

const Navbar = ({ theme, toggleTheme }: Props) => {
	return (
		<StyledNavbar>
			<Link href='/'>home</Link>
			<Link href='/about'>about</Link>
			<Link href='/notes'>notes</Link>
			<Link href='/articles'>articles</Link>
			<Link href='/projects'>projects</Link>
			<ThemeToggle theme={theme} toggleTheme={toggleTheme} />
		</StyledNavbar>
	);
};

const StyledNavbar = styled.header`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 15px 0;
	align-items: center;
`;

export default Navbar;
