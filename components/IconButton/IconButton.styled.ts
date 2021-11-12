import { motion } from 'framer-motion';
import styled from 'styled-components';

export interface StyledIconButtonProps {
	pending?: boolean;
}

const IconButton = styled(motion.button)<StyledIconButtonProps>`
	background-color: ${({ theme }) => theme.components.iconButton.background};
	color: ${({ theme }) => theme.components.iconButton.color};
	border: none;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 10px;

	cursor: pointer;
	border-radius: 50%;

	&:hover,
	:focus {
		background-color: ${({ theme }) => theme.components.iconButton.hover};
		outline: none;
	}

	&:disabled {
		background-color: ${({ theme }) => theme.components.iconButton.disabled};
		cursor: ${({ pending }) => (pending ? 'progress' : 'not-allowed')};
	}
`;

export default IconButton;
