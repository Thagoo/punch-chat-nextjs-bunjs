import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex h-20 items-center justify-between">
      <div className="">
        <Link className="text-3xl font-extrabold sm:text-4xl" href="/">
          Punch
        </Link>
      </div>
      <div>
        <button>signin</button>
      </div>
    </nav>
  );
}

export default Navbar;
