# Center preview frame cleanup

## What will change
- Remove the center preview’s existing cyan/scanline wrapper treatment and “LIVE PREVIEW” label.
- Keep the current center GIF dimensions and crop behavior.
- Keep the supplied `mainframe.png` CDN image layered above the GIF at its existing aligned scale.
- Preserve pixelated rendering on both images.
- Leave every other page element unchanged.

## Verification
- Confirm the GIF fully fills the frame’s transparent center without gaps or distortion.
- Confirm no label remains and all surrounding layout stays unchanged.
