import puppeteer from "puppeteer-core";
import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(__dirname, "../messages/fr.json"), "utf8"));

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Inter', -apple-system, sans-serif;
    color: #1a1a1a;
    font-size: 10pt;
    line-height: 1.5;
    padding: 40px 48px;
  }

  header {
    margin-bottom: 24px;
    border-bottom: 2px solid #1a1a1a;
    padding-bottom: 16px;
  }

  h1 {
    font-size: 22pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 4px;
  }

  .subtitle {
    font-size: 11pt;
    color: #444;
    font-weight: 500;
  }

  .contact-line {
    margin-top: 8px;
    font-size: 9pt;
    color: #555;
  }

  .contact-line a {
    color: #555;
    text-decoration: none;
  }

  .contact-line span {
    margin: 0 8px;
    color: #ccc;
  }

  section {
    margin-bottom: 20px;
  }

  h2 {
    font-size: 11pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #1a1a1a;
    border-bottom: 1px solid #ddd;
    padding-bottom: 4px;
    margin-bottom: 12px;
  }

  .bio {
    color: #444;
    font-size: 9.5pt;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .entry {
    margin-bottom: 14px;
  }

  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2px;
  }

  .entry-title {
    font-weight: 600;
    font-size: 10pt;
  }

  .entry-date {
    font-size: 9pt;
    color: #666;
    white-space: nowrap;
    margin-left: 16px;
  }

  .entry-place {
    font-size: 9pt;
    color: #555;
    font-style: italic;
  }

  .entry-desc {
    font-size: 9pt;
    color: #444;
    margin-top: 3px;
  }

  .project {
    margin-bottom: 12px;
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .project-name {
    font-weight: 600;
    font-size: 10pt;
  }

  .project-url {
    font-size: 8pt;
    color: #666;
  }

  .project-desc {
    font-size: 9pt;
    color: #444;
    margin-top: 2px;
  }

  .project-tags {
    margin-top: 3px;
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .tag {
    font-size: 7.5pt;
    color: #555;
    background: #f0f0f0;
    padding: 1px 7px;
    border-radius: 3px;
  }

  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .skill-tag {
    font-size: 9pt;
    color: #333;
    background: #f0f0f0;
    padding: 2px 10px;
    border-radius: 3px;
  }
</style>
</head>
<body>
  <header>
    <h1>${data.Hero.name}</h1>
    <div class="subtitle">Développeur Full-Stack</div>
    <div class="contact-line">
      <a href="mailto:${data.Contact.email}">${data.Contact.email}</a>
      <span>|</span>
      Québec, Canada
      <span>|</span>
      <a href="https://github.com/arksyy">github.com/arksyy</a>
      <span>|</span>
      <a href="https://www.linkedin.com/in/alexandreroyy/">linkedin.com/in/alexandreroyy</a>
    </div>
  </header>

  <div class="bio">${data.Hero.bio.charAt(0).toUpperCase() + data.Hero.bio.slice(1)}.</div>

  <section>
    <h2>Expérience</h2>
    ${data.Experience.items.map(item => `
      <div class="entry">
        <div class="entry-header">
          <span class="entry-title">${item.role.charAt(0).toUpperCase() + item.role.slice(1)}</span>
          <span class="entry-date">${item.date.charAt(0).toUpperCase() + item.date.slice(1)}</span>
        </div>
        <div class="entry-place">${item.place.charAt(0).toUpperCase() + item.place.slice(1)}</div>
        <div class="entry-desc">${item.description.charAt(0).toUpperCase() + item.description.slice(1)}</div>
      </div>
    `).join("")}
  </section>

  <section>
    <h2>Projets</h2>
    ${["canopia", "crm", "site-delajoie", "bram"].map(key => {
      const p = data.Projects[key];
      return `
        <div class="project">
          <div class="project-header">
            <span class="project-name">${p.name}</span>
            ${p.url ? `<span class="project-url">${p.url.replace("https://", "")}</span>` : ""}
          </div>
          <div class="project-desc">${p.description.charAt(0).toUpperCase() + p.description.slice(1)}</div>
          <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        </div>
      `;
    }).join("")}
  </section>

  <section>
    <h2>Formation</h2>
    ${data.Education.items.map(item => `
      <div class="entry">
        <div class="entry-header">
          <span class="entry-title">${item.diploma.charAt(0).toUpperCase() + item.diploma.slice(1)}</span>
          <span class="entry-date">${item.date.charAt(0).toUpperCase() + item.date.slice(1)}</span>
        </div>
        <div class="entry-place">${item.place.charAt(0).toUpperCase() + item.place.slice(1)}</div>
      </div>
    `).join("")}
  </section>

  <section>
    <h2>Compétences techniques</h2>
    <div class="skills-grid">
      ${[...new Set(["canopia", "crm", "site-delajoie", "bram"].flatMap(k => data.Projects[k].tags))].map(s => `<span class="skill-tag">${s}</span>`).join("")}
      <span class="skill-tag">git</span>
      <span class="skill-tag">typescript</span>
      <span class="skill-tag">node.js</span>
      <span class="skill-tag">python</span>
      <span class="skill-tag">sql</span>
    </div>
  </section>
</body>
</html>`;

const browser = await puppeteer.launch({
  executablePath: "/Users/alexandreroy/.cache/puppeteer/chrome-headless-shell/mac_arm-146.0.7680.153/chrome-headless-shell-mac-arm64/chrome-headless-shell",
});

const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle0" });

const pdfBuffer = await page.pdf({
  format: "Letter",
  printBackground: true,
  margin: { top: "0", bottom: "0", left: "0", right: "0" },
});

const outPath = join(__dirname, "../public/alexandreroy-cv.pdf");
writeFileSync(outPath, pdfBuffer);
console.log(`PDF generated: ${outPath}`);

await browser.close();
