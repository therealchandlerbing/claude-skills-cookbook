# Template Reference

This directory contains references to base templates for generating presentations.

---

## HTML Dashboard Template Reference

The **360 Impact Brief** files in the root directory serve as the reference implementation for HTML dashboards:

### Reference Files
- **HTML Structure**: `/360-impact-brief-production.html`
- **JavaScript Module**: `/360-impact-brief.js`
- **Documentation**: `/360-IMPACT-BRIEF-README.md`

### Why These Are Reference Templates

The 360 Impact Brief represents a **production-ready, fully-featured HTML dashboard** that demonstrates all the patterns and best practices used in this skill:

#### Code Quality
- ✅ Separated JavaScript module (32KB standalone file)
- ✅ Comprehensive error handling
- ✅ Production-ready logging system
- ✅ Proper initialization sequence
- ✅ Modular code organization
- ✅ IIFE pattern preventing global namespace pollution

#### User Experience
- ✅ Mobile hamburger menu
- ✅ Touch-friendly interactions
- ✅ Loading spinners for all charts
- ✅ Toast notification system (4 types: success, error, warning, info)
- ✅ Enhanced hover effects
- ✅ Smooth transitions throughout

#### Performance
- ✅ CDN integrity hashes (SRI)
- ✅ DNS prefetching
- ✅ Intelligent chart loading with retry logic
- ✅ Debounced scroll handlers
- ✅ CSS containment
- ✅ GPU-accelerated animations

#### Accessibility
- ✅ WCAG AA compliant
- ✅ Comprehensive ARIA labels
- ✅ Enhanced keyboard navigation
- ✅ Focus management
- ✅ Skip to main content link
- ✅ Semantic HTML5
- ✅ Screen reader optimized

---

## How to Use These References

When generating new presentations, Claude should:

1. **Use the HTML structure** from `360-impact-brief-production.html` as the base template
2. **Adapt the JavaScript patterns** from `360-impact-brief.js` for chart initialization and interactivity
3. **Follow the same CSS architecture** (design tokens, responsive breakpoints, component patterns)
4. **Maintain the same quality standards** documented in the 360 Impact Brief README

---

## Template Adaptation Guidelines

### When Creating New Presentations

#### Always Include
- Same head structure (meta tags, fonts, CDN resources with SRI)
- Same accessibility features (skip link, ARIA labels, semantic HTML)
- Same responsive breakpoints (mobile < 768px, tablet 768-1024px, desktop 1024px+)
- Same error handling patterns (Chart.js load detection, graceful degradation)
- Same performance optimizations (debounced handlers, CSS containment)

#### Customize Based on Content
- Section structure (match to user's presentation outline)
- Chart types (bar, line, doughnut based on data)
- Color scheme (use brand customization if provided)
- Metrics and KPIs (tailored to use case)
- Timeline events (specific to project/initiative)

#### Adapt for Audience
- **Board presentations**: High-level metrics, strategic focus, minimal sections
- **Team presentations**: Detailed breakdowns, tactical actions, more sections
- **Investor presentations**: Financial focus, growth metrics, ROI emphasis
- **Customer presentations**: Value delivered, partnership focus, success stories

---

## PowerPoint Outline Template Reference

### Standard Structure

Every PowerPoint outline should follow this structure:

```markdown
# [Presentation Title]
**Audience**: [Target audience]
**Duration**: [Estimated time]
**Presenter**: [Name/role]
**Date**: [Presentation date]
**Objective**: [What decision/action you're driving]

---

## Slide 1: Title Slide
**Visual**: [Description]
**Script**: "[Word-for-word script]"
**Speaking Notes**: [Delivery tips]

## Slide 2: Executive Summary (The Recommendation)
**Visual**: [Description with big numbers, headline]
**Script**: "[Start with recommendation, then support]"
**Speaking Notes**: [Emphasis points, pause timing]
**Q&A Anticipation**: [Expected questions with answers]

## Slide 3-N: [Supporting Slides]
[Continue pattern...]

## Appendix: [Backup Slides]
[Details for deep dives during Q&A]

---

## Pre-Presentation Checklist
- [ ] Practice full presentation 2-3 times
- [ ] Time yourself (aim for 60-90 seconds per slide)
[...]

## Post-Presentation Follow-Up
- [ ] Send deck within 24 hours
[...]
```

### Slide Design Principles

**Rule of 6**:
- Maximum 6 bullets per slide
- Maximum 6 words per bullet

**Visual Hierarchy**:
1. Slide title (28-32pt)
2. Main content (18-24pt)
3. Supporting details (14-16pt)
4. Footer (10-12pt)

**Contrast Requirements**:
- Text contrast ≥ 4.5:1 for readability
- Dark on light OR light on dark (never low contrast)

---

## Chart Template Patterns

### Reference Chart.js Configurations

All chart configurations should follow the patterns in `/360-impact-brief.js`:

#### Bar Chart Pattern
- Used for: Comparisons across categories
- Example: Revenue by quarter, Performance by department
- Colors: Use brand primary with consistent opacity
- Responsive: Maintain readability on mobile

#### Line Chart Pattern
- Used for: Trends over time
- Example: Growth trajectory, KPI trends
- Style: Smooth curves (tension: 0.4), filled area
- Interactive: Hover tooltips with formatted numbers

#### Doughnut Chart Pattern
- Used for: Proportions of a whole
- Example: Budget breakdown, Market share
- Legend: Position bottom with adequate padding
- Colors: Use distinct brand colors for each segment

---

## CSS Design System

### Reference Design Tokens

Use these CSS custom properties (from 360 Impact Brief):

```css
:root {
    /* Brand Colors */
    --color-primary: #0B5FD0;
    --color-partnerships: #6D4ACD;
    --color-operations: #047857;
    --color-strategy: #DC6B0A;

    /* Semantic Colors */
    --color-critical: #C81E1E;
    --color-warning: #D97706;
    --color-success: #059669;
    --color-info: #0EA5E9;

    /* Typography */
    --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-size-base: 0.9375rem; /* 15px */

    /* Spacing Scale (8px system) */
    --space-xs: 0.25rem;   /* 4px */
    --space-sm: 0.5rem;    /* 8px */
    --space-md: 1rem;      /* 16px */
    --space-lg: 1.5rem;    /* 24px */
    --space-xl: 2rem;      /* 32px */
}
```

### Component Patterns

Reference component CSS from the 360 Impact Brief for:
- Info cards with hover effects
- Section headers with gradients
- Loading spinners
- Toast notifications
- Mobile menu (hamburger)
- Navigation (sidebar + mobile)
- Timeline visualizations
- Collapsible sections

---

## JavaScript Pattern Library

### Reference Patterns from 360-impact-brief.js

#### IIFE Pattern
```javascript
(function() {
    'use strict';
    // All code here, prevents global pollution
})();
```

#### Configuration Object
```javascript
const CONFIG = {
    DEBUG: false,
    TOAST_DURATION: 3000,
    CHART_ANIMATION_DURATION: 750
};
```

#### Logger Utility
```javascript
const log = {
    info: (...args) => CONFIG.DEBUG && console.log('[INFO]', ...args),
    warn: (...args) => CONFIG.DEBUG && console.warn('[WARN]', ...args),
    error: (...args) => console.error('[ERROR]', ...args)
};
```

#### Chart Initialization with Error Handling
```javascript
function initializeCharts() {
    if (typeof Chart === 'undefined') {
        log.error('Chart.js not loaded');
        toast.show('Charts could not be loaded', 'error');
        return;
    }
    try {
        createCharts();
    } catch (error) {
        log.error('Error initializing charts:', error);
        toast.show('Error loading charts', 'error');
    }
}
```

---

## Quality Standards

Every generated presentation must meet these standards (from PRODUCTION-READINESS.md):

### Content Quality
- [ ] Recommendation stated in first sentence
- [ ] All claims supported by data
- [ ] Logical narrative flow
- [ ] Executive-appropriate language
- [ ] Action items specific and achievable

### Technical Quality
- [ ] Renders in Chrome, Firefox, Safari, Edge
- [ ] No JavaScript console errors
- [ ] All charts load successfully
- [ ] Responsive on mobile, tablet, desktop
- [ ] Print layout works

### Accessibility Quality
- [ ] Color contrast ≥ 4.5:1
- [ ] All images have alt text
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] ARIA labels on dynamic content

---

## Brand Customization Process

When user provides brand guidelines:

1. **Replace CSS variables** in `:root` with brand colors
2. **Update font stack** with brand fonts (with fallbacks)
3. **Integrate logo** (header or specified placement)
4. **Apply spacing preferences** if provided
5. **Maintain accessibility** (verify contrast after color changes)

Example:
```css
:root {
    --color-primary: #FF5733;        /* User's brand primary */
    --color-partnerships: #2E4057;   /* User's brand secondary */
    --font-family-base: 'Montserrat', var(--font-family-base);
}
```

---

## Adaptive Patterns by Use Case

### Product Launch Presentation
- Focus on: Market opportunity, competitive advantage, financial projections
- Charts: Market size (doughnut), revenue projection (bar), timeline (custom)
- Slides: 8-12, emphasis on recommendation and ROI

### Quarterly Business Review
- Focus on: Performance metrics, trends, initiative status, next quarter plan
- Charts: KPI trends (line), department breakdown (bar), status tracker (custom)
- Slides: 12-18, comprehensive with multiple data visualizations

### Budget Approval
- Focus on: Investment ask, ROI analysis, resource requirements, risk mitigation
- Charts: Cost breakdown (doughnut), ROI timeline (line), scenario comparison (bar)
- Slides: 10-15, financial emphasis

### Risk Assessment
- Focus on: Threat identification, impact analysis, mitigation plan, action timeline
- Charts: Risk matrix (scatter/custom), impact breakdown (bar), timeline (custom)
- Slides: 6-8, urgent and action-oriented

---

## File Naming Conventions

### Output Files

**HTML Dashboard**:
- Format: `[presentation-topic]-dashboard.html`
- Example: `product-launch-q2-2025-dashboard.html`
- Keep kebab-case, descriptive, date if relevant

**PowerPoint Outline**:
- Format: `[presentation-topic]-slides-outline.md`
- Example: `product-launch-q2-2025-slides-outline.md`
- Matching name to HTML file for easy pairing

**Quick Start Guide** (if customized):
- Format: `[presentation-topic]-quick-start.md`
- Example: `product-launch-q2-2025-quick-start.md`

---

## Version Control

When making improvements to templates:

1. Document change in CHANGELOG.md
2. Update IMPLEMENTATION-GUIDE.md if patterns change
3. Add examples to EXAMPLES.md if new use case
4. Increment version following semver (MAJOR.MINOR.PATCH)

---

## Additional Resources

- **Full Technical Reference**: See ../IMPLEMENTATION-GUIDE.md
- **Quality Standards**: See ../PRODUCTION-READINESS.md
- **Real-World Examples**: See ../EXAMPLES.md
- **User Documentation**: See ../README.md

---

**These reference templates represent production-ready quality. Use them as the foundation for all generated presentations.**

*Last updated: 2025-01-18*
