# Advanced GSAP Multi-Layer Text Animations

Complete guide to the advanced text animation system featuring per-letter animation, block-level reveals, and gradient wipes.

## 🎬 What You Get

A **three-layer animation system** that combines:

1. **Per-Letter Animation** - Each character flies up individually with stagger
2. **Block-Level Reveal** - Container un-blurs, un-skews, and scales smoothly
3. **Gradient Wipe** - Polished shine effect sweeps top-to-bottom

## 🚀 Quick Start

### React/Next.js (TypeScript)

```tsx
import AnimatedTextAdvanced from "@/app/components/AnimatedTextAdvanced";

<AnimatedTextAdvanced
  text="Your Amazing Text"
  as="h1"
  className="text-6xl font-bold text-white"
  variant="once"
  // Letter animation
  stagger={0.06}
  ease="back.out(1.5)"
  yStart={100}
  // Block reveal
  blur={10}
  skewY={5}
  scale={0.98}
  // Gradient wipe
  enableGradientWipe={true}
/>;
```

### Vanilla JavaScript

See `/public/vanilla-text-animation.html` for complete implementation.

```javascript
animateText(element, {
  variant: "once",
  stagger: 0.06,
  ease: "back.out(1.5)",
  yStart: 100,
  blur: 10,
  skewY: 5,
  scrubAmount: 0.5,
});
```

## 📊 Animation Layers Explained

### Layer 1: Per-Letter Animation

Each letter independently animates:

```typescript
// Initial state
opacity: 0;
yPercent: 100; // Starts below

// Final state
opacity: 1;
yPercent: 0; // Ends in position

// Timing
stagger: 0.06; // 60ms between each letter
duration: 0.7;
ease: "power4.out";
```

**Key Features:**

- `will-change: transform, opacity` for performance
- `display: inline-block` to prevent layout shift
- Configurable stagger for wave effect
- Multiple easing options

### Layer 2: Block-Level Reveal

The entire text container simultaneously animates:

```typescript
// Initial state
skewY: 5; // Slight downward tilt
yPercent: 10; // Slightly below
scale: 0.98; // Slightly smaller
filter: "blur(8px)"; // Blurred

// Final state
skewY: 0;
yPercent: 0;
scale: 1;
filter: "blur(0px)"; // Crisp

// Timing
duration: 1.05; // Slightly longer than letters
ease: "power4.out";
```

**Visual Effect:**
As you scroll, the text container loses its blur and skew while letters rise up through it.

### Layer 3: Gradient Wipe

A subtle gradient overlay sweeps across the text:

```typescript
// Initial state
y: "-100%"  // Above the text

// Final state
y: "100%"   // Below the text

// Styling
background: linear-gradient(180deg,
  transparent 0%,
  rgba(255,255,255,0.4) 50%,
  transparent 100%
)
mix-blend-mode: overlay
```

**CSS Mask:**

```css
-webkit-mask-image: linear-gradient(
  180deg,
  rgba(0, 0, 0, 0) 0%,
  rgba(0, 0, 0, 1) 30%,
  rgba(0, 0, 0, 1) 70%,
  rgba(0, 0, 0, 0) 100%
);
```

## 🎛️ Variants: Once vs Scrub

### Variant A: "once"

**Best for:** Hero sections, important headlines

```tsx
<AnimatedTextAdvanced
  variant="once"
  // ... other props
/>
```

**Behavior:**

- Plays once when element scrolls into view
- `toggleActions: "play none none reverse"`
- `once: true` - won't replay

**Use Cases:**

- Hero headlines
- Section titles
- Call-to-action text
- One-time reveals

### Variant B: "scrub"

**Best for:** Cinematic reveals, storytelling

```tsx
<AnimatedTextAdvanced
  variant="scrub"
  scrubAmount={0.5}
  // ... other props
/>
```

**Behavior:**

- Smoothly synced with scroll position
- `scrub: 0.5` - smooth interpolation
- Progresses as user scrolls
- Reversible by scrolling back

**Use Cases:**

- Parallax storytelling
- Product showcases
- Long-form content
- Interactive experiences

## 🎨 Configuration Guide

### Complete Props Reference

```typescript
interface AnimatedTextAdvancedProps {
  // Required
  text: string;

  // Semantic HTML
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;

  // Animation mode
  variant?: "once" | "scrub";

  // LETTER ANIMATION CONFIG
  stagger?: number; // Default: 0.06 (60ms between letters)
  duration?: number; // Default: 0.7 (700ms per letter)
  ease?: string; // Default: "power4.out"
  yStart?: number; // Default: 100 (100% below)

  // BLOCK-LEVEL REVEAL CONFIG
  skewY?: number; // Default: 5 (5° tilt)
  yPercent?: number; // Default: 10 (10% down)
  blur?: number; // Default: 8 (8px blur)
  scale?: number; // Default: 0.98 (98% size)

  // GRADIENT WIPE CONFIG
  enableGradientWipe?: boolean; // Default: true
  wipeDuration?: number; // Default: 1.2

  // SCROLLTRIGGER CONFIG
  triggerStart?: string; // Default: "top 80%"
  triggerEnd?: string; // Default: "top 30%"
  scrubAmount?: number; // Default: 0.5

  // ACCESSIBILITY
  disableAnimation?: boolean; // Default: false
}
```

### Tweaking Stagger

```tsx
// Fast cascade - energetic, quick
stagger={0.02}

// Normal wave - balanced, smooth
stagger={0.06}

// Slow dramatic - deliberate, epic
stagger={0.12}
```

### Tweaking Ease

```tsx
// Professional & smooth
ease = "power4.out";

// Energetic bounce
ease = "back.out(1.5)";

// Strong bounce
ease = "back.out(1.7)";

// Playful spring
ease = "elastic.out(1, 0.5)";

// Quick & snappy
ease = "power2.out";
```

### Tweaking Start/End

```tsx
// Early trigger - starts animating sooner
triggerStart = "top 90%";
triggerEnd = "top 40%";

// Late trigger - waits longer
triggerStart = "top 60%";
triggerEnd = "top 20%";

// Center trigger
triggerStart = "center center";
triggerEnd = "top top";
```

### Tweaking Blur & Skew

```tsx
// Subtle effect
blur={5}
skewY={2}

// Dramatic effect
blur={15}
skewY={10}

// No blur, only skew
blur={0}
skewY={7}

// No skew, only blur
blur={12}
skewY={0}
```

## ♿ Accessibility Features

### Prefers-Reduced-Motion

Automatically detects user preference:

```typescript
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  // Render plain text without animation
  return <Component>{text}</Component>;
}
```

**CSS Support:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### No Layout Shift

- Letters use `display: inline-block`
- Stable `line-height: 1.2`
- Container has `perspective` for smooth 3D
- No sudden jumps or reflows

### Screen Reader Friendly

- Text remains readable (no `aria-hidden`)
- Semantic HTML tags (`as` prop)
- Proper contrast during wipe
- Content accessible at all times

### Performance Optimization

```css
.char {
  will-change: transform, opacity;
}
```

Cleanup on unmount:

```typescript
chars.forEach((char) => {
  char.style.willChange = "auto";
});
splitText.revert();
tl.kill();
```

## 🎯 Real-World Examples

### Hero Section

```tsx
<AnimatedTextAdvanced
  text="Welcome to the Future"
  as="h1"
  className="text-8xl font-bold text-white"
  variant="once"
  stagger={0.05}
  ease="back.out(1.5)"
  blur={10}
  skewY={5}
/>
```

### Product Showcase (Scroll-Synced)

```tsx
<AnimatedTextAdvanced
  text="Introducing Our Latest Innovation"
  as="h2"
  className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
  variant="scrub"
  stagger={0.08}
  ease="power4.out"
  blur={12}
  scrubAmount={0.5}
/>
```

### Section Title (Fast Reveal)

```tsx
<AnimatedTextAdvanced
  text="Features"
  as="h2"
  className="text-5xl font-bold text-white"
  variant="once"
  stagger={0.03}
  ease="power2.out"
  blur={6}
  duration={0.5}
/>
```

### Dramatic Statement (Slow)

```tsx
<AnimatedTextAdvanced
  text="Innovation Starts Here"
  as="h1"
  className="text-7xl font-bold text-white"
  variant="once"
  stagger={0.12}
  ease="power3.out"
  blur={15}
  skewY={8}
  duration={1.2}
/>
```

## 🛠️ Advanced Customization

### Custom Gradient Wipe

Modify in `globals.css`:

```css
/* Sharper wipe */
.gradient-wipe-sharp {
  -webkit-mask-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0) 100%
  );
}

/* Colored shine */
.gradient-shine-blue {
  background: linear-gradient(
    180deg,
    rgba(59, 130, 246, 0) 0%,
    rgba(59, 130, 246, 0.6) 50%,
    rgba(59, 130, 246, 0) 100%
  );
}
```

### Custom Easing Curves

```typescript
// Register custom ease
gsap.registerEase("customBounce", "0.68, -0.55, 0.265, 1.55");

<AnimatedTextAdvanced
  ease="customBounce"
  // ...
/>;
```

### Direction Variations

Modify component for left/right reveals:

```typescript
// In component
const direction = props.direction || "up";

gsap.set(splitText.chars, {
  opacity: 0,
  ...(direction === "up" && { yPercent: yStart }),
  ...(direction === "left" && { xPercent: -yStart }),
  ...(direction === "right" && { xPercent: yStart }),
});
```

## 📝 Vanilla JS Implementation

Complete standalone example:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    <script src="https://unpkg.com/split-type"></script>
  </head>
  <body>
    <h1 id="hero-text">Your Text Here</h1>

    <script>
      gsap.registerPlugin(ScrollTrigger);

      function animateText(element, options = {}) {
        const config = {
          variant: "once",
          stagger: 0.06,
          ease: "power4.out",
          yStart: 100,
          blur: 8,
          skewY: 5,
          ...options,
        };

        const split = new SplitType(element, { types: "chars" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            ...(config.variant === "once" && { once: true }),
            ...(config.variant === "scrub" && { scrub: 0.5 }),
          },
        });

        // Block reveal
        gsap.set(element, {
          skewY: config.skewY,
          filter: `blur(${config.blur}px)`,
        });

        tl.to(
          element,
          {
            skewY: 0,
            filter: "blur(0px)",
            duration: 0.7,
            ease: config.ease,
          },
          0
        );

        // Letter animation
        gsap.set(split.chars, { opacity: 0, yPercent: config.yStart });

        tl.to(
          split.chars,
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.7,
            ease: config.ease,
            stagger: config.stagger,
          },
          0.1
        );
      }

      animateText(document.getElementById("hero-text"));
    </script>
  </body>
</html>
```

## 🎬 Animation Timeline

For `variant="once"`:

```
0.0s  → Container starts (blur, skew, scale)
0.1s  → First letter starts
0.16s → Second letter starts (stagger: 0.06)
0.22s → Third letter starts
...
1.05s → Container completes
~1.5s → All letters complete
```

For `variant="scrub"`:

```
Everything tied to scroll position
Scrub: 0.5 = smooth 500ms interpolation
User controls pace by scrolling
```

## 🔍 Debugging Tips

### Enable ScrollTrigger Markers

```typescript
scrollTrigger: {
  trigger: element,
  start: 'top 80%',
  markers: true,  // Shows visual markers
}
```

### Log Animation Timeline

```typescript
const tl = gsap.timeline({
  onStart: () => console.log("Animation started"),
  onComplete: () => console.log("Animation complete"),
  onUpdate: () => console.log("Progress:", tl.progress()),
});
```

### Check Split Results

```typescript
const split = new SplitType(element, { types: "chars" });
console.log("Character count:", split.chars.length);
console.log("Characters:", split.chars);
```

## 🚀 Performance Optimization

1. **Use will-change sparingly:**

   - Set before animation
   - Remove after completion

2. **Limit animated elements:**

   - Don't animate 100+ elements simultaneously
   - Consider reducing stagger for long text

3. **Test on mobile:**

   - Reduce blur amounts on mobile
   - Consider simpler animations

4. **Use scrub wisely:**
   - Scrub mode is more CPU intensive
   - Test performance on low-end devices

## 📚 Resources

- [GSAP Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Guide](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [SplitType Docs](https://github.com/lukePeavey/SplitType)
- [GSAP Easing Visualizer](https://gsap.com/docs/v3/Eases)
- [CSS Mask Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image)

## 🎨 Color & Gradient Examples

```tsx
// Gradient text
className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"

// Solid with shadow
className="text-6xl font-bold text-white drop-shadow-lg"

// Outlined text
style={{ WebkitTextStroke: '2px white', WebkitTextFillColor: 'transparent' }}
```

## 🤝 Contributing Ideas

Want to extend this? Consider adding:

- Word-by-word animation option
- Diagonal reveal directions
- Custom mask shapes
- Sound effects integration
- Multiple gradient wipe styles
- Character-specific delays
- Rotation animations
- Color transitions

---

**Built with ❤️ using Next.js, GSAP, SplitType, and Tailwind CSS**

_Experience the future of web typography_
