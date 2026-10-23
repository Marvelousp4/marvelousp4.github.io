# Linhao Bai — Personal Website

Personal portfolio: [marvelousp4.github.io](https://marvelousp4.github.io/)

Robotics software, robot learning, sim-to-real, and real-world robot systems.
A lightweight black-and-white HTML/CSS portfolio hosted on GitHub Pages.

- [Home](https://marvelousp4.github.io/) — experience, research, and projects
- [Resume](https://marvelousp4.github.io/resume.pdf) — V4, one-page PDF

## Resume source of truth

`resume_source.tex` is the approved V4 LaTeX resume. The PDF is generated
from that exact source without content or layout rewrites. The GitHub Actions
workflow `.github/workflows/build-resume.yml` compiles it with pdfLaTeX
and publishes `resume.pdf`. The Site checks workflow verifies the PDF without
regenerating or overwriting it.

To preview locally:

```sh
pdflatex -interaction=nonstopmode -halt-on-error -jobname=resume resume_source.tex
python3 -m http.server 8000
```

Visit http://localhost:8000/resume.pdf.

Public work descriptions should not disclose proprietary employer information.
