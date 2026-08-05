# Security System Bundle Builder

A responsive React prototype for configuring a personalized home security system.

The application recreates the provided Figma design as a four-step bundle builder with a synchronized live review panel.

## Features

- Four-step accordion bundle builder
- Product catalog rendered from JSON data
- Independent quantities for every product variant
- Synchronized quantity controls between product cards and the review panel
- Selected-product counters for every bundle step
- Pre-populated default configuration matching the provided design
- Dynamic original total, current total, and savings calculations
- Responsive desktop, tablet, and mobile layouts
- Client-side persistence using localStorage
- Ability to remove a previously saved configuration
- Checkout confirmation placeholder
- Accessible buttons, labels, focus states, and accordion attributes

## Bundle Steps

1. Choose your cameras
2. Choose your plan
3. Choose your sensors
4. Add extra protection

## Variant Behavior

Products with color options track every variant independently.

For example, a shopper can add two white cameras, switch to black, and add one black camera. Both variants remain selected and appear as separate items in the review panel.

## Getting Started

### Requirements

- Node.js
- npm

### Installation

```bash
git clone https://github.com/Elchihi/security-system-bundle-builder.git
cd security-system-bundle-builder
npm install
npm run dev