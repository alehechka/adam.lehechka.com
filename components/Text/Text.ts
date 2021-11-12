import styled from 'styled-components';
import { FontFamilyMixin, Theme } from '@styles/global.style';

const Text = styled.p`
	${FontFamilyMixin};
	color: ${({ theme }: { theme: Theme }) => theme.text};
`;

export default Text;