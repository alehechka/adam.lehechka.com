import { Job } from './types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './JobAccordion.module.css';
import { FaChevronRight } from 'react-icons/fa';
import useMediaQuery from '@hooks/useMediaQuery';

const Accordion = (job: Job) => {
	const isLarge = useMediaQuery('(min-width: 700px)');

	return (
		<details key={job.employer}>
			<summary className={styles.jobSummaryBox}>
				<Link href={job.companyURL} passHref>
					<a>
						<Image src={`/images/jobs/${job.logo}`} alt={job.employer} width={50} height={50} className={styles.logo} />
					</a>
				</Link>
				{job.employer} - {job.title}
				<FaChevronRight size={20} className={`${styles.chevron} ${styles.moveRight}`} />
			</summary>
			<em className={styles.date}>
				{job.start} - {job.end}
			</em>
			<p>{job.description}</p>
			{job.projects?.map((project, index) => (
				<details key={index}>
					<summary className={styles.projectSummaryBox}>
						<FaChevronRight size={15} className={styles.chevron} />
						{project.name}{' '}
						{isLarge && (
							<em className={`${styles.date} ${styles.moveRight}`}>
								{project.start} - {project.end}
							</em>
						)}
					</summary>
					<ul>
						{project.responsibilities.map((responsibility, index) => (
							<li key={index}>{responsibility}</li>
						))}
					</ul>
					{project.skills && (
						<div className={styles.skillsWrapper}>
							{project.skills.map((skill, index) => (
								<span key={index} className={styles.skill}>
									{skill}
								</span>
							))}
						</div>
					)}
				</details>
			))}
		</details>
	);
};

export default Accordion;
