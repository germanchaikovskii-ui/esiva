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
