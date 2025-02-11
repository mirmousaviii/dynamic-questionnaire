export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 w-full">
      <p>
        © {new Date().getFullYear()} Dynamic Questionnaire. All rights
        reserved.
      </p>
    </footer>
  );
}

