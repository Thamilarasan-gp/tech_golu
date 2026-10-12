import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#FAF7F2]">
      <h2 className="text-3xl font-bold font-serif text-[#4A1220] mb-2">404 — Page Not Found</h2>
      <p className="text-sm text-[#5E524D] mb-4">The sacred page or doll story you are looking for does not exist.</p>
      <Link href="/" className="btn-primary">
        Return to Smart Golu Exhibition
      </Link>
    </div>
  );
}
