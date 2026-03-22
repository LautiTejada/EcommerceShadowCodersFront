import { HelmetProvider } from "react-helmet-async";
import React from "react";

export const HelmetContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <HelmetProvider>{children}</HelmetProvider>;
};
