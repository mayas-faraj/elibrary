import React from 'react';
import Link from 'next/link';
import Glimmer from './glimmer';
import siteUrls from '/public/siteUrls.json';
import style from '/style/articles-component.module.scss';

const Articles = ({ articles }) => {
	return (
		<div className={style["articles"]}>
			<h2 className={style["articles__title"]}>il diplomatico, lo scrittore, il saggista</h2>
			<div className={style["articles-items"]}>
				{articles == null && <Glimmer />}
				{articles != null && articles.length === 0 && <p className={style["articles-noitems"]}>gli articoli arriveranno presto</p>}
				{articles != null && articles.map(article => (
					<div key={article.attributes.titolo} className={style["articles-item"]}>
						<Link href={"/article/" + article.attributes.slug}>
							<a><img src={siteUrls.siteUrl + article.attributes?.immagine?.data?.attributes?.url} className={style["articles-item__image"]} alt={"Claudio Pacifico article, " + article.attributes.titolo} /></a>
						</Link>

						<h3 className={style["articles-item__title"]}>
							<Link href={"/article/" + article.attributes.slug}>
								<a className={style["articles-item__link"]}>
									{article.attributes.titolo.replaceAll("\\n", "\n")}
								</a>
							</Link>
						</h3>
					</div>
				))}
			</div>
		</div>
	);
}

export default Articles;
