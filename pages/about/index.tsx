import { JobAccordion } from '@components/Accordion';
import jobs from 'content/about/jobs';

const About = () => {
	return (
		<>
			<h1>About</h1>
			<h2>Professional Experience</h2>
			<div>
				{jobs.map((job, index) => (
					<JobAccordion key={index} {...job} />
				))}
			</div>
		</>
	);
};

export default About;
