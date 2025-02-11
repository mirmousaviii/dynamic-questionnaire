import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold">Dynamic Questionnaire</h1>
        </Link>
        <nav>
          <Link href="/" className="px-3 py-2 hover:underline">
            Questionnaires List
          </Link>
        </nav>
      </div>
    </header>
  );
}
