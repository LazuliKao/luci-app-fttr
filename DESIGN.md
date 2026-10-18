# FTTR LuCI design system

## 1. Context
Authenticated router administration. Match the existing LuCI theme and FTTR views.
## 2. Tokens
Use theme-provided colors, fonts, spacing and `cbi-map`, `cbi-section`, `table`, `cbi-button` classes. No additional palette or font.
## 3. Layout
Device selector precedes device-specific sections. Sections stack on narrow screens. Tables live in horizontally scrollable containers.
## 4. Components
Native select, textarea, password and number inputs with visible labels. Native LuCI buttons and notification patterns. Raw content is text, never HTML.
## 5. States
Show optical and MQTT availability independently. Disable commands when no fresh binding exists. Loading, empty, malformed, failed and unknown-outcome states have explicit text.
## 6. Interaction
One action at a time per page. Poll jobs without replaying commands. Password fields clear immediately after submission. Refresh preserves command editor contents.
## 7. Verification
Check desktop and narrow layouts, Chinese/Unicode output, keyboard focus, stale selection, read errors and timeout outcomes in real LuCI. Use pnpm typecheck/lint/build; no Node tests.
