import "./globals.css";

export const metadata = {
	title: "Next Blog",
	description: "My personal blog"
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`h-screen`}>
				{children}
			</body>
		</html>
	);
}
