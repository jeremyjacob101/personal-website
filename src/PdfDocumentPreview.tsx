import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function PdfDocumentPreview({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageWidth, setPageWidth] = useState(1);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const updateWidth = () => {
      const nextWidth = Math.max(Math.floor(container.clientWidth - 2), 1);
      setPageWidth((currentWidth) =>
        currentWidth === nextWidth ? currentWidth : nextWidth,
      );
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    setPageCount(0);
  }, [href]);

  return (
    <div ref={containerRef} className="pdf-viewer-scroll-shell">
      <Document
        file={href}
        loading={<div className="pdf-viewer-loading" aria-hidden="true" />}
        error={<div className="pdf-viewer-loading" aria-hidden="true" />}
        onLoadSuccess={({ numPages }) => setPageCount(numPages)}
      >
        <div className="pdf-viewer-document">
          {Array.from({ length: pageCount }, (_, index) => (
            <Page
              key={`${href}-${index + 1}`}
              className="pdf-viewer-page"
              loading={null}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              width={pageWidth}
            />
          ))}
        </div>
      </Document>
      <span className="sr-only">{label} preview</span>
    </div>
  );
}
