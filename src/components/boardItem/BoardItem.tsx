import { useMemo, useState } from "react";
import { ReactComponent as Plus } from "../../assets/icons/plusRound.svg";
import { ReactComponent as Change } from "../../assets/icons/pencil.svg";
import { ReactComponent as Delete } from "../../assets/icons/cross.svg";
import { ReactComponent as Done } from "../../assets/icons/done.svg";

import styles from "./BoardItem.module.scss";

interface Item {
	id: number;
	title: string;
	subitems: Item[];
}

interface BoardItemProps {
	item: Item;
	onDeleteItem: (itemId: number) => void;
	onEditItem: (itemId: number, newTitle: string) => void;
	onAddSubItem: (itemId: number, newSubItem: Item) => void;
	bgColorProps?: string;
}

export const BoardItem: React.FC<BoardItemProps> = ({
	item,
	onDeleteItem,
	onEditItem,
	onAddSubItem,
	bgColorProps,
}) => {
	const [newItemTitle, setNewItemTitle] = useState("");
	const [step, setStep] = useState(1);
	const [isDisabled, setIsDisabled] = useState(false);

const handleItemTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewItemTitle(event.target.value);
	};

const handleAddSubItem = () => {
		const newSubItem: Item = {
			id: Date.now(),
			title: "New SubItem",
			subitems: [],
		};
		onAddSubItem(item.id, newSubItem);
	};

	const handleDeleteItem = () => {
		onDeleteItem(item.id);
	};

	const handleEditItem = () => {
		onEditItem(item.id, newItemTitle);
	};

	const handleConfirmItem = () => {
		handleEditItem();
		setStep(2);
		setIsDisabled(true);
	};

	function generateRandomColor() {
		const red = Math.floor(Math.random() * 256);
		const green = Math.floor(Math.random() * 256);
		const blue = Math.floor(Math.random() * 256);

		const color = `rgba(${red}, ${green}, ${blue}, 0.4)`;

		return color;
	}

	const bgColor = useMemo(() => generateRandomColor(), []);

	return (
		<div className={styles.boardItem}>
			{step === 1 && (
				<>
					<input
						type="text"
						value={newItemTitle}
						onChange={handleItemTitleChange}
						placeholder="Category name"
						autoFocus
					/>
					<button onClick={handleDeleteItem}>
						<Delete className={styles.cancelSvg} />
					</button>
					<button onClick={handleConfirmItem}>
						<Done className={styles.doneSvg} />
					</button>
				</>
			)}

			{step === 2 && (
				<>
					<input
						style={{
							backgroundColor: `${
								isDisabled ? bgColorProps : "#ffffff"
							}`,
						}}
						type="text"
						value={newItemTitle}
						onChange={handleItemTitleChange}
						disabled={isDisabled}
					/>
					<button onClick={handleAddSubItem}>
						<Plus />
					</button>

					{isDisabled ? (
						<button onClick={() => setIsDisabled(false)}>
							<Change />
						</button>
					) : (
						<button
							onClick={() => {
								handleEditItem();
								setIsDisabled(true);
							}}
						>
							<Done className={styles.doneSvg} />
						</button>
					)}

					<button onClick={handleDeleteItem}>
						<Delete className={styles.deleteSvg} />
					</button>
				</>
			)}

			{item.subitems.length > 0 && (
				<div className={styles.subitemsWrapper}>
					{item.subitems.map((subitem) => (
						<BoardItem
							bgColorProps={bgColor}
							key={subitem.id}
							item={subitem}
							onDeleteItem={onDeleteItem}
							onEditItem={onEditItem}
							onAddSubItem={onAddSubItem}
						/>
					))}
				</div>
			)}
		</div>
	);
};
