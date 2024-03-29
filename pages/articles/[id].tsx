import { getAllContentIds, getContentData } from '@lib/contents';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Markdown from '@components/Markdown';

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getAllContentIds('articles');
	return {
		paths,
		fallback: false,
	} as const;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const contentData = await getContentData('articles', params?.id as string);
	return {
		props: {
			contentData,
		},
	} as const;
};

const Article = ({ contentData }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return <Markdown contentData={contentData} />;
};

export default Article;
