import React, { Fragment } from 'react';
import PulseImage from '/public/assets/imgs/pulse.svg';
import style from '/style/events.module.scss';

const Events = ({ events }) => {
	return (
		<div className={style["events"]}>
			<div className={style["event-wrapper"]}>
				{
					events == null && <p className={style["event-noitems"]}><PulseImage alt="loading.." /></p>
				}
				{
					events != null && (
						<Fragment>
							<div className={style["event-col"]}>
								{
									events.filter((event, index) => index < 20).map(event => (
										<div key={event.attributes.titolo + event.attributes.anno} className={style["event"]}>
											<span className={style["event__year"]}>{event.attributes.anno}: </span>
											<span className={style["event__title"]}>{event.attributes.titolo}</span>
										</div>
									))
								}
							</div>
							<div className={style["event-col"]}>
								{
									events.filter((event, index) => index >= 20).map(event => (
										<div key={event.attributes.titolo} className={style["event"]}>
											<span className={style["event__year"]}>{event.attributes.anno}: </span>
											<span className={style["event__title"]}>{event.attributes.titolo}</span>
										</div>
									))
								}
							</div>
						</Fragment>
					)
				}
			</div>
		</div>
	);
}

export default Events;
