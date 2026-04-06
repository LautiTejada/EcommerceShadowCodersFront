import React from "react";
import styles from "./MenuAdmin.module.css";

// Icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import StorageIcon from "@mui/icons-material/Storage";
import DiscountIcon from "@mui/icons-material/Discount";
import CategoryIcon from "@mui/icons-material/Category";

interface MenuItem {
	label: string;
	id: string;
	icon: React.ComponentType<any>;
}

interface MenuSection {
	section: string;
	items: MenuItem[];
}

interface MenuAdminProps {
	activeView?: string;
	onViewChange?: (viewId: string) => void;
}

const MenuAdmin: React.FC<MenuAdminProps> = ({
	activeView = "home",
	onViewChange = () => {},
}) => {
	const menuSections: MenuSection[] = [
		{
			section: "PRODUCTOS",
			items: [
				{
					label: "Agregar",
					id: "add-product",
					icon: AddIcon,
				},
				{
					label: "Modificar",
					id: "edit-product",
					icon: EditIcon,
				},
				{
					label: "Stock",
					id: "stock-product",
					icon: StorageIcon,
				},
			],
		},
		{
			section: "DESCUENTOS",
			items: [
				{
					label: "Agregar",
					id: "add-discount",
					icon: AddIcon,
				},
				{
					label: "Lista",
					id: "list-discounts",
					icon: DiscountIcon,
				},
			],
		},
		{
			section: "TIPOS/CATEGORÍAS",
			items: [
				{
					label: "Agregar",
					id: "add-type-category",
					icon: AddIcon,
				},
				{
					label: "Lista",
					id: "list-type-category",
					icon: CategoryIcon,
				},
			],
		},
	];

	return (
		<nav className={styles.menu}>
			{menuSections.map((section) => (
				<div key={section.section} className={styles.menuSection}>
					<div className={styles.menuTitle}>{section.section}</div>
					{section.items.map((item) => {
						const Icon = item.icon;
						const active = activeView === item.id;
						return (
							<div
								key={item.id}
								className={styles.menuItemLink}
								onClick={() => onViewChange(item.id)}>
								<div
									className={`${styles.menuItem} ${
										active ? styles.active : ""
									}`}>
									<Icon className={styles.icon} />
									<span>{item.label}</span>
								</div>
							</div>
						);
					})}
				</div>
			))}
		</nav>
	);
};

export default MenuAdmin;
