"use client";

import { useEffect, useRef, useState } from "react";
import type { ContactInfo, CustomBlock, CustomBlockType, CustomLayout, ResumeData, ShapeKind } from "@/lib/types";
import { PAGE_PX } from "@/lib/types";
import { BLOCK_GROUPS, BLOCK_LABELS, defaultLayout, newBlock } from "@/lib/customLayout";
import { BlockContent } from "./BlockContent";
import { IconPicker } from "./IconPicker";
import { BlockImageUpload } from "./BlockImageUpload";
import type { IconName } from "@/lib/icons";

type Props = {
  data: ResumeData;
  onChange: (layout: CustomLayout) => void;
  onContactChange?: (patch: Partial<ContactInfo>) => void;
  onSummaryChange?: (text: string) => void;
  /** Fullscreen mode — toggled by the Maximize button. Parent hides its form column when true. */
  isFullscreen?: boolean;
  onFullscreenToggle?: () => void;
};

// Blocks the user can double-click to edit in place.
const INLINE_EDITABLE: CustomBlockType[] = ["name", "title", "heading", "text", "summary"];

type DragState =
  | { kind: "move"; id: string; startX: number; startY: number; bx: number; by: number }
  | { kind: "resize"; id: string; startX: number; startY: number; bw: number; bh: number }
  | null;

const GRID = 4;
const snap = (v: number) => Math.round(v / GRID) * GRID;

export function CustomTemplateEditor({ data, onChange, onContactChange, onSummaryChange, isFullscreen, onFullscreenToggle }: Props) {
  const layout = data.customLayout ?? defaultLayout();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [scale, setScale] = useState(0.6);
  const drag = useRef<DragState>(null);

  // Initialize layout on first switch to "custom".
  useEffect(() => {
    if (!data.customLayout) onChange(defaultLayout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update(blocks: CustomBlock[]) {
    onChange({ blocks });
  }

  function patchBlock(id: string, patch: Partial<CustomBlock>) {
    update(layout.blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  }

  function addBlock(type: CustomBlockType) {
    const block = newBlock(type);
    update([...layout.blocks, block]);
    setSelectedId(block.id);
  }

  function removeBlock(id: string) {
    update(layout.blocks.filter((b) => b.id !== id));
    setSelectedId(null);
  }

  function bringToFront(id: string) {
    const target = layout.blocks.find((b) => b.id === id);
    if (!target) return;
    update([...layout.blocks.filter((b) => b.id !== id), target]);
  }

  function sendToBack(id: string) {
    const target = layout.blocks.find((b) => b.id === id);
    if (!target) return;
    update([target, ...layout.blocks.filter((b) => b.id !== id)]);
  }

  function moveLayer(id: string, dir: 1 | -1) {
    const idx = layout.blocks.findIndex((b) => b.id === id);
    if (idx === -1) return;
    const j = idx + dir;
    if (j < 0 || j >= layout.blocks.length) return;
    const next = [...layout.blocks];
    [next[idx], next[j]] = [next[j], next[idx]];
    update(next);
  }

  function duplicateBlock(id: string) {
    const target = layout.blocks.find((b) => b.id === id);
    if (!target) return;
    const copy: CustomBlock = { ...target, id: Math.random().toString(36).slice(2, 10), x: target.x + 16, y: target.y + 16 };
    update([...layout.blocks, copy]);
    setSelectedId(copy.id);
  }

  function startDrag(e: React.PointerEvent, block: CustomBlock, kind: "move" | "resize") {
    if (editingId === block.id) return; // don't drag while editing text
    e.stopPropagation();
    e.preventDefault();
    setSelectedId(block.id);
    bringToFront(block.id);
    drag.current =
      kind === "move"
        ? { kind, id: block.id, startX: e.clientX, startY: e.clientY, bx: block.x, by: block.y }
        : { kind, id: block.id, startX: e.clientX, startY: e.clientY, bw: block.width, bh: block.height };
  }

  function getEditableValue(block: CustomBlock): string {
    switch (block.type) {
      case "name": return data.contact.fullName ?? "";
      case "title": return data.contact.title ?? "";
      case "heading":
      case "text": return block.text ?? "";
      case "summary": return data.summary ?? "";
      default: return "";
    }
  }

  function setEditableValue(block: CustomBlock, value: string) {
    switch (block.type) {
      case "name":     onContactChange?.({ fullName: value }); break;
      case "title":    onContactChange?.({ title: value }); break;
      case "heading":
      case "text":     patchBlock(block.id, { text: value }); break;
      case "summary":  onSummaryChange?.(value); break;
    }
  }

  // Global pointermove/up handle continuous drag/resize.
  useEffect(() => {
    function onMove(e: PointerEvent) {
      const d = drag.current;
      if (!d) return;
      const dx = (e.clientX - d.startX) / scale;
      const dy = (e.clientY - d.startY) / scale;
      if (d.kind === "move") {
        const nx = Math.max(0, Math.min(PAGE_PX.width, snap(d.bx + dx)));
        const ny = Math.max(0, Math.min(PAGE_PX.height, snap(d.by + dy)));
        patchBlock(d.id, { x: nx, y: ny });
      } else {
        const nw = Math.max(40, snap(d.bw + dx));
        const nh = Math.max(16, snap(d.bh + dy));
        patchBlock(d.id, { width: nw, height: nh });
      }
    }
    function onUp() { drag.current = null; }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale, layout]);

  // Keyboard: delete selected block; arrow keys nudge.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!selectedId || editingId) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      const block = layout.blocks.find((b) => b.id === selectedId);
      if (!block) return;
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        removeBlock(selectedId);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        duplicateBlock(selectedId);
      } else if (e.key.startsWith("Arrow")) {
        e.preventDefault();
        const step = e.shiftKey ? 16 : 4;
        const dx = e.key === "ArrowLeft" ? -step : e.key === "ArrowRight" ? step : 0;
        const dy = e.key === "ArrowUp" ? -step : e.key === "ArrowDown" ? step : 0;
        patchBlock(selectedId, { x: Math.max(0, block.x + dx), y: Math.max(0, block.y + dy) });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, layout]);

  const selected = layout.blocks.find((b) => b.id === selectedId) ?? null;

  const [isPreview, setIsPreview] = useState(false);

  // ESC exits preview mode.
  useEffect(() => {
    function onPreviewKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isPreview) setIsPreview(false);
    }
    window.addEventListener("keydown", onPreviewKey);
    return () => window.removeEventListener("keydown", onPreviewKey);
  }, [isPreview]);

  return (
    <div className={`flex h-full flex-col rounded-xl border border-gray-200 transition ${isPreview ? "bg-gray-700" : "bg-gray-100"}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 bg-white px-2 py-1.5 text-xs">
        {!isPreview && BLOCK_GROUPS.map((g) => (
          <AddMenu key={g.label} label={g.label} types={g.types} onAdd={addBlock} />
        ))}
        {!isPreview && (
          <span className="hidden text-[10px] text-gray-400 lg:inline">
            Tip: double-click any text to edit · 🔗 button adds a link
          </span>
        )}

        <div className="ml-auto flex items-center gap-3">
          {onFullscreenToggle && (
            <button
              onClick={onFullscreenToggle}
              title={isFullscreen ? "Show form panel" : "Maximize canvas (full screen)"}
              className={`rounded-md px-3 py-1.5 font-bold transition-all ${
                isFullscreen
                  ? "bg-purple-600 text-white shadow-sm hover:bg-purple-700"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {isFullscreen ? "⤡ Minimize" : "⤢ Maximize"}
            </button>
          )}
          <button
            onClick={() => setIsPreview(!isPreview)}
            title={isPreview ? "Exit preview (Esc)" : "View as final resume"}
            className={`rounded-md px-3 py-1.5 font-bold transition-all ${isPreview ? "bg-brand-600 text-white shadow-sm" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
          >
            {isPreview ? "✎ Exit preview (Esc)" : "👁 Preview"}
          </button>

          <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
            <label className="text-gray-500">Zoom</label>
            <input
              type="range"
              min={0.3}
              max={1.5}
              step={0.05}
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-24"
            />
            <span className="w-10 text-right tabular-nums">{Math.round(scale * 100)}%</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Canvas viewport */}
        <div
          className="flex-1 overflow-auto p-6"
          onPointerDown={() => setSelectedId(null)}
        >
          <div
            style={{
              width: PAGE_PX.width * scale,
              height: PAGE_PX.height * scale,
              margin: "0 auto",
            }}
          >
            <div
              className="relative origin-top-left bg-white shadow-md"
              style={{
                width: PAGE_PX.width,
                height: PAGE_PX.height,
                transform: `scale(${scale})`,
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              {layout.blocks.map((b) => {
                const isEditing = editingId === b.id;
                const editable = INLINE_EDITABLE.includes(b.type);
                return (
                  <div
                    key={b.id}
                    onPointerDown={(e) => { if (!isEditing) startDrag(e, b, "move"); }}
                    onClick={(e) => { e.stopPropagation(); setSelectedId(b.id); }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      if (editable) {
                        setSelectedId(b.id);
                        setEditingId(b.id);
                      }
                    }}
                    className={`absolute select-none ${
                      isEditing
                        ? "outline outline-2 outline-brand-600"
                        : (selectedId === b.id && !isPreview)
                          ? "cursor-move outline outline-2 outline-brand-500"
                          : (!isPreview)
                            ? "cursor-move hover:outline hover:outline-1 hover:outline-brand-300"
                            : ""
                    }`}
                    style={{
                      left: b.x,
                      top: b.y,
                      width: b.width,
                      height: b.height,
                      padding: 2,
                      transform: b.rotation ? `rotate(${b.rotation}deg)` : undefined,
                    }}
                  >
                    {isEditing ? (
                      <InlineEditor
                        block={b}
                        value={getEditableValue(b)}
                        onChange={(v) => setEditableValue(b, v)}
                        onExit={() => setEditingId(null)}
                      />
                    ) : (
                      <BlockContent block={b} data={data} />
                    )}
                    {selectedId === b.id && !isEditing && !isPreview && (
                      <div
                        onPointerDown={(e) => startDrag(e, b, "resize")}
                        className="absolute -bottom-1.5 -right-1.5 h-3 w-3 cursor-nwse-resize rounded-sm border border-white bg-brand-500"
                      />
                    )}
                    {selectedId === b.id && !isEditing && editable && !isPreview && (
                      <span className="pointer-events-none absolute -top-5 left-0 rounded bg-brand-600 px-1.5 py-0.5 text-[9px] font-medium text-white shadow">
                        Double-click to edit
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Properties panel */}
        {!isPreview && (
          <aside className="w-72 shrink-0 overflow-y-auto border-l border-gray-200 bg-white p-3 text-xs">
            {selected ? (
              <PropertiesPanel
                block={selected}
                onChange={(patch) => patchBlock(selected.id, patch)}
                onDelete={() => removeBlock(selected.id)}
                onDuplicate={() => duplicateBlock(selected.id)}
                onBringToFront={() => bringToFront(selected.id)}
                onSendToBack={() => sendToBack(selected.id)}
                onLayerUp={() => moveLayer(selected.id, 1)}
                onLayerDown={() => moveLayer(selected.id, -1)}
              />
            ) : (
              <div className="space-y-3">
                {!isFullscreen && onFullscreenToggle && (
                  <button
                    onClick={onFullscreenToggle}
                    className="w-full rounded-lg bg-gradient-to-br from-purple-600 to-brand-600 p-3 text-left text-white shadow-md transition-transform hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-2 text-sm font-bold">⤢ Maximize canvas</div>
                    <p className="mt-1 text-[11px] opacity-90">Hide the form panel and edit on the full screen — recommended for designing a custom layout.</p>
                  </button>
                )}

                <div className="rounded-lg border border-gray-100 bg-gray-50/70 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-700">Get started</p>
                  <ol className="mt-2 list-decimal space-y-1 pl-4 text-[11px] leading-relaxed text-gray-600">
                    <li>Click <strong>+ Resume</strong> or <strong>+ Elements</strong> to add blocks</li>
                    <li>Click any block to select & open its style panel</li>
                    <li>Drag to move · corner handle to resize</li>
                    <li>Double-click text to edit it in place</li>
                  </ol>
                </div>

                <div className="rounded-lg border border-gray-100 bg-gray-50/70 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-700">Shortcuts</p>
                  <ul className="mt-2 space-y-1 text-[11px] text-gray-600">
                    <li>↑↓←→ <span className="text-gray-400">nudge · Shift = 16px</span></li>
                    <li>Ctrl / Cmd + D <span className="text-gray-400">duplicate</span></li>
                    <li>Delete <span className="text-gray-400">remove block</span></li>
                    <li>Esc <span className="text-gray-400">exit preview</span></li>
                  </ul>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}

function PropertiesPanel({
  block,
  onChange,
  onDelete,
  onDuplicate,
  onBringToFront,
  onSendToBack,
  onLayerUp,
  onLayerDown,
}: {
  block: CustomBlock;
  onChange: (patch: Partial<CustomBlock>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onBringToFront: () => void;
  onSendToBack: () => void;
  onLayerUp: () => void;
  onLayerDown: () => void;
}) {
  const hasText = block.type !== "divider" && block.type !== "photo";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold capitalize">{block.type}</h3>
          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-gray-500">Block</p>
        </div>
        <button onClick={onDuplicate} title="Duplicate (Ctrl+D)" className="rounded border border-gray-200 px-2 py-1 hover:bg-gray-50">⎘</button>
      </div>

      {/* Layer order */}
      <Group label="Layer">
        <div className="grid grid-cols-4 gap-1">
          <IconBtn onClick={onSendToBack} title="Send to back">⤓</IconBtn>
          <IconBtn onClick={onLayerDown} title="Send backward">↓</IconBtn>
          <IconBtn onClick={onLayerUp} title="Bring forward">↑</IconBtn>
          <IconBtn onClick={onBringToFront} title="Bring to front">⤒</IconBtn>
        </div>
      </Group>

      {/* Type-specific controls */}
      {block.type === "heading" && (
        <Field label="Heading text">
          <input className="input" value={block.text ?? ""} onChange={(e) => onChange({ text: e.target.value })} />
        </Field>
      )}

      {block.type === "text" && (
        <Field label="Paragraph text">
          <textarea
            rows={4}
            className="input"
            value={block.text ?? ""}
            onChange={(e) => onChange({ text: e.target.value })}
            placeholder="Click to edit this paragraph."
          />
        </Field>
      )}

      {(block.type === "photo" || block.type === "image") && (
        <Group label={block.type === "photo" ? "Profile photo" : "Image"}>
          {block.type === "image" && (
            <Field label="Image file">
              <BlockImageUpload
                value={block.imageDataUrl}
                onChange={(url) => onChange({ imageDataUrl: url })}
              />
            </Field>
          )}
          {block.type === "photo" && (
            <Field label="Shape">
              <div className="grid grid-cols-3 gap-1">
                {(["circle", "rounded", "square"] as const).map((sh) => (
                  <button
                    key={sh}
                    onClick={() => onChange({ photoShape: sh })}
                    className={`rounded border px-2 py-1 capitalize ${
                      (block.photoShape ?? "circle") === sh
                        ? "border-brand-500 bg-brand-50 text-brand-700"
                        : "border-gray-200"
                    }`}
                  >
                    {sh}
                  </button>
                ))}
              </div>
            </Field>
          )}
          <Field label="Fit">
            <div className="grid grid-cols-2 gap-1">
              {(["cover", "contain"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => onChange({ imageObjectFit: f })}
                  className={`rounded border px-2 py-1 capitalize ${
                    (block.imageObjectFit ?? "cover") === f
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-gray-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Field>
          <Field label={`Crop X · ${block.imageObjectX ?? 50}%`}>
            <input
              type="range"
              min={0}
              max={100}
              value={block.imageObjectX ?? 50}
              onChange={(e) => onChange({ imageObjectX: parseInt(e.target.value) })}
              className="w-full"
            />
          </Field>
          <Field label={`Crop Y · ${block.imageObjectY ?? 50}%`}>
            <input
              type="range"
              min={0}
              max={100}
              value={block.imageObjectY ?? 50}
              onChange={(e) => onChange({ imageObjectY: parseInt(e.target.value) })}
              className="w-full"
            />
          </Field>
          <p className="text-[10px] text-gray-500">Drag sliders to reframe the image inside its box.</p>
        </Group>
      )}

      {block.type === "icon" && (
        <Group label="Icon">
          <IconPicker
            value={block.iconName}
            onChange={(name: IconName) => onChange({ iconName: name })}
          />
        </Group>
      )}

      {block.type === "shape" && (
        <Group label="Shape">
          <div className="grid grid-cols-3 gap-1">
            {(["rect", "circle", "line"] as ShapeKind[]).map((k) => (
              <button
                key={k}
                onClick={() => onChange({ shapeKind: k })}
                className={`rounded border px-2 py-1 capitalize ${
                  (block.shapeKind ?? "rect") === k
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-gray-200"
                }`}
              >
                {k === "rect" ? "Rectangle" : k}
              </button>
            ))}
          </div>
          {block.shapeKind === "line" && (
            <Field label={`Line width · ${block.shapeStrokeWidth ?? 2}px`}>
              <input
                type="range"
                min={1}
                max={20}
                value={block.shapeStrokeWidth ?? 2}
                onChange={(e) => onChange({ shapeStrokeWidth: parseInt(e.target.value) })}
                className="w-full"
              />
            </Field>
          )}
        </Group>
      )}

      <Group label="Position & size">
        <div className="grid grid-cols-2 gap-2">
          <Field label="X"><input type="number" className="input" value={Math.round(block.x)} onChange={(e) => onChange({ x: parseInt(e.target.value || "0") })} /></Field>
          <Field label="Y"><input type="number" className="input" value={Math.round(block.y)} onChange={(e) => onChange({ y: parseInt(e.target.value || "0") })} /></Field>
          <Field label="W"><input type="number" className="input" value={Math.round(block.width)} onChange={(e) => onChange({ width: parseInt(e.target.value || "0") })} /></Field>
          <Field label="H"><input type="number" className="input" value={Math.round(block.height)} onChange={(e) => onChange({ height: parseInt(e.target.value || "0") })} /></Field>
        </div>
        <Field label={`Rotation · ${block.rotation ?? 0}°`}>
          <input
            type="range"
            min={-180}
            max={180}
            value={block.rotation ?? 0}
            onChange={(e) => onChange({ rotation: parseInt(e.target.value) })}
            className="w-full"
          />
        </Field>
        <Field label={`Opacity · ${Math.round((block.opacity ?? 1) * 100)}%`}>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round((block.opacity ?? 1) * 100)}
            onChange={(e) => onChange({ opacity: parseInt(e.target.value) / 100 })}
            className="w-full"
          />
        </Field>
      </Group>

      {hasText && (
        <Group label="Typography">
          <div className="grid grid-cols-2 gap-2">
            <Field label="Size">
              <input
                type="number"
                min={6}
                max={72}
                className="input"
                value={block.fontSize ?? 11}
                onChange={(e) => onChange({ fontSize: parseInt(e.target.value || "11") })}
              />
            </Field>
            <Field label="Weight">
              <select
                className="input"
                value={block.fontWeight ?? "normal"}
                onChange={(e) => onChange({ fontWeight: e.target.value as "normal" | "bold" })}
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
              </select>
            </Field>
          </div>
          <Field label="Align">
            <div className="grid grid-cols-3 gap-1">
              {(["left", "center", "right"] as const).map((a) => (
                <button
                  key={a}
                  className={`rounded border px-1 py-1 capitalize ${
                    (block.align ?? "left") === a ? "border-brand-500 bg-brand-50 text-brand-700" : "border-gray-200"
                  }`}
                  onClick={() => onChange({ align: a })}
                >
                  {a}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Text color">
            <ColorRow value={block.color ?? "#111827"} onChange={(c) => onChange({ color: c })} onClear={() => onChange({ color: undefined })} />
          </Field>
        </Group>
      )}

      <Group label="Background & border">
        <Field label="Background">
          <ColorRow
            value={block.backgroundColor ?? "#ffffff"}
            onChange={(c) => onChange({ backgroundColor: c })}
            onClear={() => onChange({ backgroundColor: undefined })}
            allowNone
            isNone={!block.backgroundColor}
          />
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Corner radius">
            <input
              type="number"
              min={0}
              max={200}
              className="input"
              value={block.borderRadius ?? 0}
              onChange={(e) => onChange({ borderRadius: parseInt(e.target.value || "0") })}
            />
          </Field>
          <Field label="Border width">
            <input
              type="number"
              min={0}
              max={20}
              className="input"
              value={block.borderWidth ?? 0}
              onChange={(e) => onChange({ borderWidth: parseInt(e.target.value || "0") })}
            />
          </Field>
        </div>
        {block.borderWidth ? (
          <Field label="Border color">
            <ColorRow
              value={block.borderColor ?? "#e5e7eb"}
              onChange={(c) => onChange({ borderColor: c })}
              onClear={() => onChange({ borderColor: undefined })}
            />
          </Field>
        ) : null}
        <div className="grid grid-cols-2 gap-2">
          <Field label="Padding X">
            <input
              type="number"
              min={0}
              max={64}
              className="input"
              value={block.paddingX ?? 0}
              onChange={(e) => onChange({ paddingX: parseInt(e.target.value || "0") })}
            />
          </Field>
          <Field label="Padding Y">
            <input
              type="number"
              min={0}
              max={64}
              className="input"
              value={block.paddingY ?? 0}
              onChange={(e) => onChange({ paddingY: parseInt(e.target.value || "0") })}
            />
          </Field>
        </div>
      </Group>

      <button
        onClick={onDelete}
        className="w-full rounded-lg border border-red-200 bg-red-50 px-2 py-2 text-red-700 hover:bg-red-100"
      >
        Delete block
      </button>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-2">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">{label}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function IconBtn({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <button onClick={onClick} title={title} className="rounded border border-gray-200 px-2 py-1 hover:bg-white">
      {children}
    </button>
  );
}

function InlineEditor({
  block,
  value,
  onChange,
  onExit,
}: {
  block: CustomBlock;
  value: string;
  onChange: (v: string) => void;
  onExit: () => void;
}) {
  const multiline = block.type === "summary" || block.type === "text";
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkLabel, setLinkLabel] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const savedSelection = useRef<{ start: number; end: number }>({ start: 0, end: 0 });

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    if ("select" in el) (el as HTMLInputElement | HTMLTextAreaElement).select();
  }, []);

  function rememberSelection() {
    const el = inputRef.current;
    if (!el) return;
    savedSelection.current = {
      start: el.selectionStart ?? value.length,
      end: el.selectionEnd ?? value.length,
    };
  }

  function openLinkPopover() {
    rememberSelection();
    const { start, end } = savedSelection.current;
    setLinkLabel(value.slice(start, end));
    setLinkUrl("");
    setLinkOpen(true);
  }

  function applyLink() {
    const url = linkUrl.trim();
    if (!url) return;
    const fullUrl = /^(https?:|mailto:|tel:)/i.test(url) ? url : `https://${url}`;
    const label = linkLabel.trim() || fullUrl;
    const { start, end } = savedSelection.current;
    const before = value.slice(0, start);
    const after = value.slice(end);
    const md = `[${label}](${fullUrl})`;
    onChange(`${before}${md}${after}`);
    setLinkOpen(false);
    // restore focus to the editor at end of the inserted link
    setTimeout(() => {
      const el = inputRef.current;
      if (!el) return;
      el.focus();
      const pos = before.length + md.length;
      try { el.setSelectionRange(pos, pos); } catch { /* noop */ }
    }, 0);
  }

  const style: React.CSSProperties = {
    width: "100%",
    height: "100%",
    fontSize: block.fontSize ?? 11,
    fontWeight: block.fontWeight === "bold" ? 700 : 400,
    textAlign: block.align ?? "left",
    color: block.color ?? "#111827",
    background: "transparent",
    border: "none",
    outline: "none",
    resize: "none",
    padding: 0,
    margin: 0,
    fontFamily: "inherit",
    lineHeight: 1.45,
    whiteSpace: multiline ? "pre-wrap" : "nowrap",
    boxSizing: "border-box",
    display: "block",
  };

  function stopBubble(e: React.PointerEvent | React.MouseEvent) { e.stopPropagation(); }

  // Suppress blur->exit while popover is open (clicking inside it blurs the editor).
  function handleBlur() {
    if (linkOpen) return;
    onExit();
  }

  const editorEl = multiline ? (
    <textarea
      ref={(el) => { inputRef.current = el; }}
      style={style}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={handleBlur}
      onPointerDown={stopBubble}
      onClick={stopBubble}
      onDoubleClick={stopBubble}
      onSelect={rememberSelection}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          (e.target as HTMLTextAreaElement).blur();
        }
      }}
    />
  ) : (
    <input
      ref={(el) => { inputRef.current = el; }}
      style={style}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={handleBlur}
      onPointerDown={stopBubble}
      onClick={stopBubble}
      onDoubleClick={stopBubble}
      onSelect={rememberSelection}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "Escape") {
          e.preventDefault();
          (e.target as HTMLInputElement).blur();
        }
      }}
    />
  );

  return (
    <>
      {editorEl}

      {/* Floating mini-toolbar — positioned above the block via absolute parent */}
      <div
        className="pointer-events-auto absolute -top-9 right-0 flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-1.5 py-1 text-[11px] shadow-md"
        onPointerDown={stopBubble}
        onMouseDown={(e) => e.preventDefault() /* keep editor focus */}
      >
        <button
          type="button"
          onClick={openLinkPopover}
          className="rounded px-1.5 py-0.5 font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-700"
          title="Insert hyperlink"
        >
          🔗 Link
        </button>
        <span className="px-1 text-gray-300">·</span>
        <button
          type="button"
          onClick={() => inputRef.current?.blur()}
          className="rounded px-1.5 py-0.5 text-gray-500 hover:bg-gray-50"
          title="Done editing"
        >
          ✓ Done
        </button>
      </div>

      {linkOpen && (
        <div
          className="pointer-events-auto absolute left-0 top-full z-40 mt-1 w-72 rounded-lg border border-gray-200 bg-white p-3 text-xs shadow-xl"
          onPointerDown={stopBubble}
          onMouseDown={(e) => e.preventDefault()}
          onClick={stopBubble}
        >
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Insert link</p>
          <label className="label">Display text</label>
          <input
            className="input mb-2"
            placeholder="click here"
            value={linkLabel}
            onChange={(e) => setLinkLabel(e.target.value)}
          />
          <label className="label">URL</label>
          <input
            className="input"
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applyLink();
              }
            }}
            autoFocus
          />
          <p className="mt-1 text-[10px] text-gray-500">Tip: also accepts mailto: and tel:</p>
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setLinkOpen(false)}
              className="rounded border border-gray-200 px-2 py-1 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={applyLink}
              disabled={!linkUrl.trim()}
              className="rounded bg-brand-600 px-3 py-1 font-medium text-white hover:bg-brand-700 disabled:opacity-50"
            >
              Insert
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function AddMenu({
  label,
  types,
  onAdd,
}: {
  label: string;
  types: CustomBlockType[];
  onAdd: (t: CustomBlockType) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="rounded border border-gray-200 px-2.5 py-1 font-medium hover:bg-gray-50"
      >
        + {label} ▾
      </button>
      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 grid w-48 grid-cols-1 gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
          {types.map((t) => (
            <button
              key={t}
              onMouseDown={(e) => {
                e.preventDefault();
                onAdd(t);
                setOpen(false);
              }}
              className="rounded px-2 py-1 text-left text-xs hover:bg-brand-50 hover:text-brand-700"
            >
              {BLOCK_LABELS[t]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ColorRow({
  value,
  onChange,
  onClear,
  allowNone,
  isNone,
}: {
  value: string;
  onChange: (c: string) => void;
  onClear?: () => void;
  allowNone?: boolean;
  isNone?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-10 cursor-pointer rounded border border-gray-200 p-0"
      />
      <input
        type="text"
        value={isNone ? "none" : value}
        onChange={(e) => onChange(e.target.value)}
        className="input flex-1"
      />
      {allowNone && onClear && (
        <button
          onClick={onClear}
          title="Clear"
          className="rounded border border-gray-200 px-2 py-1 text-gray-500 hover:bg-gray-50"
        >
          ✕
        </button>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}
