
import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/web/pdf_viewer.css";

import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.min?worker";
pdfjsLib.GlobalWorkerOptions.workerPort = new pdfjsWorker();

export default function PdfViewer({ pdfUrl, highlightPhrase, onLoaded }) {
  const containerRef = useRef();
  const [pdf, setPdf] = useState(null);
  const [scale, setScale] = useState(1.3);

  // ✅ Adjust scale dynamically when screen size changes
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 480) setScale(0.7);
      else if (width < 768) setScale(0.9);
      else if (width < 1024) setScale(1.1);
      else setScale(1.3);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdfDoc = await loadingTask.promise;
      if (!mounted) return;
      setPdf(pdfDoc);
      if (onLoaded) onLoaded(pdfDoc);
    };
    load();
    return () => {
      mounted = false;
    };
  }, [pdfUrl, onLoaded]);

  useEffect(() => {
    if (!pdf) return;

    const renderAll = async () => {
      const container = containerRef.current;
      container.innerHTML = "";

      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const viewport = page.getViewport({ scale });

        const pageDiv = document.createElement("div");
        pageDiv.className = "pdf-page";
        pageDiv.style.position = "relative";
        pageDiv.style.marginBottom = "16px";
        pageDiv.style.display = "flex";
        pageDiv.style.justifyContent = "center";

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.style.width = "100%";
        canvas.style.maxWidth = `${viewport.width}px`;
        canvas.style.height = "auto";
        canvas.style.borderRadius = "8px";
        pageDiv.appendChild(canvas);

        const renderContext = { canvasContext: ctx, viewport };
        await page.render(renderContext).promise;

        // Text Layer
        const textContent = await page.getTextContent();
        const textLayer = document.createElement("div");
        textLayer.className = "textLayer";
        textLayer.style.position = "absolute";
        textLayer.style.top = "0";
        textLayer.style.left = "0";
        textLayer.style.height = `${viewport.height}px`;
        textLayer.style.width = `${viewport.width}px`;
        textLayer.style.pointerEvents = "none";

        textContent.items.forEach((item) => {
          const span = document.createElement("span");
          span.className = "textItem";
          const t = pdfjsLib.Util.transform(viewport.transform, item.transform);
          const x = t[4];
          const y = t[5] - (item.height || 10);
          span.style.left = `${x}px`;
          span.style.top = `${y}px`;
          span.style.position = "absolute";
          span.style.whiteSpace = "pre";
          span.textContent = item.str;
          span.style.fontSize = `${item.height || 10}px`;
          textLayer.appendChild(span);
        });

        pageDiv.appendChild(textLayer);
        container.appendChild(pageDiv);

        await new Promise((r) => setTimeout(r, 0));
      }
    };

    renderAll();
  }, [pdf, scale]);

  // ✅ Highlight logic remains same
  // useEffect(() => {
  //   if (!highlightPhrase) return;
  //   const container = containerRef.current;
  //   if (!container) return;

  //   container.querySelectorAll(".highlight").forEach((el) => {
  //     el.classList.remove("highlight");
  //   });

  //   const normalize = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();
  //   const phrase = normalize(highlightPhrase);
  //   if (!phrase) return;

  //   const pages = Array.from(container.children);
  //   for (const pageDiv of pages) {
  //     const spans = Array.from(pageDiv.querySelectorAll(".textItem"));
  //     const texts = spans.map((s) => normalize(s.textContent || ""));

  //     let i = 0;
  //     while (i < spans.length) {
  //       if (texts[i].length === 0) {
  //         i++;
  //         continue;
  //       }
  //       let j = i;
  //       let combined = texts[i];
  //       while (combined.length < phrase.length && j + 1 < spans.length) {
  //         j++;
  //         combined += " " + texts[j];
  //       }
  //       let k = j;
  //       let candidate = combined;
  //       while (candidate.length >= phrase.length && i <= k) {
  //         if (candidate.includes(phrase)) {
  //           for (let sIndex = i; sIndex <= k; sIndex++) {
  //             spans[sIndex].classList.add("highlight");
  //           }
  //           pageDiv.scrollIntoView({ behavior: "smooth", block: "center" });
  //           return;
  //         }
  //         k--;
  //         candidate = texts.slice(i, k + 1).join(" ");
  //       }
  //       i++;
  //     }
  //   }
  // }, [highlightPhrase]);




  useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  // ✅ Always clear previous highlights first
  container.querySelectorAll(".highlight").forEach((el) => {
    el.classList.remove("highlight");
  });

  // ✅ If highlightPhrase is empty → just stop here (clears highlights)
  if (!highlightPhrase || highlightPhrase.trim() === "") return;

  const normalize = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();
  const phrase = normalize(highlightPhrase);
  if (!phrase) return;

  const pages = Array.from(container.children);
  for (const pageDiv of pages) {
    const spans = Array.from(pageDiv.querySelectorAll(".textItem"));
    const texts = spans.map((s) => normalize(s.textContent || ""));

    let i = 0;
    while (i < spans.length) {
      if (texts[i].length === 0) {
        i++;
        continue;
      }
      let j = i;
      let combined = texts[i];
      while (combined.length < phrase.length && j + 1 < spans.length) {
        j++;
        combined += " " + texts[j];
      }
      let k = j;
      let candidate = combined;
      while (candidate.length >= phrase.length && i <= k) {
        if (candidate.includes(phrase)) {
          for (let sIndex = i; sIndex <= k; sIndex++) {
            spans[sIndex].classList.add("highlight");
          }
          pageDiv.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }
        k--;
        candidate = texts.slice(i, k + 1).join(" ");
      }
      i++;
    }
  }
}, [highlightPhrase]);


  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "90vh",
        overflowY: "auto",
        border: "1px solid #ddd",
        padding: "12px",
        backgroundColor: "#fafafa",
        borderRadius: "10px",
      }}
    />
  );
}
