import { Job } from 'content/about/job';

const jobs: Job[] = [
	{
		employer: 'DMSi',
		companyURL: 'https://www.dmsi.com/',
		start: 'January 2020',
		end: 'Current',
		title: 'Software Engineer',
		logo: 'wedge.png',
		description:
			"As part of the Web/Mobile team, we are working on a multi-year, major application conversion. We're taking a Windows-based application and moving to a microservices-based, single-page application.",
		projects: [
			{
				name: 'Kubernetes Architecture Migration',
				start: 'November 2021',
				end: 'Current',
				responsibilities: [],
				skills: ['Kubernetes', 'Docker', 'GitHub Actions', 'Google Cloud Platform', 'Google Kubernetes Engine'],
			},
			{
				name: 'Door Configurator',
				start: 'May 2020',
				end: 'November 2021',
				responsibilities: [
					'Leading team of software engineers in development of a door configuration and image generation web application.',
					'Performing DevOps to create a CI/CD pipeline to build, test, and deploy multiple applications.',
					'Designed and developed spreadsheet parser to extract Bill of Material data from Excel files.',
				],
				skills: ['Go', 'React', 'TypeScript', 'CircleCI', 'Docker'],
			},
			{
				name: 'Building Materials Industry Standard Database',
				start: 'April 2020',
				end: 'May 2020',
				responsibilities: [
					'Researched various database solutions for the best option to pursue in the creation of a building materials industry standard database.',
				],
				skills: ['PostgreSQL', 'MongoDB', 'Firestore'],
			},
			{
				name: 'Workpoint Integration',
				start: 'January 2020',
				end: 'April 2020',
				responsibilities: [
					"Researched the codebase and infrastructure of Workpoint's workflow software to discover integration points in plans to integrate the software into DMSi's core products.",
				],
				skills: ['React', 'JavaScript', 'Express'],
			},
		],
	},
	{
		employer: 'Union Pacific',
		companyURL: 'https://www.up.com/',
		start: 'November 2018',
		end: 'December 2019',
		title: 'Software Development Intern',
		logo: 'up.png',
		description: '',
		projects: [
			{
				name: 'Real Estate Management System',
				start: 'September 2019',
				end: 'December 2019',
				responsibilities: [
					'Assumed a tech lead role for redesigning a legal document generation system.',
					'Helped to transition legacy system into a modern web application.',
				],
			},
			{
				name: 'Revenue Shipment Process',
				start: 'November 2018',
				end: 'August 2019',
				responsibilities: [
					'Developed 10+ backend microservices utilizing Java, Springboot, and Eclipse.',
					'Responsible for deployment of services to Integrated Cloud Environment.',
					'Designed and developed a highly interactive frontend screen.',
				],
				skills: ['Java', 'Springboot', 'Angular', 'Eclipse'],
			},
		],
	},
	{
		employer: 'Northrop Grumman',
		companyURL: 'https://www.northropgrumman.com/',
		start: 'November 2017',
		end: 'October 2018',
		title: 'College Technical Intern',
		logo: 'ng.png',
		description: '',
	},
];

export default jobs;
