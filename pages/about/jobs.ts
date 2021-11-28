export type Job = {
	employer: string;
	start: string;
	end: string;
	title: string;
	logo: string;
	shortDescription?: string;
	longDescription?: string;
	projects?: unknown[];
	skills?: string[];
};

const jobs: Job[] = [
	{
		employer: 'DMSi',
		start: 'January 2020',
		end: 'Current',
		title: 'Software Engineer',
		logo: 'wedge.png',
		shortDescription: 'idk, might not include this?',
		longDescription:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad tempora rerum quisquam pariatur, voluptatum facere eos aut quas doloribus culpa! Dolor dolores fuga repudiandae quo magni autem quasi adipisci modi.',
		projects: [''],
	},
	{
		employer: 'Union Pacific',
		start: 'November 2019',
		end: 'January 2020',
		title: 'Software Engineer Intern',
		logo: 'up.png',
		longDescription:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad tempora rerum quisquam pariatur, voluptatum facere eos aut quas doloribus culpa! Dolor dolores fuga repudiandae quo magni autem quasi adipisci modi.',
	},
];

export default jobs;
