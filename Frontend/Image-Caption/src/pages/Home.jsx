
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      <header className="flex justify-between gap-5 items-center px-6 py-4 shadow-sm bg-white">
        <div className="flex items-center gap-2 text-xl font-bold text-purple-600">
          <span className="material-icons">CaptionAI.</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-4 py-2 text-center rounded-lg bg-white border text-gray-800 hover:bg-gray-100">
            Sign In
          </Link>
          <Link to="/register" className="px-4 py-2 text-center rounded-lg bg-purple-600 text-white hover:bg-purple-700">
            Get Started
          </Link>
        </div>
      </header>

      
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <span className="px-3 py-1 mt-4 rounded-full bg-purple-100 text-purple-600 text-sm mb-6">
          ✨ AI-Powered Captions
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Turn <span className="text-purple-600">Images</span> into{" "}
          <span className="text-purple-600">Captions</span> with AI
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Generate perfect captions for your images instantly with our advanced AI
          technology. Simple, fast, and incredibly accurate.
        </p>
        <div className="flex gap-4">
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 shadow-lg"
          >
            Start Creating Captions →
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-white border font-medium text-gray-800 hover:bg-gray-100"
          >
            Sign In
          </Link>
        </div>
      </main>

      
      <section className="grid md:grid-cols-3 gap-6 px-6 py-12 max-w-6xl mx-auto">
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-xl/30  transition">
          <div className="text-purple-600 text-3xl mb-4">⚡</div>
          <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
          <p className="text-gray-600 text-sm">
            Generate captions in seconds with our optimized AI models
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-xl/30  transition">
          <div className="text-purple-600 text-3xl mb-4">🤖</div>
          <h3 className="font-semibold text-lg mb-2">AI-Powered</h3>
          <p className="text-gray-600 text-sm">
            Advanced machine learning for accurate and creative captions
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-xl/30 transition">
          <div className="text-purple-600 text-3xl mb-4">🖼️</div>
          <h3 className="font-semibold text-lg mb-2">Any Image</h3>
          <p className="text-gray-600 text-sm">
            Works with photos, artwork, screenshots, and more
          </p>
        </div>
      </section>
    </div>
  );
}
