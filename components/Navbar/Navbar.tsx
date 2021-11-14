import Link from 'next/link';
import styles from './Navbar.module.css';

interface Props {}

const Navbar = (props: Props) => {
	return (
		<header className={styles.navbar}>
			<Link href='/'>home</Link>
			<Link href='/about'>about</Link>
			<Link href='/notes'>notes</Link>
			<Link href='/articles'>articles</Link>
			<Link href='/projects'>projects</Link>
		</header>
	);
};

export default Navbar;
