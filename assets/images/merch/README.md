# ESIVA merch preview assets

Created 2026-11-08 with the built-in image generation tool. Exact prompts, input paths, generated source paths and final outputs are in SOURCES.json.

- Eight blank garment visualizations: women’s and men’s T-shirt front/back, training pants and full-zip hoodie. These are design mockups, not manufacturing specifications or confirmed stock photographs.
- Six transparent slogan cutouts derived from the owner-provided artwork; the three duplicate “My app made me do it” attachments are represented once. Artwork and text remain the owner’s supplied creative direction.
- Mascot extracted from the corrected ESIVA illustration: two forelimbs, two hind paws, one tail.
- Pink emblem reuses the original site asset, clipped to its circular shape in CSS. White ESIVA wordmark is live text.
- PNG-to-WebP conversion only, retaining transparency. No third-party stock imagery. Original source images were not changed.

Configurator intentionally has no checkout, prices, payment, order submission or external API. Selections are stored in the URL; Copy design link lets the user reopen them. Clothing sizes and availability are not invented.

## Model preview update

Eight additional photographs show the women’s and men’s collections at a three-quarter angle: T-shirt front/back, full-zip hoodie and full-body training pants. These are generated illustrative models, not a virtual size/fit guarantee. They reuse the same dynamic print layers as product mode. The women’s styling references the owner-provided T-shirt image. Exact built-in generation prompts and paths are in AVATAR-SOURCES.json. Final images are the `model-*.webp` files in this directory.

Product-mode hoodie prints are shifted outward to 64% of the preview width to clear the drawstrings. Model-mode placement and perspective are calibrated separately for each garment.

## Full outfit update

Four additional full-body three-quarter photographs use the established male and female models: open full-zip hoodie over a plain black T-shirt, and closed hoodie, each with black training pants. Final files are `outfit-women-open.webp`, `outfit-women-closed.webp`, `outfit-men-open.webp` and `outfit-men-closed.webp`. Exact built-in image-generation prompts, references and generated source paths are in OUTFIT-SOURCES.json. Existing full-body training-pants models are reused when the hoodie is excluded. Independent live print layers are calibrated for each garment; prints are not baked into the photos. Original assets are preserved. PNG-to-WebP optimization only.

The four full-outfit photographs were subsequently edited to remove only hoodie drawstrings and their fittings, preserving the models and framing. Exact edit prompts and generated paths: OUTFIT-CORDLESS-SOURCES.json. PNG-to-WebP optimization only. The earlier photographs remain recoverable from Git; standalone Product and On model images are unchanged.
