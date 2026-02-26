export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 py-24">
        <h1 className="text-5xl md:text-6xl font-light text-black mb-16 tracking-tight leading-tight">About Studio Mkenya</h1>

        <div className="space-y-12">
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
            Studio Mkenya is a multidisciplinary creative studio dedicated to showcasing exceptional
            contemporary art and design. Our curated collection features works from emerging and
            established artists, with a focus on African creativity and innovation.
          </p>

          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light text-black mb-6 tracking-tight">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed font-light text-[15px]">
              We believe in making art accessible and celebrating creativity in all its forms. Through
              our online shop, we offer carefully selected prints, books, and merchandise that reflect
              our commitment to quality and artistic excellence.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light text-black mb-6 tracking-tight">Quality & Sustainability</h2>
            <p className="text-gray-700 leading-relaxed font-light text-[15px]">
              Every product in our collection is chosen for its quality, craftsmanship, and artistic
              merit. We work with sustainable materials and ethical production methods whenever
              possible, ensuring that our products are as responsible as they are beautiful.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
