import styled from 'styled-components';
import { FontFamilyMixin } from '@styles/global.style';

const Text = styled.p`
	${FontFamilyMixin};
	color: ${({ theme }) => theme.text};
`;

export default Text;
