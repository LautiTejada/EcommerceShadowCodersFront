import type { ReactNode } from "react";
import styles from "./AdminLayout.module.css";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface AdminLayoutProps {
	children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
	return (
		<div className={styles.layout}>
			<Sidebar />
			<main className={styles.mainContent}>
				<TopBar />
				<div className={styles.content}>{children}</div>
			</main>
		</div>
	);
};

export default AdminLayout;
