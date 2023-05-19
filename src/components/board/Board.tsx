import { useState } from "react";
import { BoardItem } from "../boardItem/BoardItem";
import { ReactComponent as Plus } from "../../assets/icons/plusRound.svg";

import styles from "./Board.module.scss";


interface Item {
	id: number;
	title: string;
	subitems: Item[];
}

export const Board = () => {
	const [items, setItems] = useState<Item[]>([]);

	const handleAddItem = () => {
		setItems([
			...items,
			{ id: Date.now(), title: "New Item", subitems: [] },
		]);
	};

	const handleDeleteItem = (itemId: number) => {
	const deleteItem = (items: Item[]): Item[] => {
		return items.filter((item) => {
			if (item.id === itemId) {
				return false;
			}
			if (item.subitems.length > 0) {
				item.subitems = deleteItem(item.subitems);
			}
			return true;
		});
	};

	const updatedItems = deleteItem([...items]);
	setItems(updatedItems);
};

	const handleEditItem = (itemId: number, newTitle: string) => {
	const editItem = (items: Item[]): Item[] => {
		return items.map((item) => {
			if (item.id === itemId) {
				return { ...item, title: newTitle };
			}
			if (item.subitems.length > 0) {
				item.subitems = editItem(item.subitems);
			}
			return item;
		});
	};

	const updatedItems = editItem([...items]);
	setItems(updatedItems);
};
const handleAddSubItem = (itemId: number, newSubItem: Item) => {
	const updateItems = (items: Item[]): Item[] => {
		return items.map((item) => {
			if (item.id === itemId) {
				return {
					...item,
					subitems: [...item.subitems, newSubItem],
				};
			} else if (item.subitems.length > 0) {
				return { ...item, subitems: updateItems(item.subitems) };
			}
			return item;
		});
	};

	const updatedItems = updateItems([...items]);
	setItems(updatedItems);
};

	return (
		<div>
			<div className={styles.boardList}>
				<div className={styles.boardListBox}>
					<p>Categories</p>
					<button onClick={handleAddItem}>
						<Plus />
					</button>
				</div>
				<div className={styles.boardListBox}>
					{items.map((item) => (
						<BoardItem
							key={item.id}
							item={item}
							onDeleteItem={handleDeleteItem}
							onEditItem={handleEditItem}
							onAddSubItem={handleAddSubItem}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
