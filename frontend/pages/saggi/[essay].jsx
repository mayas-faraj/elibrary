import React, { Fragment } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { pdfjs, Document, Page } from 'react-pdf';
import Glimmer from '/components/glimmer';
import Footer from '/components/footer';
import { essaysData, essaysSlugData } from '../../libs/fetch-data';
import siteUrls from '/public/siteUrls.json';
import Seperator from "/public/assets/imgs/seperator.svg";
import style from '/style/essay.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const EssayPage = ({ essays }) => {
	const router=useRouter();
	const slug=router.query.essay;
	const listRef = React.useRef();
	const itemRef = React.useRef();

	React.useEffect(() => {
		if (listRef.current && itemRef.current) listRef.current.scrollTop = itemRef.current.offsetTop;
	}, []);

	if (essays)
		for (let i = 0; i < essays.length; i++) {
			if (essays[i].attributes.slug && essays[i].attributes.slug === slug) {
				const currentEssay = essays.splice(i, 1);
				essays.unshift(currentEssay[0]);
			}
		}

	return (
		<Fragment>
			{
				(essays != null && essays.length > 0) && (
					<Head>
						<title>{essays[0].attributes.titolo + " | Claudio Pacifico Saggi"}</title>
						<meta property="og:title" content={essays[0].attributes.titolo + " | Claudio Pacifico Saggi"} />
						<meta name="description" content={essays[0].attributes.breve} />
						<meta property="og:description" content={essays[0].attributes.breve} />
						{essays[0].attributes?.immagine?.data?.attributes?.url != null && <meta property="og:image" content={siteUrls.siteUrl + essays[0].attributes.immagine.data.attributes.url} />}
					</Head>)
			}
			<header className={style["essay-header"]}>
				<Link href="/#saggi">
					<a className={style["essay-header__menu"]}>
						Saggi e articoli di politica estera
						<Seperator viewBox={"0 0 331 34"} className={style["essay-seperator"] + " section-seperator"} />
					</a>
				</Link>
			</header>
			{essays == null && <Glimmer />}
			<div className="essays">
				<div className={style["essays__title"]}>
					L’Ambasciatore Pacifico è altresì impegnato<br />
					in un’ampia attività di saggista.  articoli, saggi,<br />
					master universitari e interviste.
				</div>
				<div className={style["essays-list"]}>
					{
						essays != null && essays.map(essay => (
							<div key={essay.attributes.slug} className={style["essay-wrapper"]}>
								<div className={style["essay"]}>
									{
										essay.attributes?.file?.data?.attributes?.url != null && (
											<a className={style["essay-book__link"]} href={siteUrls.siteUrl + essay.attributes.file.data.attributes.url} target="_blank">
												<Document file={siteUrls.siteUrl + essay.attributes.file.data.attributes.url} loading="Caricamento della pagina in corso...">
													<Page width={3000} pageNumber={1} />
												</Document>
											</a>)
									}
									{
										essay.attributes?.file?.data?.attributes?.url == null && essay.attributes?.immagine?.data?.attributes?.url != null && (
											<a className={style["essay-book__link"]} href={essay.attributes?.file?.data?.attributes?.url ? siteUrls.siteUrl + essay.attributes.file.data.attributes.url : "#"} target="_blank">
												<img className={style["essay-book__image"]} src={siteUrls.siteUrl + essay.attributes.immagine.data.attributes.url} />
											</a>)
									}
								</div>
								<p className={style["essay-info"]}>
									<span className={style["essay-info__comment"]}>{essay.attributes.commento}</span><br />
									<span className={style["essay-info__title"]}>{essay.attributes.titolo_primario}</span>
									<span className={style["essay-info__meta"]}>{essay.attributes.nome_del_libro ? essay.attributes.nome_del_libro?.replaceAll("\\n", "\n") : ""}{essay.attributes.citta ? essay.attributes.citta + ", " : ""}{essay.attributes.giorno != null && essay.attributes.giorno} {(essay.attributes.mese != null && essay.attributes.mese > 0) && ["Gennaio", "febbraio", "Marzo", "aprile", "Maggio", "Giugno", "Luglio", "agosto", "settembre", "ottobre", "novembre", "Dicembre"][essay.attributes.mese - 1] + " "}{essay.attributes.anno}</span>
								</p>
							</div>
						))}
				</div>
			</div>
			<Footer />
		</Fragment>
	);
}

export const getStaticPaths = async () => {
	const result = await essaysSlugData();
	return {
		fallback: "blocking",
		paths: result.data.essays.data.map(essay => ({ params: { essay: essay.attributes.slug } }))
	};
}

export const getStaticProps = async () => {
	const result = await essaysData();
	return {
		props: {
			essays: result.data.essays.data.reverse()
		}
	};
};

export default EssayPage;

