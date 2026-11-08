# ESIVA application screenshots — 2026-11-08

Local development on `development/esiva-app-screenshots`, based on `codex/esiva-legal-v1` at `576f09cbb0246828ed8376db9171939b0d251c88`. No deployment or Pages changes.

## Content and image mapping

All 19 owner-supplied screenshots are used once and copied byte-for-byte. Source paths, dimensions and SHA-256 checksums are recorded in `assets/images/app/sources.json`.

- Hero: daily plan (blue).
- Morning: meals/muscle focus and recovery/target overview (light).
- Next: integrated timeline (blue).
- Adapt: workout-target factors (violet).
- Nutrition: meal targets and suggested breakfast (light).
- Food recognition: photo, voice and text food logging (new section).
- Training: live phone exercise guidance, floor exercise and running on Apple Watch.
- Custom workouts: voice/custom/program options and muscle selection.
- Exercises and programs: category selection and detailed exercise session (new section).
- Muscle load: blue and peach muscle-status screens.
- Learning: training calendar and observed completion history.
- ARC: the app’s pattern-learning visualization; the five-step cycle remains live text.

The 500+ exercises, dozens of programs, and AI voice/text workout creation claims were expressly provided by the owner. Food recognition copy describes an estimate that the user reviews. No synthetic app readings or nonfunctional mock buttons remain in the presentation. Existing product narrative and legal/support content are preserved.

## Devices and branding

Responsive CSS phone and watch frames preserve screenshot aspect ratios. Images have meaningful alternative text, intrinsic dimensions and lazy loading (hero eager). Paired phones become a horizontally scrollable, keyboard-focusable region on small screens; watches remain paired below the phone. Reduced-motion preferences are respected.

New owner-provided pink ESIVA artwork is used on the homepage and all information pages, the SVG favicon, standard PNG/ICO icons and iOS touch icon. Original JPEG is unchanged. Icon sizes are standard exports, not redrawn artwork. Provenance: `assets/images/brand/SOURCE.md`.

## Verification

- Browser widths: 1440, 1024, 768, 390 and 320 px. No page overflow or clipped copy.
- Every screenshot section visited: all 19 images load and retain their original aspect ratios.
- Visually inspected hero, food recognition, phone/watch training and mobile custom-workout presentation.
- Desktop Food AI and Programs navigation works. Mobile galleries scroll with ArrowRight and show a 3px keyboard focus outline.
- All six pages reference the new favicon; local links, anchors and images resolve; all image tags have alt attributes.
- Browser warning/error log empty. `git diff --check` passes.
- `main` remains `98c9b380e2daa0f1240910a97a11e0a40c2846d6`; `temporary-maintenance` remains `057a824acab66b996413bbb9ebf6ae62c654b61c`. CNAME unchanged. No remote push or public publication.

Local preview: http://127.0.0.1:8081/
