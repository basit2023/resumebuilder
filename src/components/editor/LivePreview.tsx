import { useState } from "react";
import dynamic from "next/dynamic";
import type { ResumeData, TemplateId } from "@/lib/types";
import { HtmlPreview } from "./HtmlPreview";

// react-pdf renderer is heavy; load on client only.
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((m) => m.PDFViewer),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);

import { ResumeDocument } from "@/components/templates/ResumeDocument";

export function LivePreview({ data, template }: { data: ResumeData; template: TemplateId }) {
  const [view, setView] = useState<"html" | "pdf">("html");

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-inner">
      {/* View Toggle */}
      <div className="absolute right-4 top-4 z-10 flex gap-1 rounded-lg border border-gray-200 bg-white/80 p-1 backdrop-blur shadow-sm">
        <button 
          onClick={() => setView("html")}
          className={`rounded-md px-3 py-1 text-xs font-bold transition ${view === "html" ? "bg-brand-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
        >
          View
        </button>
        <button 
          onClick={() => setView("pdf")}
          className={`rounded-md px-3 py-1 text-xs font-bold transition ${view === "pdf" ? "bg-brand-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
        >
          Print PDF
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {view === "html" ? (
          <HtmlPreview data={data} template={template} />
        ) : (
          <PDFViewer style={{ width: "100%", height: "100%", border: "0" }} showToolbar={false}>
            <ResumeDocument data={data} template={template} />
          </PDFViewer>
        )}
      </div>
    </div>
  );
}

function PreviewSkeleton() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-brand-600" />
        Generating PDF preview…
      </div>
    </div>
  );
}
