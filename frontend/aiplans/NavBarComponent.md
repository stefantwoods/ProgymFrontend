# Nav Bar Component Plan (Tailwind + CDK)

Goal: Build a beginner-friendly nav bar component that matches the mock. The nav bar is the top box with "Fable Workshop" on the left and "Back to Mockups" on the right. Styling should use Tailwind utilities and Angular CDK patterns where appropriate.

## Step 1: Locate where components live
- Find the existing layout or header components so the new nav bar fits the project structure.
- Look for Tailwind setup and any CDK usage patterns (e.g., overlays, focus, a11y helpers).

Example (find layout/header files):
```bash
rg --files -g "*layout*" -g "*header*" src
```

Why this helps:
These files show where a shared header should live and how other UI pieces are organized.

Docs:
- Tailwind docs: https://tailwindcss.com/docs
- Angular CDK overview: https://material.angular.io/cdk/categories

## Step 2: Define the visual spec from the mock
Create a short checklist of what the nav bar needs:
- Dark, slightly translucent container
- Subtle border and soft shadow
- Left aligned brand text + small icon
- Right aligned link text
- Rounded corners and spacing that matches the mock

Example spec (write this in a note for yourself):
```
Container: dark bg, subtle border, soft shadow, rounded-lg, px-4 py-2
Left: icon + "Fable Workshop", medium font, muted text
Right: link text, smaller, muted, hover to brighter
```

Why this helps:
Having a short spec keeps your Tailwind class choices focused.

Docs:
- Tailwind layout: https://tailwindcss.com/docs/display
- Tailwind spacing: https://tailwindcss.com/docs/padding
- Tailwind borders/shadows: https://tailwindcss.com/docs/border-width and https://tailwindcss.com/docs/box-shadow

## Step 3: Create the component skeleton
- Add a new component file (e.g., `navbar.component.ts/html/css`) or the equivalent for your framework.
- Keep it simple: a container `nav` with two flex items.
- Decide which parts should be props/inputs (e.g., title, link label, link href).

Example Angular component skeleton:
```ts
// src/app/components/navbar/navbar.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() title = 'Fable Workshop';
  @Input() backLabel = 'Back to Mockups';
  @Input() backHref = '/mockups';
}
```

```html
<!-- src/app/components/navbar/navbar.component.html -->
<nav class="w-full">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="inline-block h-4 w-4 rounded-sm bg-violet-500"></span>
      <span class="text-sm font-medium text-slate-200">{{ title }}</span>
    </div>
    <a class="text-xs text-slate-400 hover:text-slate-200" [href]="backHref">
      {{ backLabel }}
    </a>
  </div>
</nav>
```

Why this helps:
Inputs make the component reusable, and a simple flex layout matches the mock.

Docs:
- Angular component basics (if Angular): https://angular.io/guide/component-overview

## Step 4: Apply Tailwind + CDK styling
- Use Tailwind for layout, colors, and spacing.
- Use CDK utilities only if they help (e.g., FocusMonitor for accessible link focus).
- Keep classes readable and grouped (layout, spacing, color, effects).

Example Tailwind container styling (drop into the `<nav>` wrapper):
```html
<nav
  class="mx-auto w-full max-w-5xl rounded-lg border border-slate-800/60
         bg-slate-900/60 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
  ...
</nav>
```

Optional CDK focus monitoring (only if you need custom focus styling):
```ts
// navbar.component.ts
import { AfterViewInit, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';

export class NavbarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('backLink', { static: true }) backLink!: ElementRef<HTMLElement>;

  constructor(private focusMonitor: FocusMonitor) {}

  ngAfterViewInit(): void {
    this.focusMonitor.monitor(this.backLink);
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.backLink);
  }
}
```

```html
<a #backLink class="text-xs text-slate-400 hover:text-slate-200" [href]="backHref">
  {{ backLabel }}
</a>
```

Why this helps:
Tailwind handles the look fast; CDK FocusMonitor keeps focus handling accessible if you customize focus styles.

Docs:
- Tailwind typography: https://tailwindcss.com/docs/font-size
- Tailwind colors: https://tailwindcss.com/docs/customizing-colors
- CDK a11y FocusMonitor: https://material.angular.io/cdk/a11y/overview

## Step 5: Wire it into the page
- Import and render the component in the correct layout page.
- Verify alignment, spacing, and responsiveness.

Example usage in a page template:
```html
<app-navbar
  title="Fable Workshop"
  backLabel="Back to Mockups"
  backHref="/mockups">
</app-navbar>
```

Why this helps:
Wiring it once in a shared layout keeps the nav consistent across pages.

Docs:
- Tailwind responsive design: https://tailwindcss.com/docs/responsive-design

## Step 6: Quick visual check
- Compare with the mock: top padding, text size, icon size, spacing between left/right items.
- Adjust classes to get the same visual weight.

Example tweaks to try:
```html
<!-- Make title slightly larger and the right link smaller -->
<span class="text-base font-medium text-slate-200">{{ title }}</span>
<a class="text-[11px] text-slate-400 hover:text-slate-200" [href]="backHref">
  {{ backLabel }}
</a>
```

## Optional: Make it reusable
- Add inputs for brand text and link target.
- Add an optional icon slot.

Example optional icon slot:
```html
<div class="flex items-center gap-2">
  <ng-content select="[navbarIcon]"></ng-content>
  <span class="text-sm font-medium text-slate-200">{{ title }}</span>
 </div>
```

Why this helps:
`ng-content` lets you swap icons without changing the component.

Docs:
- Angular inputs: https://angular.io/guide/inputs-outputs
