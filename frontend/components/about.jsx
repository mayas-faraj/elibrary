import React, {Fragment} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import LanguageSwitcher from '/components/language-switcher';
import Footer from '/components/footer';
import Seperator from "/public/assets/imgs/seperator.svg";
import funeralImg from '/public/assets/imgs/claudio-pacifico-libya.jpg';
import siteUrls from '/public/siteUrls.json';
import style from '/style/about.module.scss';

const About = ({ sections, pdfs }) => {
	return (
		<Fragment>
			<Head>
				<title>Claudio Pacifico | Biografia</title>
				<meta property="og:title" content="Claudio Pacifico - Biografia" />
				<meta name="description" content="ambasciatore Claudio Pacifico, diplomatico di carriera, scrittore, saggista, docente universitario"/>
				<meta property="og:description" content="Ambasciatore Claudio Pacifico, diplomatico di carriera, scrittore, saggista, docente universitario"/>
				<meta property="og:image" content={siteUrls.frontendUrl + "/assets/imgs/claudio-pacifico-libya.jpg"} />
			</Head>
			<header className={style["about-header"]}>
				<div className={style["about-header__image-container"]}>
					<Link href="/#biografia"><a>
						<img className={style["about-header__image"]} src={funeralImg.src} alt="Claudio Pacifico on libya"/>
						<Seperator viewBox="0 0 331 34" className={style["about-seperator"]+" section-seperator"} />
					</a></Link>
				</div>
				<LanguageSwitcher 
					pageLinkIt="/about-it" downloadLinkIt={siteUrls.siteUrl + pdfs.attributes.italiana.data.attributes.url}
					pageLinkEn="/about-en" downloadLinkEn={siteUrls.siteUrl + pdfs.attributes.inglese.data.attributes.url}
					pageLinkFr="/about-fr" downloadLinkFr={siteUrls.siteUrl + pdfs.attributes.francese.data.attributes.url}
				/>
				<h1 className={style["about-header__title"]}>Biografia</h1>
				<p className={style["about-header__text"]}>
				Ambasciatore claudio pacifico.<br/>
				Diplomatico di carriera, scrittore, saggista, docente universitario.
				</p>
			</header>
			<div className={style["about-container"]}>
				<nav className={style["about-header__nav"]}>
					<ul>
					{
						sections && sections.filter(section=>section.attributes.titolo_del_frammento!="").map(section=><li key={section.attributes.slug} className={style["about-header-nav__item"]}><a href={"#"+section.attributes.slug}>{section.attributes.titolo_del_frammento}</a></li>)
					}
					</ul>
				</nav>
				{
					sections && sections.map(section=>(
						<div key={section.attributes.slug} id={section.attributes.slug} className={style["about-section"]+" "+section.attributes.slug}>
							<div className={style["about-section__image-container"]}>
							{
								section.attributes?.immagine?.data?.length > 0 && <img className={style["about-section__image"]} src={siteUrls.siteUrl + section.attributes.immagine.data[0].attributes.url}/>
							}
							</div>
							<div className={style["about-section__text-container"]}>
								{section.attributes.titolo && <h2 className={style["about-section__title"]}>{section.attributes.titolo}</h2>}
								{section.attributes.titolo_secondario && <h2 className={style["about-section__title"]}><small>{section.attributes.titolo_secondario}</small></h2>}
								{section.attributes.contenuto && <p className={style["about-section__text"]} dangerouslySetInnerHTML={{__html: section.attributes.contenuto}}></p>}
							</div>
						</div>
					))
				}
			</div>
			<Footer />
		</Fragment>
	);
};

export default About;
