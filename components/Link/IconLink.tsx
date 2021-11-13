import Link, { LinkProps } from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
	color: ${({ theme }) => theme.text};

	padding-top: 6px;

	&:hover {
		cursor: pointer;
	}
`;

const IconLink: FC<LinkProps> = ({ children, ...otherProps }) => {
	return (
		<Link {...otherProps} passHref>
			<StyledLink>{children}</StyledLink>
		</Link>
	);
};

export default IconLink;
