import styled from 'styled-components';
import { InferGetStaticPropsType, GetStaticProps } from 'next';
import { getSortedContentData, Metadata } from '@lib/contents';
import Date from '@components/Date';
import Link from '@components/Link';

export const getStaticProps: GetStaticProps = async () => {
	const allContentData = getSortedContentData('articles');
	return {
		props: {
			allContentData,
		},
	} as const;
};

const index = ({ allContentData }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<StyledSection as='section'>
			<Heading>Articles</Heading>
			<List>
				{allContentData.map(({ id, date, title }: Metadata) => (
					<ListItem key={id}>
						<Link href={`/articles/${id}`}>{title}</Link>
						<br />
						<LightText>
							<Date dateString={date} />
						</LightText>
					</ListItem>
				))}
			</List>
		</StyledSection>
	);
};

const StyledSection = styled.section`
	font-size: 1.2rem;
	line-height: 1.5;
`;

const Heading = styled.h2`
	font-size: 1.5rem;
	line-height: 1.4;
	margin: 1rem 0;
`;

export const List = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

export const ListItem = styled.li`
	margin: 0 0 1.25rem;
`;

export const LightText = styled.small`
	color: #666;
`;

export default index;
