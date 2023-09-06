import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import siteUrls from '/public/siteUrls.json';
import Seperator from "/public/assets/imgs/seperator.svg";
import headerImage from '/public/assets/imgs/header-articles.png';
import Footer from "/components/footer";
import { articlesData } from "../../libs/fetch-data";
import style from '/style/articles.module.scss';

const ArticlesPage = ({ articles }) => {
	return (
		<React.Fragment>
			<Head>
				<title>Claudio Pacifico | Letture</title>
				<meta property="og:title" content="Claudio Pacifico - Letture" />
				<meta name="description" content="Episodi, ricordi e analisi,scritti dall’ambasciatore d’italia, claudio pacifico"/>
				<meta property="og:description" content="Episodi, ricordi e analisi,scritti dall’ambasciatore d’italia, claudio pacifico"/>
				<meta property="og:image" content={siteUrls.frontendUrl + "/assets/imgs/header-articles.png"} />
			</Head>
			<header className={style["articles-header"]}>
				<div className={style["articles-header__image-container"]}>
					<Link href="/#letture"><a>
						<img className={style["articles-header__image"]} src={headerImage.src} alt="Claudio Pacifico in newspaper"/>
						<Seperator className={style["articles-seperator"]+" section-seperator"} />
					</a></Link>
				</div>
				<h1 className={style["articles-header__title"]}>LETTURE</h1>
				<p className={style["articles-header__paragraph"]}>
					episodi, ricordi e analisi<br/>
					scritti dall’Ambasciatore d’Italia<br/> 
					Claudio Pacifico
				</p>
			</header>
			<div className={style["articles-content"]}>
				<div className={style["articles-container"]}>
					<div className={style["articles"]}>
					{
						articles != null && articles.map(article=>(
							<div key={article.attributes.slug} className={style["articles-item"]}>
								<Link href={"/article/"+article.attributes.slug}>
									<a><img className={style["articles-item__image"]} src={siteUrls.siteUrl + article.attributes?.immagine?.data?.attributes?.url} alt={article.attributes.breve}/></a>
								</Link>
								<strong className={style["articles-item__type"]}>{article.attributes.tipe}</strong>
								<Link href={"/article/"+article.attributes.slug}>
									<a className={style["articles-item__name"]}>{article.attributes.titolo + "\n..."}</a>
								</Link>
							</div>
						))
					} 
					</div>
				</div>
			</div>
			<Footer/>
		</React.Fragment>
	);
};

export const getStaticProps = async () => {
	const result = await articlesData();
	return {
		props: {
			articles: result.data?.articles?.data
		}
	}
};

export default ArticlesPage;

