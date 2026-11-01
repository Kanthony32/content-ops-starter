# hoopthink.net

Static site for Hoop Think, a Westview Group publication. Netlify serves `site/` as-is (see `netlify.toml`).

- `site/index.html`: homepage with the HoopThink Briefing preview issue, the email signup (Netlify Forms, form name `briefing-preview`), and the latest-pieces strip
- `site/briefing/thanks/`: page shown after signup, with the PDF download
- `site/briefing/hoop-think-preview-issue.pdf`: the preview issue
- `site/minimum-viable-production/`, `site/how-to-watch-the-game/`, `site/does-your-school-pay-athletes/`: articles (shared styles in `site/article.css`, which also holds the homepage layout)
- `site/the-playbook/`: The Playbook section index and entries
- `site/student-athlete-fit-system/`: the Student-Athlete Fit System, a free recruiting worksheet
- `site/the-24/`: The 24 daily digest archive and editions
- `tools/publish_edition.py`: turns a reviewed edition of The 24 into its public page and updates the homepage card and archive

Signups appear in Netlify under Forms > briefing-preview.

Deploys go straight to Netlify (pushing here does not trigger a deploy). The working copy that the automated The 24 publisher reads and writes back is the "HoopThink Site Source" artifact on claude.ai; this repo is the record. Every deploy must include the whole site, because a deploy replaces everything that is live.
The Netlify starter template that used to live here is in git history.
