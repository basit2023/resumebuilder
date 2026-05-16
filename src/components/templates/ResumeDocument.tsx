import { Document } from "@react-pdf/renderer";
import type { ResumeData, TemplateId } from "@/lib/types";
import { ModernTemplate } from "./ModernTemplate";
import { ClassicTemplate } from "./ClassicTemplate";
import { CompactTemplate } from "./CompactTemplate";
import { CustomTemplate } from "./CustomTemplate";

export function ResumeDocument({ data, template }: { data: ResumeData; template: TemplateId }) {
  return (
    <Document title={data.contact.fullName || "Resume"} author={data.contact.fullName}>
      {template === "classic" ? (
        <ClassicTemplate data={data} />
      ) : template === "compact" ? (
        <CompactTemplate data={data} />
      ) : template === "custom" ? (
        <CustomTemplate data={data} />
      ) : (
        <ModernTemplate data={data} />
      )}
    </Document>
  );
}
