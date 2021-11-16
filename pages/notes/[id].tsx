import { getAllContentIds, getContentData } from '@lib/contents';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Markdown from '@components/Markdown';

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getAllContentIds('notes');
	return {
		paths,
		fallback: false,
	} as const;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const contentData = await getContentData('notes', params?.id as string);
	return {
		props: {
			contentData,
		},
	} as const;
};

const Note = ({ contentData }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return <Markdown contentData={contentData} />;
};

export default Note;
