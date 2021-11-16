import fs from 'fs';
import path from 'path';
import matter, { GrayMatterFile } from 'gray-matter';

export type ContentFolders = 'articles' | 'notes';

const contentDirectory = (folder: ContentFolders) => path.join(process.cwd(), `content/${folder}`);

export type Metadata = GrayMatterFile<string> & {
	id: string;
	date: string;
	title: string;
	medium?: string;
	github?: string;
	content?: string;
};

export function getSortedContentData(folder: ContentFolders) {
	// Get file names under /content/<folder>
	const fileNames = fs.readdirSync(contentDirectory(folder));
	const allContentData = fileNames.map((fileName) => {
		// Remove ".md" from file name to get id
		const id = fileName.replace(/\.md$/, '');

		// Read markdown file as string
		const fullPath = path.join(contentDirectory(folder), fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		// Use gray-matter to parse the content metadata section
		const matterResult = matter(fileContents);

		// Combine the data with the id
		return {
			id,
			...matterResult.data,
		} as Metadata;
	});
	// Sort contents by date
	return allContentData.sort(({ date: a }, { date: b }) => {
		if (a < b) {
			return 1;
		} else if (a > b) {
			return -1;
		} else {
			return 0;
		}
	});
}

export function getAllContentIds(folder: ContentFolders) {
	const fileNames = fs.readdirSync(contentDirectory(folder));

	// Returns an array that looks like this:
	// [
	//   {
	//     params: {
	//       id: 'ssg-ssr'
	//     }
	//   },
	//   {
	//     params: {
	//       id: 'pre-rendering'
	//     }
	//   }
	// ]
	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ''),
			},
		};
	});
}

export async function getContentData(folder: ContentFolders, id: string) {
	const fullPath = path.join(contentDirectory(folder), `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	// Use gray-matter to parse the content metadata section
	const matterResult = matter(fileContents);

	// Combine the data with the id and contentHtml
	return {
		id,
		content: matterResult.content,
		...matterResult.data,
	} as Metadata;
}
