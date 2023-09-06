import React, { Fragment } from "react";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import { Gallery, Item } from "react-photoswipe-gallery";
import Glimmer from "/components/glimmer";
import Seperator from "/public/assets/imgs/seperator.svg";
import Footer from "/components/footer";
import "photoswipe/dist/photoswipe.css";
import siteUrls from '/public/siteUrls.json';
import style from "/style/diplomaticreport.module.scss";
import { countriesSectionData } from "../libs/fetch-data";

const DiplomaticReport = ({countries}) => {

	const [fixed, setFixed]=React.useState(false);
	const [mounted, setMounted]=React.useState(false);

	React.useEffect(()=>{
		window.addEventListener("scroll", contentScrollHandler, {passive: true});
		setMounted(true);
		return ()=>window.removeEventListener("scroll", contentScrollHandler);
	}, []);

	function contentScrollHandler() {
		setFixed(document.documentElement.scrollTop>=300);
	}

	return (
		<Fragment>
			<Head>
				<title>Claudio Pacifico | Repertorio Diplomatico</title>
				<meta property="og:title" content="Claudio Pacifico - Repertorio Diplomatico" />
				<meta property="og:image" content={siteUrls.frontendUrl + "/assets/imgs/claudio-pacifico-with-arafat.jpg"} />
				<meta property="og:description" content="Ambasciatore Claudio Pacifico, diplomatico di carriea, scrittore, saggista, docente universitario"/>
			</Head>
			{ mounted && (
			<Fragment>
				<header className={style["diplomatic-report-header"]}>
					<Link
						href="/#diplomacy"
					>
						<a className={style["diplomatic-report-header__menu"]}>
						L’Ambasciatore d’Italia Claudio Pacifico
						</a>
					</Link>
					<Link href="/#diplomacy">
						<a><Seperator viewBox="0 0 331 34" className={style["diplomatic-report-seperator"]+" section-seperator"} /></a>
					</Link>
				</header>
				<div className={style["diplomatic-report-header__wrapper"]}>
					<h1 className={style["diplomatic-report-header__title"]}>
						Repertorio
						<br />
						Diplomatico
					</h1>
				</div>
				<div className={style["diplomatic-report-countries"] + " " + (fixed?style["fixed"]:"")}>
					<ul className={style["diplomatic-report-countries-list"]}>
						{countries.map((country, index)=><li key={country.attributes.slug} className={style["diplomatic-report-countries__item"]}><a href={index>0?"#"+country.attributes.slug:"#__next"}>{"#"+country.attributes.titolo_del_frammento}</a></li>)}
					</ul>
				</div>
				<div className={style["diplomatic-report-content"]}>
				{ countries.map(country=>(
					<Fragment key={country.attributes.slug}>
						<div id={country.attributes.slug} className={style["diplomatic-report-container"]}>
							<h2 className={style["report__title"]}><span className={style["report__pretitle"]}>in </span>{country.attributes.titolo}</h2>
							<div className={style["report__subtitle"]}>{country.attributes.titolo_secondario}</div>
							<h3 className={style["report__header-text"]}></h3>
							<p className={style["diplomatic-report__content"]}>{country.attributes.contenuto}</p>
							<div dangerouslySetInnerHTML={{__html: country.attributes.pie_di_pagina}} className={style["report__tail-text"]}/>
						</div>
						<div className={style["diplomatic-report-gallery"]}>
							<Gallery withCaption options={{"showHideAnimationType": "none"}}>
							{
								country.attributes.immagine?.data != null && country.attributes.immagine.data.map(image=>(
								<div key={image.attributes.url} className={style["diplomatic-report-item"]}>
									<Item
										caption={image.attributes.caption}
										original={siteUrls.siteUrl + image.attributes.url}
										thumbnail={siteUrls.siteUrl + image.attributes.url}
										width={"100vw"}
										height={"100vh"}
									>
									{
										({ref, open})=><img ref={ref} className={style["diplomatic-report-item__image"]} onClick={open} src={siteUrls.siteUrl + image.attributes.url.replace("/"+country.attributes.titolo.toLowerCase(), "/thumbnails/"+country.attributes.titolo.toLowerCase())}/> 
									}
									</Item>
									<strong className={style["diplomatic-report-item__title"]}>{image.attributes.caption}</strong>
								</div>
							))}
							</Gallery>
						</div>
					</Fragment>)
				)}
				</div>
				<Footer />
			</Fragment>
			)}
		</Fragment>
	);
}

export const getStaticProps = async () => {
	const countries = await countriesSectionData();

	return {
		props: {
			countries: countries.data.sections.data 
		}
	};
};

export default DiplomaticReport;
