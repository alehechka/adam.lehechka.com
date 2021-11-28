import { Job } from '@pages/about/jobs';
import Image from 'next/image';
import styles from './JobAccordion.module.css';
import { FaChevronRight } from 'react-icons/fa';

const Accordion = (job: Job) => {
	return (
		<details key={job.employer} className={styles.detailBox}>
			<summary className={styles.summaryBox}>
				<Image src={`/images/jobs/${job.logo}`} alt={job.employer} width={50} height={50} className={styles.logo} />
				{job.employer}
				<FaChevronRight size={20} className={styles.chevron} />
			</summary>
			<em className={styles.date}>
				{job.start} - {job.end}
			</em>
			<p>{job.longDescription}</p>
		</details>
	);
};

export default Accordion;
