import React, {Fragment} from 'react';
import { aboutSectionsData } from '../libs/fetch-data';
import About from '../components/about';

const AboutPage = ({ sections, pdfs }) => {
	return (
		<About sections={sections} pdfs={pdfs}/>
	);
};

export const getStaticProps = async () => {
	const result = await aboutSectionsData("fr");
	return {
		props: {
			sections: result.data.sections.data,
			pdfs: result.data.pdf.data
		}
	}
};

export default AboutPage;
