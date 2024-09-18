import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/app/providers';
import { EdgeStoreProvider } from '@/lib/edgestore';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'App chọn quần áo của Mai Trang',
	description: 'Điệu nhất quả đất',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.className} dark text-foreground bg-background`}>
				<Providers>
					<main className='flex min-h-screen justify-center items-center p-2 lg:p-8'>
						<EdgeStoreProvider>{children}</EdgeStoreProvider>
					</main>
				</Providers>
			</body>
		</html>
	);
}
