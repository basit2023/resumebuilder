"use client";

import { ICONS, type IconName } from "@/lib/icons";

type Props = {
  name: IconName;
  color?: string;
  strokeWidth?: number;
  size?: number | string;
};

export function IconRender({ name, color = "currentColor", strokeWidth = 2, size = "100%" }: Props) {
  const def = ICONS[name];
  if (!def) return null;
  const paths = Array.isArray(def.d) ? def.d : [def.d];
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={def.fill ? color : "none"}
      stroke={def.fill ? "none" : color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
