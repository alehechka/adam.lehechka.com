import Date from '@components/Date';
import { getAllContentIds, getContentData } from '@lib/contents';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { IoLogoMedium, IoLogoGithub } from 'react-icons/io5';
import { IconLink } from '@components/Link';

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
				<HeadingXl>{contentData.title}</HeadingXl>
				<LightText>
					<Date dateString={contentData.date} />
					{contentData.medium && (
						<IconLink href={contentData.medium}>
							<IoLogoMedium size={20} />
						</IconLink>
					)}
					{contentData.github && (
						<IconLink href={contentData.github}>
							<IoLogoGithub size={20} />
						</IconLink>
					)}
				</LightText>
				<div dangerouslySetInnerHTML={{ __html: contentData.contentHtml }} />
			</article>
		</div>
	);
};

export const HeadingXl = styled.h1`
	font-size: 2rem;
	line-height: 1.3;
	font-weight: 800;
	letter-spacing: -0.05rem;
	margin: 1rem 0;
`;

export const LightText = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
	color: #666;
`;

export default Article;
