import {Fragment} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Footer from '/components/footer';
import Seperator from "/public/assets/imgs/seperator.svg";
import funeralImg from '/public/assets/imgs/claudio-pacifico-libya.jpg';
import siteUrls from '/public/siteUrls.json';
import style from '/style/about.module.scss';
import { honorSectionData } from '../libs/fetch-data';

const HonorPage = ({ info }) => {
	return (
		<Fragment>
			<Head>
				<title>Claudio Pacifico | Biografia</title>
				<meta property="og:title" content="Claudio Pacifico - Biografia" />
				<meta name="description" content="Ambasciatore Claudio Pacifico, diplomatico di carriea, scrittore, saggista, docente universitario"/>
				<meta property="og:description" content="Ambasciatore Claudio Pacifico, diplomatico di carriea, scrittore, saggista, docente universitario"/>
				<meta property="og:image" content={siteUrls.siteUrl + "/assets/imgs/claudio-pacifico-libya.jpg"} />
			</Head>
			<header className={style["about-header"]}>
				<div className={style["about-header__image-container"]}>
					<Link href="/"><a>
						<img className={style["about-header__image"]} src={funeralImg.src} alt="Claudio Pacifico on libya"/>
						<Seperator viewBox="0 0 331 34" className={style["about-seperator"]+ " " + "section-seperator"} />
					</a></Link>
				</div>
				<h1 className={style["about-header__title"]}>Onorificenze</h1>
				<p className={style["about-header__text"]}>
					{info.attributes.titolo}<br/>
					{info.attributes.titolo_secondario}<br/>
				</p>
			</header>
			<div className={style["about-container"]}>
				<div id="onorificenze" className={style["about-section"]}>
					<div className={style["about-section__text-container"]}>
						<figure className={style["about-section-image__container"]}>
							<img src="/assets/imgs/medals.png" className={style["about-section-image__img"]}/>
						</figure>
						<br/>
						<p className={style["about-section__text"]+" "+style["about-section__text--centric"]+" "+style["about-section__text--large"]+" "+style["about-section__text--narrow"]} dangerouslySetInnerHTML={{"__html": info.attributes.contenuto}} />
					</div>
				</div>
			</div>
			<Footer />
		</Fragment>
	);
}

export const getStaticProps = async () => {
	const result = await honorSectionData(); 
	return {
		props: {
			info: result.data.sections.data[0]
		}
	};
};

export default HonorPage;