# Next.js + GSAP Advanced Text Animations

A cutting-edge web project showcasing **multi-layer text animations** using Next.js 16, Tailwind CSS v4, GSAP, and SplitType.

## ✨ What's New: Advanced Multi-Layer Animation System

Watch text come to life with a **three-layer animation** combining:

1. 🎯 **Per-letter animation** - Each character flies up individually
2. 🎭 **Block-level reveal** - Container un-blurs and un-skews
3. ✨ **Gradient wipe** - Polished shine sweeps top-to-bottom

![Animation Preview](https://img.shields.io/badge/Animation-Three%20Layers-purple?style=for-the-badge)
![GSAP](https://img.shields.io/badge/GSAP-3.12-green?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge)

## 🚀 Quick Start

```bash
cd /Users/rodrigo/Documents/longisland
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to see the animations in action!

## 🎬 Two Animation Variants

### Variant A: "once" - Play Once

Perfect for hero sections and headlines. Plays once when scrolling into view.

```tsx
<AnimatedTextAdvanced
  text="Dramatic Entrance"
  variant="once"
  stagger={0.06}
  ease="back.out(1.5)"
  blur={10}
  skewY={5}
/>
```

### Variant B: "scrub" - Scroll Synced

Cinematic reveals tied to scroll position. Smooth and interactive.

```tsx
<AnimatedTextAdvanced
  text="Scroll Synced Reveal"
  variant="scrub"
  stagger={0.08}
  ease="power4.out"
  scrubAmount={0.5}
/>
```

## 📖 Documentation

- **[ADVANCED_ANIMATIONS.md](./ADVANCED_ANIMATIONS.md)** - Complete guide to the advanced animation system
- **[/public/vanilla-text-animation.html](./public/vanilla-text-animation.html)** - Vanilla JS implementation

## 🎨 Component Usage

### Basic Example

```tsx
import AnimatedTextAdvanced from "@/app/components/AnimatedTextAdvanced";

<AnimatedTextAdvanced
  text="Your Amazing Text"
  as="h1"
  className="text-6xl font-bold text-white"
  variant="once"
/>;
```

### Advanced Example

```tsx
<AnimatedTextAdvanced
  text="Multi-Layer Magic"
  as="h1"
  className="text-8xl font-bold text-white"
  variant="once"
  // Letter animation
  stagger={0.06} // Delay between letters
  duration={0.7} // Animation duration
  ease="back.out(1.5)" // Easing function
  yStart={100} // Starting Y position
  // Block-level reveal
  blur={10} // Initial blur (px)
  skewY={5} // Skew angle (degrees)
  yPercent={10} // Y offset (%)
  scale={0.98} // Initial scale
  // Gradient wipe
  enableGradientWipe={true}
  wipeDuration={1.2}
  // ScrollTrigger
  triggerStart="top 80%"
  triggerEnd="top 30%"
/>
```

## 🎯 Key Features

### Three-Layer Animation System

| Layer          | Effect                         | Properties                   |
| -------------- | ------------------------------ | ---------------------------- |
| **1. Letters** | Individual character animation | opacity, yPercent, stagger   |
| **2. Block**   | Container reveal               | blur, skewY, scale, yPercent |
| **3. Wipe**    | Gradient overlay sweep         | CSS mask, top→bottom         |

### Accessibility ♿

✅ **Prefers-Reduced-Motion** - Automatic detection and fallback  
✅ **No Layout Shift** - Stable rendering with inline-block  
✅ **Screen Reader Friendly** - Readable text, no aria-hidden  
✅ **Performance** - will-change optimization, proper cleanup  
✅ **Contrast** - Maintained during animation

### Configuration Props

```typescript
interface AnimatedTextAdvancedProps {
  text: string;                      // Required
  as?: "h1" | "h2" | ... | "div";   // Semantic HTML
  className?: string;                // Tailwind classes
  variant?: "once" | "scrub";        // Animation mode

  // Letter animation
  stagger?: number;      // Default: 0.06
  duration?: number;     // Default: 0.7
  ease?: string;         // Default: "power4.out"
  yStart?: number;       // Default: 100

  // Block reveal
  blur?: number;         // Default: 8
  skewY?: number;        // Default: 5
  yPercent?: number;     // Default: 10
  scale?: number;        // Default: 0.98

  // Gradient wipe
  enableGradientWipe?: boolean;  // Default: true
  wipeDuration?: number;         // Default: 1.2

  // ScrollTrigger
  triggerStart?: string;   // Default: "top 80%"
  triggerEnd?: string;     // Default: "top 30%"
  scrubAmount?: number;    // Default: 0.5
}
```

## 🎨 Easing Options

```typescript
// Smooth & professional
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

## 📁 Project Structure

```
longisland/
├── app/
│   ├── components/
│   │   ├── AnimatedText.tsx           # Basic letter animation
│   │   └── AnimatedTextAdvanced.tsx   # Advanced multi-layer
│   ├── globals.css                    # Gradient wipe styles
│   ├── layout.tsx
│   └── page.tsx                       # Demo showcase
├── public/
│   └── vanilla-text-animation.html    # Vanilla JS version
├── ADVANCED_ANIMATIONS.md             # Complete documentation
├── README.md                          # This file
└── package.json
```

## 📦 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP 3.12+ with ScrollTrigger
- **Text Splitting**: SplitType
- **Package Manager**: npm

## 🎯 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌟 Real-World Use Cases

### Hero Sections

```tsx
<AnimatedTextAdvanced
  text="Welcome to the Future"
  variant="once"
  ease="back.out(1.5)"
  blur={12}
/>
```

### Product Showcases

```tsx
<AnimatedTextAdvanced
  text="Introducing Innovation"
  variant="scrub"
  ease="power4.out"
  scrubAmount={0.5}
/>
```

### Section Titles

```tsx
<AnimatedTextAdvanced
  text="Features"
  variant="once"
  stagger={0.03}
  duration={0.5}
/>
```

## 🔧 Customization Guide

### Stagger Timing

```tsx
stagger={0.02}   // Fast cascade
stagger={0.06}   // Balanced wave
stagger={0.12}   // Dramatic reveal
```

### Blur Intensity

```tsx
blur={5}    // Subtle
blur={10}   // Medium
blur={15}   // Dramatic
```

### ScrollTrigger Timing

```tsx
// Early trigger
triggerStart = "top 90%";
triggerEnd = "top 40%";

// Late trigger
triggerStart = "top 60%";
triggerEnd = "top 20%";

// Center trigger
triggerStart = "center center";
```

## 🎬 Animation Timeline

### "once" variant:

```
0.0s  → Container starts (blur, skew, scale)
0.1s  → First letter starts rising
0.16s → Second letter (stagger delay)
0.22s → Third letter
...
1.05s → Container animation completes
~1.5s → All letters complete
```

### "scrub" variant:

```
User controls pace by scrolling
Animation tied to scroll position
Reversible by scrolling back
```

## 📚 Resources

- [GSAP Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Guide](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [SplitType Docs](https://github.com/lukePeavey/SplitType)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [GSAP Easing Visualizer](https://gsap.com/docs/v3/Eases)

## 💡 Performance Tips

1. **Use will-change sparingly** - Set before animation, remove after
2. **Limit animated elements** - Don't animate 100+ elements at once
3. **Test on mobile** - Reduce blur on lower-end devices
4. **Choose variant wisely** - "scrub" is more CPU intensive

## 🔍 Debugging

Enable ScrollTrigger markers:

```typescript
scrollTrigger: {
  trigger: element,
  start: 'top 80%',
  markers: true,  // Shows visual debugging markers
}
```

## ♿ Accessibility Notes

### Reduced Motion Support

The component automatically detects and respects `prefers-reduced-motion`:

```typescript
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  return <Component>{text}</Component>;
}
```

### CSS Fallback

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🚀 Advanced Features

- ✅ Per-letter stagger animation
- ✅ Block-level blur/skew reveal
- ✅ Gradient wipe overlay
- ✅ Two animation variants (once/scrub)
- ✅ Full TypeScript support
- ✅ Prefers-reduced-motion support
- ✅ will-change optimization
- ✅ Proper cleanup on unmount
- ✅ No layout shift
- ✅ Screen reader friendly
- ✅ Configurable timing/easing
- ✅ Vanilla JS version included
- ✅ WebKit prefix support

## 🎨 Gradient Text Examples

```tsx
// Purple to Pink
className =
  "bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400";

// Blue to Purple
className =
  "bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400";

// Multi-color
className =
  "bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-pink-400 to-orange-400";
```

## 🤝 Contributing

Ideas for extensions:

- Word-by-word animation mode
- Diagonal reveal directions
- Custom mask shapes
- Sound effect integration
- Character rotation
- Color transitions

## 📄 License

This project is open source and available for educational purposes.

---

**Built with ❤️ using Next.js, Tailwind CSS, GSAP, and SplitType**

### Quick Links

- 🎬 [View Live Demo](http://localhost:3001)
- 📖 [Advanced Documentation](./ADVANCED_ANIMATIONS.md)
- 🔧 [Vanilla JS Version](./public/vanilla-text-animation.html)
- 💻 [Component Source](./app/components/AnimatedTextAdvanced.tsx)

_Experience the next level of web typography animations_
