# Linhao Bai — Personal Website

Personal portfolio: [marvelousp4.github.io](https://marvelousp4.github.io/)

Robotics software, robot learning, sim-to-real, and real-world robot systems.
A lightweight black-and-white HTML/CSS portfolio hosted on GitHub Pages.

- [Home](https://marvelousp4.github.io/) — experience, research, and projects
- [Resume](https://marvelousp4.github.io/resume.pdf) — the approved, unmodified V4 one-page PDF

## Resume source of truth

`resume.pdf` is the exact approved V4 PDF. It is checked in as a binary file
and is **not** generated or overwritten by CI.

`resume_source.tex` is the corresponding editable V4 LaTeX source. To change
the resume later, explicitly compile the source, review the resulting PDF, and
commit the approved binary to `resume.pdf` together with any source changes.

GitHub Actions validates that the checked-in PDF opens, contains expected
robotics research content, and has exactly one page. It never rewrites the PDF.

## Local preview

```sh
python3 -m http.server 8000
```

Open http://localhost:8000/resume.pdf.

Public work descriptions should not disclose proprietary employer information.
