import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import './globals.css';
import Provider from './Provider';

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next Dashboard',
  description: 'Dashboard Application for managing your graphs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${quicksand.variable} antialiased bg-gray-100 dark:bg-neutral-800 dark:text-white`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
