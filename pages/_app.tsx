import 'water.css/out/water.min.css';
import 'highlight.js/styles/night-owl.css';
import type { AppProps } from 'next/app';
import styles from '@styles/App.module.css';
import Navbar from '@components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className={styles.app}>
			<Navbar />
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
