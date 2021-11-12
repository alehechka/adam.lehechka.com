import styled from 'styled-components';
import { FontFamilyMixin, Theme } from '@styles/global.style';

const Title = styled.h1`
	${FontFamilyMixin};
	font-size: 50px;
	color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
	font-weight: bold;
`;

export default Title;
