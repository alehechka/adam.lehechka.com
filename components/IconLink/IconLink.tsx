import Link, { LinkProps } from 'next/link';
import { FC } from 'react';
import styles from './IconLink.module.css';

const IconLink: FC<LinkProps> = ({ children, ...otherProps }) => {
	return (
		<Link {...otherProps}>
			<a className={styles.iconLink}>{children}</a>
		</Link>
	);
};

export default IconLink;
