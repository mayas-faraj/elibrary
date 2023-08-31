import React, { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { pdfjs, Document, Page } from 'react-pdf';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Glimmer from '/components/glimmer';
import Footer from '/components/footer';
import transparentImage from '/public/assets/imgs/transparent.png';
import textImage from '/public/assets/imgs/text.png';
import Seperator from "/public/assets/imgs/seperator.svg";
import ShareIcon from '/public/assets/imgs/share.svg';
import FullScreenIcon from '/public/assets/imgs/full-screen.svg';
import FacebookButtonIcon from '/public/assets/imgs/social-facebook.svg';
import TwitterButtonIcon from '/public/assets/imgs/social-twitter.svg';
import { bookData, booksData } from '../../libs/fetch-data';
import LinkedinButtonIcon from '/public/assets/imgs/social-linkedin.svg';
import siteUrls from '/public/siteUrls.json';
import style from '/style/book.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const BookPage = ({ book, books, revisions }) => {
	const router = useRouter();
	const slug = router.query.book;
	const [bookPageNumber, setBookPageNumber] = React.useState(1);
	const [bookPagesCount, setBookPagesCount] = React.useState(null);
	const [revisionPageNumber, setRevisionPageNumber] = React.useState(1);
	const [revisionPagesCount, setRevisionPagesCount] = React.useState(null);
	const [bookModal, setBookModal] = React.useState(false);
	const [revisionModal, setRevisionModal] = React.useState(false);
	const [pageOffset, setPageOffset] = React.useState(0);

	const listRef = React.useRef();
	const itemRef = React.useRef();

	const bookLoadEventHandler = ({ numPages }) => setBookPagesCount(numPages);
	const revisionLoadEventHandler = ({ numPages }) => setRevisionPagesCount(numPages);

	return (
		<Fragment key={slug}>
			{book != null && (
				<Head>
					<title>{book.attributes.titolo + " | Claudio Pacifico libri"}</title>
					<meta name="title" property="og:title" content={book.attributes.titolo + " | Claudio Pacifico libri"} />
					<meta name="description" content={book.attributes.breve} />
					<meta name="description" property="og:description" content={book.attributes.breve} />
					{book.attributes?.immagine?.data?.attributes?.url != null && <meta name="image" property="og:image" content={siteUrls.siteUrl + book.attributes.immagine.data.attributes.url} />}
				</Head>
			)}
			<header className={style["book-header"]}>
				<Link href="/#library">
					<a className={style["book-header__menu"]}>
						Libri e Pubblicazioni  dell’Ambasciatore d’Italia.<br />
						Storia e cultura dei Paesi arabi e asiatici,<br />
						luoghi in cui ha vissuto a lungo.
					</a>
				</Link>
				<Link href="/#library"><a>
					<Seperator viewBox="0 0 331 34" className={style["book-seperator"] + " section-seperator"} />
				</a></Link>
			</header>
			{
				book == null && <Glimmer />
			}
			{
				book != null && (
					<div className={style["book"] + " book-page"}>
						<div className={style["book-review"]}>
							{
								(books != null && books.length > 0) && (
									<div className={style["book-list"]} ref={listRef}>
										<div className={style["book-list-wrapper"]}>
											{
												books.filter(book => book.attributes?.immagine?.data?.attributes?.url != null).map(book => (
													<Link key={book.attributes.slug} href={"/libri/" + book.attributes.slug} title={book.attributes.titolo} ref={book.attributes.slug === slug ? itemRef : null}>
														<a className={style["book-item"]}>
															<img src={siteUrls.siteUrl + book.attributes.immagine.data.attributes.url} className={style["book-item__image"]} alt={book.attributes.titolo} />
														</a>
													</Link>
												))
											}
										</div>
									</div>
								)
							}
							<div className={style["book-info"]}>
								<img className={style["book-info__img"]} src={book.attributes?.immagine?.data?.attributes?.url != null ? siteUrls.siteUrl + book.attributes.immagine.data.attributes.url : transparentImage.src} alt={book.attributes.titolo} />
								<div className={style["book-info-contentiner"]}>
									<h1 className={style["book-info__title"]}>{book.attributes.titolo}</h1>
									{book.attributes.autore && <div className={style["book-info__meta"]}>editore: {book.attributes.autore}</div>}
									{book.attributes.citta && <div className={style["book-info__meta"]}>luogo: {book.attributes.citta}</div>}
									{book.attributes.anno && <div className={style["book-info__meta"]}>anno: {(book.attributes.mese != null && book.attributes.mese >= 0) && ["Gennaio", "febbraio", "Marzo", "aprile", "Maggio", "Giugno", "Luglio", "agosto", "settembre", "ottobre", "novembre", "Dicembre"][book.attributes.mese - 1]}, {book.attributes.anno}</div>}

									{book.attributes.lingua && <div className={style["book-info__meta"]}>lingua: {book.attributes.lingua}</div>}
									{book.attributes.serie && <div className={style["book-info__meta"]}>collana: {book.attributes.serie}</div>}
									{(book.attributes.contano_le_pagine != null && book.attributes.contano_le_pagine !== "0") && <div className={style["book-info__meta"]}>numero di pagine: {book.attributes.contano_le_pagine}</div>}
									{book.attributes.commento && <div className={style["book-info__meta"]}>{book.attributes.commento.replaceAll("\\n", "\n")}</div>}
									{book.attributes.formato && <div className={style["book-info__meta"]}>formato: {book.attributes.formato}</div>}
									{book.attributes.isbn && <div className={style["book-info__meta"]}>ISBN: {book.attributes.isbn}</div>}
									{book.attributes.acquistare && <div className={style["book-info__meta"] + " " + style["book-info__buy-button"]}><a href={book.attributes.acquistare} target="_blank">ottieni</a></div>}
									<div className={style["book-info-share"]}>
										<ShareIcon className={style["book-info-share__icon"]} />
										<ul className={style["book-info-share-list"]}>
											<li className={style["book-info-share-item"]}>
												<a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://claudiopacificoambassador.com/libri/${book.attributes.slug}`} target="_blank" rel="nofollow">
													<LinkedinButtonIcon />
												</a>
											</li>
											<li className={style["book-info-share-item"]}>
												<a href={`https://facebook.com/sharer/sharer.php?u=https://claudiopacificoambassador.com/libri/${book.attributes.slug}`} target="_blank" rel="nofollow">
													<FacebookButtonIcon />
												</a>
											</li>
											<li className={style["book-info-share-item"]}>
												<a href={`https://twitter.com/intent/tweet/?url=https://claudiopacificoambassador.com/libri/${book.attributes.slug}`} target="_blank" rel="nofollow">
													<TwitterButtonIcon />
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className={style["book-content"]}>
								<p className={style["book-content__text"]}>{book.attributes.contenuto || "il contenuto sarà disponibile il prima possibile"}</p>
							</div>
						</div>
						{
							book.attributes?.file?.data?.attributes?.url != null && (
								<div className={style["book-browse-basic"]}>
									<div className={style["book-browse__pdf"]}>
										{
											<a className={style["book-link"]} href={siteUrls.siteUrl + book.attributes.file.data.attributes.url} target="_blank">
												<Document file={siteUrls.siteUrl + book.attributes.file.data.attributes.url} onLoadSuccess={bookLoadEventHandler} loading="Caricamento della pagina in corso..." className={style["book-browse__pdf-single"]}>
													<Page width={3000} pageNumber={bookPageNumber} />
												</Document>
											</a>
										}
									</div>
									<p className={style["book-browse__text"]}>{book.attributes.intestazione}</p>
									<Dialog open={bookModal} onClose0={() => setBookModal(false)} maxWidth={"lg"} fullWidth={true}>
										<DialogContent>
											<a href={siteUrls.siteUrl + book.attributes.file.data.attributes.url} className={style["book-browse__fullscreen-link"]} target="_blank">
												<FullScreenIcon />
											</a>
											<iframe className={style["book-browse__iframe"]} src={siteUrls.siteUrl + book.attributes.file.data.attributes.url} />
										</DialogContent>
									</Dialog>
								</div>
							)}
						{
							revisions && revisions.map(revision => (
								<div className={style["book-browse-revision"]}>
									<div className={style["book-browse__pdf"]}>
										{
											(revision.attributes?.file?.data?.attributes?.url != null && revision.attributes.file.data.attributes.url.endsWith(".pdf")) &&
											<a className={style["book-link"]} href={siteUrls.siteUrl + revision.attributes.file.data.attributes.url} target="_blank">
												<Document file={siteUrls.siteUrl + revision.attributes.file.data.attributes.url} onLoadSuccess={revisionLoadEventHandler} loading="Caricamento della pagina in corso..." className={style["book-browse__pdf-single"]}>
													<Page width={3000} pageNumber={revisionPageNumber} />
												</Document>
											</a>
										}
										{
											(revision.attributes?.file?.data?.attributes?.url != null && !revision.attributes.file.data.attributes.url.endsWith(".pdf")) &&
											<a href={revision.attributes.collegamentoweb} target="_blank" className={style["book-image-link"]}>
												<img src={siteUrls.siteUrl + revision.attributes.file.data.attributes.url} alt={book.title} className={style["book-image"] + " fixed-height"} />
											</a>
										}
									</div>
									<p className={style["book-browse__text"]}>{revision.attributes.intestazione?.replaceAll("\\n", "\n")}</p>
									<Dialog open={revisionModal} onClose0={() => setRevisionModal(false)} maxWidth={"lg"} fullWidth={true}>
										<DialogContent>
											<a href={siteUrls.siteUrl + revision.attributes.file.data.attributes.url} className={style["book-browse__fullscreen-link"]} target="_blank">
												<FullScreenIcon />
											</a>
											<iframe className={style["book-browse__iframe"]} src={siteUrls.siteUrl + revision.attributes.file.data.attributes.url} />
										</DialogContent>
									</Dialog>

								</div>
							))
						}
					</div>
				)}
			<Footer />
		</Fragment>
	);
}

export const getStaticPaths = async () => {
	const result = await booksData();
	return {
		fallback: "blocking",
		paths: result.data.books.data.map(book => ({ params: { book: book.attributes.slug } }))
	};
}

export const getStaticProps = async (context) => {
	const bookResult = await bookData(context.params.book);
	const booksResult = await booksData();

	return {
		props: {
			book: bookResult.data.books.data[0],
			books: booksResult.data.books.data,
			revisions: bookResult.data.revisions.data
		}
	};
};

export default BookPage;

