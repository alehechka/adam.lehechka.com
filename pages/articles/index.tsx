import { InferGetStaticPropsType, GetStaticProps } from 'next';
import { getSortedContentData, Metadata } from '@lib/contents';
import Date from '@components/Date';
import Link from 'next/link';
import styles from './Article.module.css';

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
		<section className={styles.listSection}>
			<h2 className={styles.heading}>Articles</h2>
			<ul className={styles.list}>
				{allContentData.map(({ id, date, title }: Metadata) => (
					<li key={id} className={styles.listItem}>
						<Link href={`/articles/${id}`}>{title}</Link>
						<br />
						<Date dateString={date} />
					</li>
				))}
			</ul>
		</section>
	);
};

export default index;
