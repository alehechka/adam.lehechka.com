import styled from 'styled-components';
import NextLink, { LinkProps } from 'next/link';
import { FC } from 'react';
import { FontFamilyMixin } from '@styles/global.style';

const StyledLink = styled.a`
	${FontFamilyMixin}
	color: ${({ theme }) => theme.colors.primary};

	&:hover {
		cursor: pointer;
		color: ${({ theme }) => theme.colors.secondary};
	}
`;

const Link: FC<LinkProps> = ({ children, ...otherProps }) => {
	return (
		<NextLink {...otherProps}>
			<StyledLink>{children}</StyledLink>
		</NextLink>
	);
};

export default Link;
