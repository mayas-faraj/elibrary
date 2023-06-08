import Link from 'next/link';
import DownloadIcon from '/public/assets/imgs/download.svg';
import style from '/style/languageswitcher.module.scss';

export default function LanguageSwitcher({pageLinkIt, downloadLinkIt, pageLinkEn, downloadLinkEn, pageLinkFr, downloadLinkFr }) {
	const languages=[
		{"name": "it", "title": "Italiana", "pageLink": pageLinkIt, "downloadLink": downloadLinkIt},
		{"name": "en", "title": "English", "pageLink": pageLinkEn, "downloadLink": downloadLinkEn},
		{"name": "fr", "title": "française", "pageLink": pageLinkFr, "downloadLink": downloadLinkFr}
	];

	return (
		<div className={style["switcher"]}>
		{  
			languages.map(language=>(
				<div key={language.name} className={style["switcher-container"]}>
					<Link href={language.pageLink}>
						<a className={style["switcher-container__link"]}>
							<img className={style["switcher-container__flag"]} src={`/assets/imgs/flag-${language.name}.gif`} alt={language.title+" flag"}/>
						</a>
					</Link>
					<a className={style["switcher-container__link"]} href={language.downloadLink} download>
						<DownloadIcon />
					</a>

				</div>
			))
		}
		</div>
	);
}
