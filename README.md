# EKT-Router: Expert–Evidence Alignment for Embodied Vision–Language Models

Project homepage source; the IO page uses the KnowinRouter brand.

Independent static project homepage: https://knowin-29.github.io/KnowinRouter.github.io/

No framework build, external CDN, analytics or model calls are required. Preview
with `python -m http.server 8000`, then open the local server. Deployment uses the
Pages workflow after a push to `main`.

- `index.html`, `styles.css`, `site.js`: editable page, responsive layout, result
  tabs, synthetic step-through illustration and citation copy.
- `assets/paper_results.json`, `assets/plot_results.py`: transcribed paper values
  and editable Matplotlib charts. They are not raw experiment measurements.
  The embodied QA table includes every model and labeled score in Figure 3;
  absent cells are `null` in JSON and an em dash on the page, never inferred scores.
- `assets/*.png`: rendered figures from the supplied manuscript. Original figure
  authoring files were not supplied; these images are not editable reconstructions.
- `assets/KnowinRouter.pdf`, `assets/KnowinRouter_LaTeX.zip`: public preprint and source.
- Model/data links lead to documentation-only Coming soon repositories.

See [NOTICE](NOTICE.md) for official institution asset sources and licensing scope.
