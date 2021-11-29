export type Project = {
	name: string;
	start: string;
	end: string;
	responsibilities: string[];
	skills?: string[];
};

export type Job = {
	employer: string;
	companyURL: string;
	start: string;
	end: string;
	title: string;
	logo: string;
	description?: string;
	projects?: Project[];
	skills?: string[];
};
