import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { unified } from 'unified';
import markdown from 'remark-parse';
import slug from 'rehype-slug';
import gfm from 'remark-gfm';
import remark2rehype from 'remark-rehype';
import highlight from 'rehype-highlight';
import rehype2react from 'rehype-react';

// Alternative HTML renderers using Next.js components
const renderers = {
	link: Link,
	image: Image,
};

const processor = unified()
	// parse Markdown to `mdast`
	.use(markdown)
	// enable Github Markdown flavour
	.use(gfm)
	// parse `mdast` to HTML
	.use(remark2rehype)
	// enable IDs for headings
	.use(slug)
	// syntax highlighting with `lowlight`
	.use(highlight)
	// parse HTML to JSX
	.use(rehype2react, {
		// define createElement (React), Fragment (React) and alternative renderers for images and links
		createElement: React.createElement,
		Fragment: React.Fragment,
		components: renderers as any,
	});

function markdownToReact(src: string) {
	// converting Markdown to JSX
	// using synchronous processing for client/browser usage, see [id].tsx
	return processor.processSync(src).result;
}

export default markdownToReact;
