import Link from "next/link";

const NotFound = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl md:text-9xl font-bold text-[#C2F800]">404</h1>

        <h2 className="text-2xl font-bold mt-5">PAGE NOT FOUND</h2>

        <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto">
          The workout page you are looking for does not exist. Let's get you
          back to the workout library.
        </p>

        <Link
          href="/"
          className="btn mt-7 bg-[#C2F800] hover:bg-[#b4e600] text-black border-none font-semibold"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
