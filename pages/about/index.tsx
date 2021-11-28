import { JobAccordion } from '@components/Accordion';
import jobs from './jobs';

const About = () => {
	return (
		<>
			<h1>About</h1>
			{jobs.map((job, index) => (
				<JobAccordion key={index} {...job} />
			))}
		</>
	);
};

export default About;
