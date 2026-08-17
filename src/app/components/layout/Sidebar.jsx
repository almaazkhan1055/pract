import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white min-h-screen p-4 fixed top-0 left-0">
      <h2 className="text-xl font-bold mb-6">Logo</h2>

      <nav className="flex flex-col gap-2">
        <Link href="/" className="rounded-md px-3 py-2 hover:bg-gray-100">
          Home
        </Link>
      </nav>
    </aside>
  );
}
