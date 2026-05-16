"use client";

import { useState } from "react";
import { X, Sparkles, Copy, Check } from "lucide-react";
import clsx from "clsx";

type KeywordData = {
  technicalSkills: string[];
  softSkills: string[];
  certifications: string[];
  tools: string[];
  actionVerbs: string[];
  industryKeywords: string[];
};

type Props = {
  jobTitle: string;
  industry?: string;
  experience?: string;
  onAddSkill?: (skill: string) => void;
  onAddBulletVerb?: (verb: string) => void;
};

export function KeywordsSuggestionPanel({ jobTitle, industry, experience, onAddSkill, onAddBulletVerb }: Props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<KeywordData | null>(null);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  async function fetchKeywords() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/keywords-suggestion", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jobTitle, industry, experience }),
      });
      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();
      setData(result);
    } catch (e) {
      setError("Failed to fetch keywords. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  }

  if (!data) {
    return (
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Industry Keywords</h3>
        </div>
        <p className="mb-3 text-sm text-blue-700">
          Get AI-suggested keywords, skills, and action verbs tailored to <strong>{jobTitle}</strong>
        </p>
        {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
        <button
          onClick={fetchKeywords}
          disabled={loading || !jobTitle}
          className="inline-flex items-center gap-2 rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          {loading ? "Generating..." : "Get Keywords"}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Keywords for {jobTitle}</h3>
        </div>
        <button
          onClick={() => setData(null)}
          className="text-blue-600 hover:text-blue-800"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Technical Skills */}
        <div>
          <h4 className="mb-2 text-sm font-semibold text-blue-900">Technical Skills</h4>
          <div className="flex flex-wrap gap-2">
            {data.technicalSkills.map((skill, i) => (
              <KeywordTag
                key={`tech-${i}`}
                text={skill}
                onCopy={() => copyToClipboard(skill, `tech-${i}`)}
                copied={copiedIndex === `tech-${i}`}
                onClick={() => onAddSkill?.(skill)}
              />
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h4 className="mb-2 text-sm font-semibold text-blue-900">Soft Skills</h4>
          <div className="flex flex-wrap gap-2">
            {data.softSkills.map((skill, i) => (
              <KeywordTag
                key={`soft-${i}`}
                text={skill}
                onCopy={() => copyToClipboard(skill, `soft-${i}`)}
                copied={copiedIndex === `soft-${i}`}
                onClick={() => onAddSkill?.(skill)}
                variant="secondary"
              />
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <h4 className="mb-2 text-sm font-semibold text-blue-900">Tools & Software</h4>
          <div className="flex flex-wrap gap-2">
            {data.tools.map((tool, i) => (
              <KeywordTag
                key={`tool-${i}`}
                text={tool}
                onCopy={() => copyToClipboard(tool, `tool-${i}`)}
                copied={copiedIndex === `tool-${i}`}
                onClick={() => onAddSkill?.(tool)}
                variant="tertiary"
              />
            ))}
          </div>
        </div>

        {/* Action Verbs */}
        <div>
          <h4 className="mb-2 text-sm font-semibold text-blue-900">Action Verbs for Bullets</h4>
          <div className="flex flex-wrap gap-2">
            {data.actionVerbs.map((verb, i) => (
              <KeywordTag
                key={`verb-${i}`}
                text={verb}
                onCopy={() => copyToClipboard(verb, `verb-${i}`)}
                copied={copiedIndex === `verb-${i}`}
                onClick={() => onAddBulletVerb?.(verb)}
                variant="verb"
              />
            ))}
          </div>
        </div>

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-blue-900">Relevant Certifications</h4>
            <div className="flex flex-wrap gap-2">
              {data.certifications.map((cert, i) => (
                <KeywordTag
                  key={`cert-${i}`}
                  text={cert}
                  onCopy={() => copyToClipboard(cert, `cert-${i}`)}
                  copied={copiedIndex === `cert-${i}`}
                  variant="cert"
                />
              ))}
            </div>
          </div>
        )}

        {/* Industry Keywords */}
        <div>
          <h4 className="mb-2 text-sm font-semibold text-blue-900">ATS-Friendly Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {data.industryKeywords.map((keyword, i) => (
              <KeywordTag
                key={`kw-${i}`}
                text={keyword}
                onCopy={() => copyToClipboard(keyword, `kw-${i}`)}
                copied={copiedIndex === `kw-${i}`}
                onClick={() => onAddSkill?.(keyword)}
                variant="keyword"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type TagProps = {
  text: string;
  onCopy: () => void;
  copied: boolean;
  onClick?: () => void;
  variant?: "default" | "secondary" | "tertiary" | "verb" | "cert" | "keyword";
};

function KeywordTag({ text, onCopy, copied, onClick, variant = "default" }: TagProps) {
  const variants = {
    default: "bg-blue-200 text-blue-900",
    secondary: "bg-indigo-200 text-indigo-900",
    tertiary: "bg-cyan-200 text-cyan-900",
    verb: "bg-orange-200 text-orange-900",
    cert: "bg-green-200 text-green-900",
    keyword: "bg-purple-200 text-purple-900",
  };

  return (
    <div
      className={clsx(
        "group inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all hover:shadow-md cursor-pointer",
        variants[variant]
      )}
      onClick={onClick}
      title={onClick ? "Click to add to skills" : "Copy keyword"}
    >
      <span>{text}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onCopy();
        }}
        className="opacity-0 transition-opacity group-hover:opacity-100"
      >
        {copied ? (
          <Check className="h-3 w-3" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </button>
    </div>
  );
}
