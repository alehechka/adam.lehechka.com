import { Metadata, ContentFolders } from '@lib/contents';
import styles from './ContentList.module.css';
import Date from '@components/Date';
import Link from 'next/link';

interface Props {
	allContentData: Metadata[];
	pathPrefix: ContentFolders;
	title: string;
}

const ContentList = ({ allContentData, pathPrefix, title }: Props) => {
	return (
		<section className={styles.listSection}>
			<h2 className={styles.heading}>{title}</h2>
			<ul className={styles.list}>
				{allContentData.map((contentData) => (
					<li key={contentData.id} className={styles.listItem}>
						<Link href={`/${pathPrefix}/${contentData.id}`}>{contentData.title}</Link>
						<br />
						<Date dateString={contentData.date} />
					</li>
				))}
			</ul>
		</section>
	);
};

export default ContentList;
