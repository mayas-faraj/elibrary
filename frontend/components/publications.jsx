import React, { Fragment } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import siteUrls from '../public/siteUrls.json';
import Glimmer from './glimmer';
import style from '/style/publication.module.scss';
import 'swiper/css/pagination';

const categories = ["libri", "saggi", "prefazioni", "recensioni"];

const Publications = ({ books, essays, activeCategoryIndex }) => {
	const [activeIndex, setActiveIndex] = React.useState(-1);
	const [categoryIndex, setCategoryIndex] = React.useState(activeCategoryIndex);

	React.useEffect(() => {
		setCategoryIndex(activeCategoryIndex);
	}, [activeCategoryIndex])

	return (
		<div className={style["publications"]}>
			<div className={style["publications-header"]}>
				<div className={style["publications-top"]}>
					<div key={activeIndex} className={style["publications-top__desc"]}>
						{(activeIndex < 0 || books.length === 0) && "si prega di spostare il mouse sul libro per leggere la prefazione"}
						{(activeIndex >= 0) && (
							(categories[categoryIndex] === "libri") && (
								<Fragment>
									<h4 className={style["publications-top__book-title"]}>{books[activeIndex].attributes.titolo}</h4>
									<p className={style["publications-top__book-preface"]}>{books[activeIndex].attributes.breve}</p>
								</Fragment>
							) || (categories[categoryIndex] === "saggi") && (
								<h4 className={style["publications-top__book-title"] + " " + style["publications-top__book-title--prewrap"]}>{essays[activeIndex].attributes.breve}</h4>
							)
						)}
					</div>
					{
						categories[categoryIndex] === "libri" && (
							<p className={style["publications-top__mark"]}>
								Libri, Memorie, Opere narrative,<br />
								Libri fotografici
								<br />
								<span className={style["publications-top__mark-white"]}>
									Alcuni libri dell’Ambasciatore<br />
									sono stati tradotti anche <br />
									in altre lingue
								</span>
							</p>

						)}
					{
						categories[categoryIndex] === "saggi" && (
							<p className={style["publications-top__mark"]}>
								Saggi di politica internazionale e Articoli<br />
								<span className={style["publications-top__mark-white"]}>
									Testi di Lezioni di Master, Interviste
								</span>
							</p>

						)}
				</div>
				<h2 className={style["publications-header__title"]}>{categories != null && categories[categoryIndex] != null && categories[categoryIndex]}</h2>
			</div>
			<div className={style["publications-content"]}>
				{(books == null && essays == null) && <Glimmer />}
				<Slider key={categories[categoryIndex]} items={categories[categoryIndex] === "libri" ? books : categories[categoryIndex] === "saggi" ? essays : undefined} type={categories[categoryIndex]} activeIndex={activeIndex} onActiveItemChanged={index => setActiveIndex(index)} />
				<div className={style["publications-categories"]}>
					{
						categories.map((category, index) => (
							<a key={category} className={style["publications-category"] + " " + (index === categoryIndex ? style["publications-category__active"] : "")} href="#!" onClick={() => setCategoryIndex(index)}>{category}</a>
						))
					}
				</div>
			</div>
		</div>
	);
}

const Slider = ({ type, activeIndex, items, onActiveItemChanged }) => {
	const pageAudio = null;

	React.useEffect(() => {
		pageAudio = new Audio('/assets/sounds/page.mp3');
	}, []);

	const bookHoverEventHandler = index => {
		if (onActiveItemChanged != null) onActiveItemChanged(index);
		try {
			if (pageAudio != null) {
				pageAudio.currentTime = 0;
				pageAudio.play();
			}
		}
		catch (ex) {
			console.log("audio error: ", ex);
		}
	};

	return (
		items != null && (
			<Swiper modules={[Pagination]} spaceBetween={15} loop={false} centerInsufficientSlides={true} grabCursor={true} loopFillGroupWithBlank={true} loopedSlides={5 - items.length % 5} initialSlide={items.length - 1} pagination={{ clickable: true }} breakpoints={{ 100: { slidesPerView: 1, slidesPerGroup: 1 }, 550: { slidesPerView: 2, slidesPerGroup: 2 }, 700: { slidesPerView: 3, slidesPerGroup: 3 }, 900: { slidesPerView: 4, slidesPerGroup: 4 }, 1100: { slidesPerView: 5, slidesPerGroup: 5 } }}>
				{items.length === 0 && <p className={style["publications-noitems"]}>gli articoli arriveranno presto</p>}
				{items.length > 0 && items.map((item, index) => (
					<SwiperSlide key={item.attributes.slug}>
						<Link href={"/" + type + "/" + item.attributes.slug}>
							<a onMouseEnter={() => bookHoverEventHandler(index)} className={style["publications-item"] + (index === activeIndex ? " " + style["publications-item--active"] : "")} >
								<p className={style["publications-item__content"] + (item.attributes.immagine?.data?.attributes?.url == null ? " " + style["publications-item__content--full-height"] : "") + " " + (/[ا-ي]/.test(item.attributes.titolo) ? style["publications-item__content--arabic"] : "")}>
									{item.attributes.titolo}
								</p>
								{
									item.attributes.immagine?.data?.attributes?.url && <img src={siteUrls.siteUrl + item.attributes.immagine.data.attributes.url} className={style["publications-item__image"]} alt={item.attributes.titolo} />
								}
								<h3 className={style["publications-item__title"]}>{(item.attributes.mese ? parseInt(item.attributes.mese) + "/" : "") + item.attributes.anno}</h3>
							</a>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		)
	);
}

export default Publications;
