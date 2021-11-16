import { InferGetStaticPropsType, GetStaticProps } from 'next';
import { getSortedContentData } from '@lib/contents';
import ContentList from '@components/ContentList';

export const getStaticProps: GetStaticProps = async () => {
	const allContentData = getSortedContentData('articles');
	return {
		props: {
			allContentData,
		},
	} as const;
};

const Articles = ({ allContentData }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return <ContentList allContentData={allContentData} pathPrefix='articles' title='Articles' />;
};

export default Articles;
