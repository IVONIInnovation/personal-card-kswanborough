import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk, Roboto_Mono } from 'next/font/google';
import './globals.css';

// Replace Inter with our fonts
const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plus-jakarta-sans',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-space-grotesk',
});

const robotoMono = Roboto_Mono({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'Rambla Map - PortalDiseño',
  description: 'PortalDiseño.es',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} ${robotoMono.variable} font-sans`}>
        {children}
        <footer className='flex items-center justify-center w-full h-24 border-t text-emerald-700 font-semibold'>
          <a
            className='flex items-center justify-center'
            href='https://artifactbin.com?utm_source=template-repo&utm_campaign=oss'
            target='_blank'
            rel='noopener noreferrer'
          >
          </a>
        </footer>
      </body>
    </html>
  );
}
