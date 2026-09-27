# WildCatcher product website

Public site: https://www.wildcatcher.jp/

Static Japanese website published by GitHub Pages from `main` at the repository root. Keep `CNAME` set to `www.wildcatcher.jp`. There is no package installation or compilation step.

## Pages

- `index.html`: capabilities, license comparison, existing cases, and Wildpass introduction.
- `download.html`: Windows/macOS packages, installation, update guidance, and ZIP checksums.
- `docs.html`: current quick start, FAQ, and explicitly labelled historical manuals.

Shared presentation and accessible navigation are in `css/styles.css` and `js/main.js`. Core content and navigation work without JavaScript.

## Release maintenance

The site currently describes **Windows 2.2.4**, released September 27, 2026, and **macOS 2.2.1** for both Apple Silicon and Intel. Platform versions are shown separately in download cards and SoftwareApplication metadata. Download links, decimal MB file sizes, and ZIP SHA-256 values were checked against the public [2.2.4 release](https://github.com/Theego99/WildCatcher-releases/releases/tag/v2.2.4), [2.2.1 Mac assets](https://github.com/Theego99/WildCatcher-releases/releases/tag/v2.2.1), and [update manifest](https://raw.githubusercontent.com/Theego99/WildCatcher-releases/main/version.json). Application source is maintained separately; this repository contains the website only.

When publishing another app version, update download links, file sizes, checksums, release notes links, visible version labels, and SoftwareApplication metadata together. The fallback “latest release” link leads to the release channel. Do not use GitHub's automatically generated source archive as the application download.

Pricing is by quotation. Product features and limits depend on the issued license. Avoid presenting unsupported accuracy percentages or data-security guarantees. Wildpass is a separate product under development, not a built-in WildCatcher integration.

Earlier PDF/Word manuals are retained and clearly labelled as historical references. Use the current HTML guide and release notes for current instructions. Update canonical links and `sitemap.xml` when changing routes.
