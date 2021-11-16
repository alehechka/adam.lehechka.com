import { InferGetStaticPropsType, GetStaticProps } from 'next';
import { getSortedContentData } from '@lib/contents';
import ContentList from '@components/ContentList';

export const getStaticProps: GetStaticProps = async () => {
	const allContentData = getSortedContentData('notes');
	return {
		props: {
			allContentData,
		},
	} as const;
};

const Notes = ({ allContentData }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return <ContentList allContentData={allContentData} pathPrefix='notes' title='Notes' />;
};

export default Notes;
