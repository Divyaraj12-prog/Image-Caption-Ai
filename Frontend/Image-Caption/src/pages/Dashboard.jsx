import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onFile = (f) => setFile(f?.[0] || null);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    setErr("");
    setCaption("");
    setImageUrl("");

    try {
      const res = await api.post("/api/post/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCaption(res.data?.post?.caption || "");
      setImageUrl(res.data?.post?.image || "");
    } catch (error) {
      setErr(error?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="px-6 py-4 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold text-purple-600">CaptionAI</div>
          <div className="text-sm text-gray-600">Hi {user?.username || "there"} 👋</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">Create a caption</h1>
        <p className="text-gray-600 mb-6">Upload an image and let AI craft a polished, aesthetic caption.</p>

        <form onSubmit={handleUpload} className="bg-white rounded-2xl shadow p-6 space-y-4">
          <label className="block w-full border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer hover:border-purple-400 transition">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFile(e.target.files)}
            />
            <div className="text-gray-600">
              {file ? (
                <span className="text-[10px]">{file.name}</span>
              ) : (
                "Drag & drop or click to upload an image"
              )}
            </div>
          </label>

          <button
            disabled={loading || !file}
            className="px-5 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-60"
          >
            {loading ? "Generating…" : "Upload & Generate Caption"}
          </button>

          {err && <p className="text-red-600 text-sm">{err}</p>}
        </form>

        {(imageUrl || caption) && (
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {imageUrl && (
              <div className="bg-white rounded-2xl shadow overflow-hidden">
                <img src={imageUrl} alt="Uploaded" className="w-full object-cover" />
              </div>
            )}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold mb-2">Caption</h2>
              <p className="text-gray-800 whitespace-pre-wrap">{caption || "—"}</p>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(caption)}
                className="mt-4 px-4 py-2 rounded-lg border hover:bg-gray-50"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
