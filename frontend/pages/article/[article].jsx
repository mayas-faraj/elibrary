import React, {Fragment} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Glimmer from '/components/glimmer';
import Seperator from "/public/assets/imgs/seperator.svg";
import Footer from '/components/footer';
import siteUrls from '/public/siteUrls.json';
import { articlesData, articleData } from '../../libs/fetch-data';
import style from '/style/article.module.scss';


const ArticlePage = ({ article }) => {
	return (
		<Fragment>
		{article==null && <Glimmer/>}
		{article!==null && (
			<Fragment>
				{article!=null && (
					<Head>
						<title>{article.attributes.titolo + " | Claudio Pacifico letture"}</title>
						<meta property="og:title" content={article.attributes.titolo + " | Claudio Pacifico letture"}/>
						<meta name="description" content={article.attributes.breve.replaceAll("\n", "")}/>
						<meta property="og:description" content={article.attributes.breve.replaceAll("\n", "")}/>
						{article.attributes?.immagine?.data?.attributes?.url && <meta property="og:image" content={siteUrls.siteUrl + article.attributes.immagine.data.attributes.url} />}
					</Head>
				)}
				<header className={style["article-header"]}>
					<Link href="/article">
						<a className={style["article-header__menu"]}>
						Episodi, ricordi e analisi,<br/>
						scritti dall’Ambasciatore d’Italia<br/>
						Claudio Pacifico
						</a>
					</Link>
					<Link href="/article">
						<a><Seperator className={style["article-seperator"] + " section-seperator"} /></a>
					</Link>
				</header>
				<div className={style["article-content"]}>
					<div className={style["article-container"]}>
						<img className={style["article__feature-image"]} src={siteUrls.siteUrl + article.attributes?.immagine?.data?.attributes?.url}/>
						<h1 className={style["article__type"]}>{article.attributes.tipa}</h1>
						<p className={style["article__excerpt"]}>{article.attributes.breve}</p>
						<p className={style["article__content"]}>{article.attributes.contenuto}</p>
					</div>
				</div>
				<Footer/>
			</Fragment>
		)}
		</Fragment>
	);
};

export const getStaticPaths = async () => {
	const result = await articlesData();
	return {
		"fallback": "blocking",
		"paths":  result.data?.articles?.data?.map(article=>({"params": {"article": article.attributes.slug}}))
	};
}

export const getStaticProps = async (context) => {
	const result = await articleData(context.params.article);
	return {
		props: {
			article: result.data?.articles?.data[0]
		}
	};
};

export default ArticlePage;
