# Blog Image Layout (Markdown)

Your blog renderer can automatically set an image's **width (percent)** and **alignment** based on layout keywords you include in the image **ALT text** (recommended) or the image **title**.

This is mobile-friendly because you can type the keyword quickly while writing on a phone.

## How to use

### Supported syntax (standard Markdown)

1. ALT text (recommended)
   - `![<alt text with keyword(s)>](path/to/image.png)`
2. Image title (optional fallback)
   - `![<alt text>](path/to/image.png "keyword(s)")`

The renderer checks:
1. `alt` text for keywords first
2. then `title` if `alt` has no keywords

## Supported keywords

### Width
- `full` or `100%` or `100` => `width: 100%`
- `half` or `50%` or `50` => `width: 50%`
- `<number>%` => `width: <number>%` (example: `70%`, `35%`)

### Alignment (optional)
- `left` => left aligned
- `right` => right aligned
- `center` or `centre` => centered

If you specify a width (e.g., `half` or `70%`) but omit alignment, alignment defaults to `center`.

## Examples

### Title/banner image (fills screen)

```md
![Title Banner full](markdown/Blogs/Projects/images/BuildingAnAdcFromAToZBanner.png)
```

### Half-width, centered

```md
![Diagram half](markdown/Blogs/Projects/images/initial_output.PNG)
```

### Half-width, left

```md
![Diagram half-left](markdown/Blogs/Projects/images/initial_output.PNG)
```

### Half-width, right

```md
![Diagram half-right](markdown/Blogs/Projects/images/initial_output.PNG)
```

### Arbitrary percent + alignment

```md
![Chart 70% right](markdown/Blogs/Projects/images/initial_output.PNG)
```

```md
![Schematic 35% center](markdown/Blogs/Projects/images/initial_output.PNG)
```

### Using the image title instead of ALT (works too)

```md
![Anything](markdown/Blogs/Projects/images/initial_output.PNG "half-left")
```

## Notes

- Images are also styled with `max-width: 100%` so they scale down on smaller screens.
- Layout keywords can appear anywhere in the ALT/title string (not necessarily as the entire text).

