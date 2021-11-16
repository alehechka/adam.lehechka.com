import Date from '@components/Date';
import { Metadata } from '@lib/contents';
import Head from 'next/head';
import { IoLogoMedium, IoLogoGithub } from 'react-icons/io5';
import markdownToReact from '@lib/markdownToReact';
import styles from './Markdown.module.css';
import IconLink from '@components/IconLink';

interface Props {
	contentData: Metadata;
}

const Markdown = ({ contentData }: Props) => {
	return (
		<>
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
		</>
	);
};

export default Markdown;
