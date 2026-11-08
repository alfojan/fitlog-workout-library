const Loading = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Loading Heading */}
      <div className="mb-8 animate-pulse">
        <div className="h-8 w-48 bg-[#252830] rounded"></div>
        <div className="h-4 w-64 bg-[#252830] rounded mt-3"></div>
      </div>

      {/* Loading Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-[#15171D] border border-[#252830] rounded-xl p-4 animate-pulse"
          >
            <div className="h-48 bg-[#252830] rounded-lg"></div>

            <div className="h-5 w-3/4 bg-[#252830] rounded mt-5"></div>

            <div className="h-4 w-1/2 bg-[#252830] rounded mt-3"></div>

            <div className="h-4 w-full bg-[#252830] rounded mt-5"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
