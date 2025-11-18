# Quick Start Guide

**Get your first executive presentation in under 5 minutes**

---

## 1. Start a Conversation (30 seconds)

In your Claude Code session, invoke the skill:

```
I need an executive presentation for [your topic]
```

**Examples:**
- "I need an executive presentation for our Q2 product launch approval"
- "Help me create a board presentation for budget approval"
- "Generate a quarterly business review for my executive team"

---

## 2. Answer Discovery Questions (2-3 minutes)

Claude will ask you about:

### Presentation Purpose
- What decision are you influencing?
- What action do you want from your audience?

**Example answer:**
> "I need board approval to launch our new product line in Q2 2025. I want them to approve the $2M budget and greenlight the go-to-market plan."

### Audience
- Who will see this? (Board, C-suite, investors, etc.)
- How much time do you have?

**Example answer:**
> "This is for our Board of Directors. I have a 20-minute slot at our monthly board meeting."

### Content & Data
- What's your key recommendation?
- What metrics/data support it?

**Example answer:**
> "Recommend launching Product X in Q2. We've identified a $50M market opportunity, have 3 pilot customers ready, and project $8M revenue in year one. We need $2M for development and go-to-market."

### Brand (Optional)
- Custom colors, fonts, logo?

**Example answer:**
> "Use our brand colors: Primary #FF5733, Secondary #2E4057. No logo needed."

**OR simply:**
> "Use default professional styling."

---

## 3. Receive Your Presentation (30-60 seconds)

Claude generates both formats:

### You'll Get:
1. **Interactive HTML Dashboard** (`presentation-name-dashboard.html`)
2. **PowerPoint Outline** (`presentation-name-slides.md`)
3. **Quick Start Guide** (usage instructions)

---

## 4. Review & Use (1-2 minutes)

### HTML Dashboard
1. **Open** the `.html` file in your browser (Chrome, Firefox, Safari, or Edge)
2. **Review** the interactive data visualizations
3. **Share** by email or web hosting
4. **Print** using Cmd/Ctrl+P for handouts

**Perfect for:**
- Email to stakeholders
- Async review before meeting
- Handouts during presentation
- Deep dive Q&A reference

### PowerPoint Outline
1. **Open** the `.md` file in any text editor
2. **Copy** content into PowerPoint/Keynote/Google Slides
3. **Format** slides based on visual descriptions
4. **Practice** using the provided scripts (60-90 sec per slide)

**Perfect for:**
- Live presentations
- Board meetings
- Stakeholder briefings
- Pitch sessions

---

## 5. Customize (Optional)

### HTML Dashboard Customization

**Change colors:**
1. Open the `.html` file in a text editor
2. Find the `:root {` section near the top
3. Update color values:
   ```css
   :root {
       --color-primary: #YourColor;
       --color-partnerships: #YourColor;
   }
   ```
4. Save and refresh in browser

**Update data:**
1. Find the JavaScript section at the bottom
2. Locate chart data arrays (e.g., `data: [1200, 1500, 1800]`)
3. Update values
4. Save and refresh

### PowerPoint Customization

**Adjust slides:**
- Add/remove slides as needed
- Modify scripts to match your speaking style
- Include your own visuals and charts
- Adjust timing based on your presentation slot

---

## Common Workflows

### Workflow 1: Board Presentation

```
You: "I need a board presentation to approve our $3M budget increase for AI initiatives"

Claude: [Asks discovery questions]

You: [Provides details about ROI, timeline, risks]

Claude: [Generates both formats]

You:
1. Open HTML dashboard to verify data accuracy
2. Email HTML to board members for async review
3. Use PowerPoint outline to create slide deck
4. Practice presentation using provided script
5. Present confidently with backup HTML for Q&A
```

### Workflow 2: Quarterly Business Review

```
You: "Generate a QBR presentation for my Q4 performance review"

Claude: [Asks about KPIs, initiatives, audience]

You: [Shares Q4 metrics and department updates]

Claude: [Generates dashboard with trend charts + slide outline]

You:
1. Review HTML to ensure all metrics are correct
2. Print HTML for handouts
3. Create slides from outline
4. Present to executive team
5. Send HTML dashboard link for follow-up questions
```

### Workflow 3: Quick Pitch (Time-Constrained)

```
You: "I have 1 hour to create a 10-minute investor pitch. Help!"

Claude: "Let's focus on the essentials. What's your ask and key metrics?"

You: [Provides core info quickly]

Claude: [Generates streamlined 6-8 slide outline + simple HTML]

You:
1. Copy outline directly into slides
2. Skip HTML customization for now
3. Practice with script
4. Present and iterate based on feedback
```

---

## Tips for Best Results

### Before You Start
- [ ] Know your objective (what decision are you influencing?)
- [ ] Have your data/metrics ready (revenue, costs, timelines, etc.)
- [ ] Understand your audience (Board? C-suite? Team?)
- [ ] Know your time constraint (10 min pitch vs 30 min deep dive)

### During Discovery
- [ ] Be specific (vague inputs = generic outputs)
- [ ] Provide numbers (quantify everything you can)
- [ ] Mention constraints (budget limits, deadlines, risks)
- [ ] Share context (why this matters now)

### After Receiving Output
- [ ] Verify all data for accuracy
- [ ] Test HTML in your browser
- [ ] Practice PowerPoint script out loud
- [ ] Time yourself (aim for 60-90 sec per slide)
- [ ] Prepare for anticipated questions (use Q&A section)

### When Presenting
- [ ] Start with your recommendation (don't bury the lead)
- [ ] Use visuals (pull up HTML dashboard for deep dives)
- [ ] Stick to the script (designed for executive pacing)
- [ ] End with clear action items

---

## Troubleshooting

### "Charts aren't loading in the HTML"
**Solution:** Check your internet connection. Charts load from CDN (Chart.js). If offline, charts will show fallback message.

### "HTML looks different on mobile"
**Solution:** This is expected! The dashboard is responsive and adapts to screen size. Desktop view is recommended for full experience.

### "PowerPoint formatting is lost when I paste"
**Solution:** Use "Keep Text Only" when pasting, then apply PowerPoint formatting. The outline provides structure, you add visual polish.

### "I need to change data after generation"
**Solution:** Edit the HTML file directly (find data arrays in JavaScript section) or ask Claude to regenerate with updated numbers.

### "Presentation is too long/short"
**Solution:** Tell Claude your specific time constraint and slide count preference. Example: "Make this a 10-slide, 15-minute presentation."

---

## Advanced Quick Starts

### Multi-Audience Versions

Create different versions for different stakeholders:

```
You: "Create three versions of this presentation:
1. Board version (high-level, 10 min)
2. Team version (detailed, 30 min)
3. Investor version (growth-focused, 15 min)"

Claude: [Generates tailored versions for each audience]
```

### Brand Consistency

Set up your brand once, reuse forever:

```
You: "Use these brand guidelines for all my presentations:
- Primary: #0B5FD0
- Secondary: #6D4ACD
- Font: Inter
- Logo: [attach or describe]"

Claude: [Saves preferences, applies to all future presentations]
```

### Data Integration

Connect to live data sources:

```
You: "Here's my Q4 data CSV. Create a QBR presentation using this data."
[Attach file]

Claude: [Parses data, generates presentation with accurate charts]
```

---

## What to Expect

### First-Time Users (5 minutes)
1. Invoke skill (30 sec)
2. Answer questions (2-3 min)
3. Receive output (30-60 sec)
4. Review both formats (1-2 min)

### Experienced Users (2-3 minutes)
1. Invoke with detailed prompt (1 min)
   - "Create board presentation for Product X launch. Board meeting next week, 20-min slot. Need approval for $2M budget. Market is $50M, we project $8M Y1 revenue. Have 3 pilot customers. Use brand colors #FF5733 and #2E4057."
2. Receive output (30-60 sec)
3. Quick review and customize (1-2 min)

### Power Users (< 1 minute)
1. Invoke with comprehensive prompt including all details
2. Receive output
3. Use as-is or make minor tweaks

---

## Next Steps

### After Your First Presentation

**If it went well:**
- Save as a template for similar future presentations
- Share the skill with your team
- Explore advanced customization options
- Try multi-audience versions

**If you need improvements:**
- Ask Claude to iterate on specific sections
- Request different visualizations
- Adjust tone/formality level
- Add more data points or remove some

### Learn More

- **README.md** - Full feature overview and use cases
- **IMPLEMENTATION-GUIDE.md** - Technical deep dive for customization
- **EXAMPLES.md** - Real-world examples and templates

---

## Example: Complete 5-Minute Workflow

**Scenario:** Need board approval for new product launch

**Minute 1:**
```
You: "I need a board presentation for Product X launch approval.
20-minute slot. Need $2M budget. Market is $50M, we project $8M
Y1 revenue. Launch date Q2 2025. Use professional blue theme."
```

**Minute 2-3:**
```
Claude: [Asks clarifying questions about competition, risks, timeline]

You: [Provides: 3 main competitors, tech complexity risk,
6-month go-to-market plan, 5 new hires needed]
```

**Minute 4:**
```
Claude: [Generates HTML dashboard + 10-slide PowerPoint outline with scripts]
```

**Minute 5:**
```
You:
- Open HTML ✓ (looks great)
- Verify numbers ✓ (all accurate)
- Skim PowerPoint outline ✓ (strong narrative)
```

**Next 10 minutes (optional):**
- Copy outline into PowerPoint
- Add company logo
- Practice presentation once
- **Ready to present!**

---

## Success Metrics

You'll know this skill is working when:

- ✅ Preparation time drops from hours to minutes
- ✅ Presentations get approved faster
- ✅ Stakeholders compliment clarity and data
- ✅ You feel confident presenting
- ✅ Q&A sessions are easier (HTML dashboard as backup)
- ✅ Consistent quality across all your presentations

---

## Get Help

**During your session:**
```
"Can you adjust the presentation to focus more on ROI?"
"Make this more concise - target 10 slides instead of 15"
"Add a competitive analysis section"
"Change the color scheme to be more conservative"
```

**For technical issues:**
- Check browser console for errors (F12 in most browsers)
- Try different browser (Chrome recommended)
- Ensure internet connection for Chart.js CDN

**For content improvements:**
- Be specific about what to change
- Provide additional data if needed
- Request different visualizations
- Ask for alternative phrasing

---

**You're ready! Start your first presentation now.**

```
I need an executive presentation for [your topic]
```

*From idea to board-ready presentation in under 5 minutes.*
