import { Link } from "react-router-dom";

export default function Header() {

  return (

    <header className="bg-green-600">

      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">

        <h1 className="text-white text-2xl font-bold"> Role Based App </h1>

        <nav className="flex gap-6 text-white">

          <Link to="/signup">Signup</Link>

        </nav>

      </div>

    </header>
  );
}