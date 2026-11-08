# ESIVA Merch Shop

Local design configurator, added 8 November 2026. No ordering, enquiry submission, checkout, price, or payment flow, as requested.

## Preview

With the existing local preview server running:

http://127.0.0.1:8081/merch/?v=merch-ready

Or start a static server from this checkout on an unused port:

```sh
python3 -m http.server 8082 --bind 127.0.0.1
```

Then open http://127.0.0.1:8082/merch/ . Keep the terminal running while testing.

## Implemented

- Merch Shop in the header and footer of Product, FAQ, Terms, Privacy, Contact, 404 and Merch.
- Women’s and men’s black T-shirts, training pants and full-zip hoodies with separate garment visualizations.
- Pink ESIVA emblem, white ESIVA wordmark or the corrected four-limbed ESIVA mascot.
- Six owner-provided slogan designs for the back of the T-shirt, with front/back controls.
- Slogan gallery opens the selected print in the configurator.
- Choices persist in the URL and can be copied as a design link; invalid values safely fall back to valid options.
- Native radio controls, fieldset labels, keyboard focus, polite status announcements and reduced-motion handling.
- Mobile shortcut from settings back to the product preview.

## Assets

15 optimized transparent WebP images, approximately 1.4 MB combined. Generated garment mockups and cutouts were created with the built-in image generation tool. Exact prompts, owner-supplied input paths and original generated output paths are documented in [SOURCES.json](assets/images/merch/SOURCES.json). Original user assets remain untouched. These are design visualizations, not manufacturing specifications.

## Verification

- Browser: all 18 collection × garment × front-brand combinations; all six back prints; Front/Back; gallery selection; Reset; keyboard arrows and visible focus; successful copy action feedback; design restoration after reload; invalid URL fallback.
- Responsive layout at 320, 390, 768, 1024 and 1440 pixels: no horizontal scrolling; all six header items remain visible. Mobile menu targets have a 44-pixel height.
- Contact navigation retains current branding and company ID; Contact footer returns to the new Merch route.
- No browser console errors or warnings observed. No broken loaded images.
- JavaScript syntax and Git whitespace checks pass. Local links, images and anchors resolve.
- Header/footer labels verified on all seven pages. FAQ, Terms, Privacy and Contact article bodies match the preceding commit.
- Existing 21 active app screenshots and three archived screenshots preserved.
- main remains 98c9b380e2daa0f1240910a97a11e0a40c2846d6.
- temporary-maintenance remains 057a824acab66b996413bbb9ebf6ae62c654b61c.
- CNAME, Pages settings and public maintenance deployment unchanged. No deployment or push performed.

## Three-quarter model previews — 8 November 2026

- Added Product / On model preview controls. Both modes share collection, garment, branding, back slogan and front/back state; presentation mode is included in copied URLs and restored on reload.
- Added eight generated ¾-view photographs: women/men × T-shirt front, T-shirt back, full-zip hoodie, and full-body training pants. Final assets: `assets/images/merch/model-*.webp`. Built-in image-generation prompts and source references: [AVATAR-SOURCES.json](assets/images/merch/AVATAR-SOURCES.json).
- Moved all product-mode hoodie branding outward from the drawstrings. Print placement and perspective in model mode are calibrated separately for each garment.
- Wordmark sizing now scales with the image container. Re-selecting an already active front design or back slogan brings that side into view.
- Browser verification: 18 model garment/collection/branding combinations; six back prints on both models; mode switching preserves choices; keyboard activation; reload restores model view; all six product-mode hoodie branding combinations clear the central drawstrings.
- Layout verified at 320, 390 and 1024 pixels, with 44-pixel mode buttons and no horizontal overflow. No missing loaded images or browser console warnings/errors. JavaScript syntax, local asset/link checks and Git whitespace checks pass.
- Public maintenance, main, CNAME and publishing configuration remain untouched. No checkout or ordering added.

## Full outfit preview — 8 November 2026

- Added **Full outfit**, showing women or men head-to-toe in a three-quarter view. Each garment retains its own emblem, wordmark or mascot; the T-shirt also retains its back slogan.
- **Your outfit** includes or removes each garment without erasing its design. With a T-shirt and hoodie selected, the hoodie opens to show both prints. Without a selected T-shirt, the hoodie is zipped closed. Unselected basics remain unbranded. Back slogans remain available in the separate On model view.
- All garment designs, inclusion choices and preview mode persist together in the copied design link and survive reload. Earlier single-item links still work.
- Four new generated full-body assets (`outfit-{women,men}-{open,closed}.webp`) complement the existing full-body models. Exact built-in image-generation prompts and source paths: [OUTFIT-SOURCES.json](assets/images/merch/OUTFIT-SOURCES.json).
- Browser checks covered all eight inclusion combinations on both models, independent brand restoration while switching items, reload persistence, back-slogan transitions and keyboard checkbox toggling. Responsive checks at 320, 390 and 1024 pixels found no horizontal overflow. No console errors or warnings observed. Local asset/link and Git whitespace checks pass.
- Local preview: http://127.0.0.1:8081/merch/?v=full-outfit&presentation=outfit&include_hoodie=1&tee_brand=mascot&joggers_brand=wordmark&hoodie_brand=emblem
- No ordering or payment flow; no push or public deployment. Protected branches and CNAME remain unchanged.

## Mobile navigation and chest placement correction — 8 November 2026

- Mobile header links now center their labels within 44-pixel touch targets. The visible active/hover background is 32 pixels high with an 8-pixel corner radius, shared across all routes.
- Removed hoodie drawstrings from all four full-outfit photographs with the built-in image editing tool; existing Product and On model assets remain unchanged. Prompts and source paths are recorded in [OUTFIT-CORDLESS-SOURCES.json](assets/images/merch/OUTFIT-CORDLESS-SOURCES.json).
- Moved all three full-outfit hoodie designs inward toward the chest for both open and closed hoodies. Cache versions updated for the shared navigation, configurator and edited photos.
- Verified all six menu destinations at 320 and 390 pixels, centered 32-pixel highlights with 44-pixel hit areas and no horizontal overflow. Checked both models × open/closed hoodie × three prints (12 combinations), inspected desktop and mobile previews, and confirmed no console warnings/errors. JavaScript syntax, local links/assets and Git whitespace checks pass.
