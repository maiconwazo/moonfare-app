import styles from './page.module.css';
import { Righteous } from 'next/font/google';

const titleFont = Righteous({ weight: '400', subsets: [] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.container}>
      <header className={`${styles.header} ${titleFont.className}`}>
        Imaginary
      </header>
      {children}
      {/* <footer className={styles.footer}>Powered by maiconwazo</footer> */}
    </main>
  );
}
