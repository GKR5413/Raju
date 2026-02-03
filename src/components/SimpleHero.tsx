const SimpleHero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center max-w-4xl mx-auto px-6">
        {/* Greeting */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3">
            <span className="text-2xl">👋</span>
            <p className="text-blue-600 font-medium text-lg">
              Hello, I'm
            </p>
          </div>
        </div>

        {/* Name */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Raju
            </span>
            <br />
            <span className="text-gray-700">
              Gottumukkala
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <div className="mb-8">
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Software Engineer specializing in{" "}
            <span className="text-blue-600 font-semibold">Java Microservices</span>,{" "}
            <span className="text-purple-600 font-semibold">Fintech Solutions</span>, and{" "}
            <span className="text-indigo-600 font-semibold">AI/ML Platforms</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">2+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">10K+</div>
            <div className="text-sm text-gray-600">Merchants Served</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">99.9%</div>
            <div className="text-sm text-gray-600">System Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">3.82</div>
            <div className="text-sm text-gray-600">GPA at UMKC</div>
          </div>
        </div>

        {/* Location */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span>📍</span>
            <span>Kansas City, MO</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Get In Touch
          </button>
          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors">
            View My Work
          </button>
        </div>

        {/* Success indicator */}
        <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-8">
          <p className="text-green-800 font-medium">
            ✅ Hero Component Loading Successfully!
          </p>
          <p className="text-green-600 text-sm mt-1">
            CSS and Tailwind classes are working properly
          </p>
        </div>
      </div>
    </section>
  );
};

export default SimpleHero;