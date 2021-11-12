import { FC } from 'react';
import styled from 'styled-components';

const AppWrapper = styled.main`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;
`;

const Wrapper = styled.div`
	max-width: 800px;
	width: 100%;
	height: 100%;
`;

const Layout: FC = ({ children }) => {
	return (
		<AppWrapper>
			<Wrapper>{children}</Wrapper>
		</AppWrapper>
	);
};

export default Layout;
