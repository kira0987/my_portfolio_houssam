How to generate a one-page PDF CV from the provided HTML

Files:
- `cv-houssam-onepage.html` — cleaned single-page CV HTML
- `cv-houssam-onepage.md` — Markdown source

Quick methods to get PDF:

1) Use your browser (Chrome / Edge / Firefox):
   - Open `public/cv-houssam-onepage.html` with the browser (double-click or drag into the window).
   - Print (Ctrl+P) → Destination: Save as PDF. Use Portrait, scale to fit, set margins to "Default" or "Narrow".

2) Use wkhtmltopdf (command-line):
   - Install wkhtmltopdf for Windows: https://wkhtmltopdf.org/downloads.html
   - Run in PowerShell (from project root):

```powershell
wkhtmltopdf public\cv-houssam-onepage.html public\cv-houssam-onepage.pdf
```

3) Use headless Chrome (if installed):

```powershell
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --print-to-pdf="public\cv-houssam-onepage.pdf" "file:///$PWD/public/cv-houssam-onepage.html"
```

Notes:
- The HTML is intentionally minimal to produce a clean printable PDF.
- If you want different fonts or layout tweaks (smaller margins, font sizes), I can adjust the HTML/CSS and re-generate.
