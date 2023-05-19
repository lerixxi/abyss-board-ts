import React, { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "../header/Header";
import { Board } from "../board/Board";

interface Position {
	x: number;
	y: number;
}

export const DraggableDiv: React.FC = () => {
	const divRef = useRef<HTMLDivElement | null>(null);

	const [scale, setScale] = useState<number>(1);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
	const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

	useEffect(() => {
		handleCentered();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleCentered = useCallback(() => {
		if (divRef.current) {
			const rect = divRef.current.getBoundingClientRect();
			setPosition({
				x: window.innerWidth / 2 - rect.width / 2,
				y: window.innerHeight / 2 - rect.height / 2,
			});
		}
	}, []);

	const handleMouseDown = useCallback((event: React.MouseEvent) => {
		if (divRef.current) {
			const rect = divRef.current.getBoundingClientRect();
			const offsetX = event.clientX - rect.left;
			const offsetY = event.clientY - rect.top;
			setDragOffset({ x: offsetX, y: offsetY });
			setIsDragging(true);
		}
	}, []);

	const handleMouseMove = useCallback(
	(event: React.MouseEvent<HTMLDivElement>) => {
		if (isDragging) {
			requestAnimationFrame(() => {
				let newPositionY = event.clientY - dragOffset.y;

				const headerHeight = 70;

				newPositionY =
					newPositionY > headerHeight
						? newPositionY
						: headerHeight;
				setPosition({
					x: event.clientX - dragOffset.x,
					y: newPositionY,
				});
			});
		}
	},
	[isDragging, dragOffset]
);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	return (
		<div style={{ width: "100%" }}>
			<Header
				handleCentered={handleCentered}
				setScale={setScale}
				scale={scale}
			/>
			<div
				ref={divRef}
				style={{
					position: "absolute",
					top: position.y,
					left: position.x,
					transform: `scale(${scale})`,
					cursor: isDragging ? "grabbing" : "grab",
				}}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
			>
				<Board />
			</div>
		</div>
	);
};
