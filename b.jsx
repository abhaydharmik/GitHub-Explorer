{/* GitHub Stats Section */}
<section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
  <div className="max-w-6xl mx-auto text-center">
    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-12 text-white">
      GitHub Explorer in Numbers
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
        <h4 className="text-3xl sm:text-4xl font-bold text-[#58a6ff]">
          <CountUp end={12000} duration={2} separator="," suffix="+" />
        </h4>
        <p className="text-sm sm:text-base text-gray-400 mt-1">Repositories</p>
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
        <h4 className="text-3xl sm:text-4xl font-bold text-[#2ea043]">
          <CountUp end={5000} duration={2} separator="," suffix="+" />
        </h4>
        <p className="text-sm sm:text-base text-gray-400 mt-1">Contributors</p>
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
        <h4 className="text-3xl sm:text-4xl font-bold text-[#f2cc60]">
          <CountUp end={900} duration={2} separator="," suffix="+" />
        </h4>
        <p className="text-sm sm:text-base text-gray-400 mt-1">Languages</p>
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
        <h4 className="text-3xl sm:text-4xl font-bold text-[#d2a8ff]">
          <CountUp end={15000} duration={2.5} separator="," suffix="+" />
        </h4>
        <p className="text-sm sm:text-base text-gray-400 mt-1">Stars Tracked</p>
      </div>
    </div>
  </div>
</section>
