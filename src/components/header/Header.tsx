import React, { useState } from "react";
import { ReactComponent as CenterLocation } from "../../assets/icons/locationArrow.svg";
import { ReactComponent as Minus } from "../../assets/icons/minusIcon.svg";
import { ReactComponent as Plus } from "../../assets/icons/plusIcon.svg";

import styles from "./Header.module.scss";

interface HeaderProps {
	handleCentered: () => void;
	setScale: (scale: number | ((prevScale: number) => number)) => void;
	scale: number;
}

export const Header: React.FC<HeaderProps> = ({ handleCentered, setScale, scale }) => {
	const [isShowZoomList, setIsShowZoomList] = useState(false);

	const handleZoomIn = () => {
		setScale((prevScale) => prevScale + 0.1);
	};

	const handleZoomOut = () => {
		setScale((prevScale) => (prevScale > 0.1 ? prevScale - 0.1 : 0.1));
	};

	return (
		<header>
			<div className={styles.services}>
				<a href="/">Services</a>
				<span className={styles.notification}>0</span>
			</div>
			<nav className={styles.nav}>
				<button id="list-view" className={styles.listView}>
					List view
				</button>

				<button
					id="center-btn"
					className={styles.centerBtn}
					onClick={handleCentered}
				>
					<CenterLocation />
				</button>

				<button
					id="zoom-out"
					className={styles.zoomOut}
					onClick={handleZoomOut}
				>
					<Minus />
				</button>
				<button
					className={styles.zoomSelect}
					onClick={() => setIsShowZoomList(!isShowZoomList)}
				>
					<span>{(scale * 100).toFixed()}%</span>
					{isShowZoomList && (
						<ul>
							<li onClick={() => setScale(0.25)}>25%</li>
							<li onClick={() => setScale(0.3)}>30%</li>
							<li onClick={() => setScale(0.4)}>40%</li>
							<li onClick={() => setScale(0.5)}>50%</li>
							<li onClick={() => setScale(0.6)}>60%</li>
							<li onClick={() => setScale(0.7)}>70%</li>
							<li onClick={() => setScale(0.9)}>80%</li>
							<li onClick={() => setScale(0.9)}>90%</li>
							<li onClick={() => setScale(1)}>100%</li>
							<li onClick={() => setScale(1.25)}>125%</li>
							<li onClick={() => setScale(1.5)}>150%</li>
							<li onClick={() => setScale(1.75)}>175%</li>
							<li onClick={() => setScale(2)}>200%</li>
						</ul>
					)}
				</button>
				<button
					id="zoom-in"
					className={styles.zoomIn}
					onClick={handleZoomIn}
				>
					<Plus />
				</button>
				<p className={styles.notificationBtn}>Go to center</p>
			</nav>
		</header>
	);
};
