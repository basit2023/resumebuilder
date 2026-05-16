"use client";

import { useRef, useState } from "react";
import type { PhotoShape } from "@/lib/types";

type Props = {
  value?: string;
  shape?: PhotoShape;
  onChange: (dataUrl: string | undefined) => void;
  onShapeChange: (shape: PhotoShape) => void;
};

const MAX_SIDE = 480;
const QUALITY = 0.85;

const SHAPES: { id: PhotoShape; label: string; radius: string }[] = [
  { id: "circle", label: "Circle", radius: "9999px" },
  { id: "rounded", label: "Rounded", radius: "16px" },
  { id: "square", label: "Square", radius: "0px" },
];

export function PhotoUpload({ value, shape, onChange, onShapeChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const current = shape ?? "circle";
  const radius = SHAPES.find((s) => s.id === current)?.radius ?? "9999px";

  async function handleFile(file: File) {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please pick an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Image is too large (max 8MB).");
      return;
    }
    setBusy(true);
    try {
      const dataUrl = await resizeToDataUrl(file);
      onChange(dataUrl);
    } catch {
      setError("Could not process the image.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/40 p-4">
      <div className="flex items-start gap-4">
        <div
          className="relative h-24 w-24 shrink-0 overflow-hidden border border-gray-200 bg-white shadow-sm transition"
          style={{ borderRadius: radius }}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="profile" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center text-3xl text-gray-300">👤</div>
          )}
        </div>

        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Profile photo</p>
          <p className="mt-0.5 text-xs text-gray-500">Auto-resized · cropped square · stored privately with your resume.</p>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
              e.target.value = "";
            }}
          />

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="btn-secondary text-xs"
            >
              {busy ? "Processing…" : value ? "Replace" : "Upload photo"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange(undefined)}
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs text-red-700 hover:bg-red-100"
              >
                Remove
              </button>
            )}
          </div>

          <div className="mt-3">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Shape</p>
            <div className="flex gap-1.5">
              {SHAPES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onShapeChange(s.id)}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition ${
                    current === s.id
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span
                    className="inline-block h-4 w-4 border border-current"
                    style={{ borderRadius: s.radius }}
                  />
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function resizeToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      try {
        const side = Math.min(img.width, img.height);
        const sx = (img.width - side) / 2;
        const sy = (img.height - side) / 2;
        const canvas = document.createElement("canvas");
        canvas.width = MAX_SIDE;
        canvas.height = MAX_SIDE;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("no ctx"));
        ctx.drawImage(img, sx, sy, side, side, 0, 0, MAX_SIDE, MAX_SIDE);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL("image/jpeg", QUALITY));
      } catch (e) {
        URL.revokeObjectURL(url);
        reject(e);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image load failed"));
    };
    img.src = url;
  });
}
