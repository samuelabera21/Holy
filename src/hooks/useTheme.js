import { useEffect, useState } from "react";

const getInitialTheme = () => {
	if (typeof window === "undefined") return "dark";
	const stored = window.localStorage.getItem("theme");
	if (stored === "light" || stored === "dark") return stored;
	const prefersLight = window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: light)").matches;
	return prefersLight ? "light" : "dark";
};

function useTheme() {
	const [theme, setTheme] = useState(getInitialTheme);

	useEffect(() => {
		if (typeof document === "undefined") return;
		const root = document.documentElement;
		root.classList.remove("theme-light", "theme-dark");
		root.classList.add(`theme-${theme}`);
		window.localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((current) => (current === "dark" ? "light" : "dark"));
	};

	return { theme, toggleTheme };
}

export default useTheme;
