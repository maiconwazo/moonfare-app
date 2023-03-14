import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Link href={'/onboarding'}>Onboarding</Link>
    </main>
  );
}
