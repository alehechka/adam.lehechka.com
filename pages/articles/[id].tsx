import Date from '@components/Date';
import { getAllContentIds, getContentData } from '@lib/contents';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { IoLogoMedium, IoLogoGithub } from 'react-icons/io5';
import markdownToReact from '@lib/markdownToReact';
import styles from './Article.module.css';
import IconLink from '@components/IconLink';

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
	return (
		<div>
			<Head>
				<title>{contentData.title}</title>
			</Head>
			<article>
				<h1>{contentData.title}</h1>
				<div className={styles.dateRow}>
					<Date dateString={contentData.date} />
					{contentData.medium && (
						<IconLink href={contentData.medium} passHref>
							<IoLogoMedium size={20} />
						</IconLink>
					)}
					{contentData.github && (
						<IconLink href={contentData.github} passHref>
							<IoLogoGithub size={20} />
						</IconLink>
					)}
				</div>
				{markdownToReact(contentData.content)}
			</article>
		</div>
	);
};

export default Article;
