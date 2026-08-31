// src/utils/seo/toolContent.js
// Natural, keyword-rich content builders for the 3 sections rendered under every
// tool ("How to Use", "Key Features & Benefits", "Frequently Asked Questions").
// Shared by:
//   - src/components/common/ToolContent.jsx   (runtime UI, FAQ rendered as accordion)
//   - scripts/prerender-static.mjs            (no-JS static snapshot)
// Every string interpolates the tool name so the copy reads naturally and is
// keyword-focused without feeling templated.

import { getToolProcessingProfile } from '../../data/toolProcessing.js';
import { toolContentData } from '../../data/toolContentData.js';

// ---------------------------------------------------------------------------
// Unique per-tool editorial content (about / formats / limits), authored in
// data/toolContentData.js. These builders are the single source used by the
// runtime UI (ToolContent.jsx), the FAQ generators (schema.js) and the static
// prerender pipeline, so all three stay in sync.
// ---------------------------------------------------------------------------
export function buildAbout(tool) {
  const entry = toolContentData[tool.id];
  if (entry?.about) return entry.about;
  // Fallback for any tool added without an editorial entry yet.
  const profile = getToolProcessingProfile(tool);
  return `${tool.description} ${profile.disclosure}`;
}

export function buildFormats(tool) {
  return toolContentData[tool.id]?.formats || '';
}

export function buildLimits(tool) {
  return toolContentData[tool.id]?.limits || [];
}

// ---------------------------------------------------------------------------
export function getProcessingDisclosure(tool) {
  return getToolProcessingProfile(tool).disclosure;
}

export function isBackendTool(tool) {
  return getToolProcessingProfile(tool).kind === 'backend';
}

// How to Use [Tool Name] — <h2> + <ol> step-by-step guide
// ---------------------------------------------------------------------------
export function buildHowToSteps(tool) {
  const { name, category } = tool;
  const profile = getToolProcessingProfile(tool);

  if (profile.kind === 'backend') {
    return [
      `Paste a supported YouTube or social video URL into the ${name} input.`,
      profile.step,
      'Choose one of the returned video qualities; only formats actually fetched for that URL are shown.',
      'Download the video or choose MP4/MP3 conversion, depending on the output you need.',
      'Use only videos you own or have permission to download, and avoid submitting private links.',
    ];
  }

  if (profile.kind !== 'local') {
    return [
      `Open the ${name} tool and provide the input it requests.`,
      profile.step,
      'Choose the available options and run the tool.',
      'Review the result shown in the browser.',
      'Use the output for your task and avoid submitting sensitive information to external services.',
    ];
  }

  switch (category) {
    case 'converter':
      return [
        `Open the free ${name} tool above — no account, no signup, and nothing to install.`,
        `Select the unit or format you want to convert from and the one you want to convert to from the dropdowns.`,
        `Type or paste the value you need to convert into the input field.`,
        `Watch the result update instantly, or click Convert to see the precise answer right away.`,
        `Copy the outcome, tweak your value, or repeat as many times as you like — the ${name} is completely free.`,
      ];

    case 'calculator':
      return [
        `Open the ${name} on this page — it loads instantly in your browser.`,
        `Enter the numbers and values the tool asks for into the labelled fields.`,
        `Choose your unit or option from any dropdowns to match your situation.`,
        `Hit Calculate (or let the result update live) to get an accurate answer in seconds.`,
        `Review the breakdown and use it again for free as often as you need.`,
      ];

    case 'pdf':
    case 'image':
    case 'media':
      return [
        `Open the free ${name} tool on this page — this operation processes your input in the browser.`,
        `Upload or drop your file into the upload area using the button or drag-and-drop.`,
        `Adjust any options you need, such as quality, format, or output settings.`,
        `Click the Convert / Process button and wait a moment while the tool works in your browser.`,
        `Download your finished file instantly. You can repeat this as many times as you like at no cost.`,
      ];

    case 'developer':
      return [
        `Open the ${name} tool at the top of this page — it is free and needs no login.`,
        `Paste your code, data, or configuration into the main text area.`,
        `Choose any options that apply, such as formatting rules or output type.`,
        `Run the tool to see the result, which updates instantly in the output panel.`,
        `Copy the cleaned or converted output and reuse the ${name} whenever you need it.`,
      ];

    case 'text':
    default:
      return [
        `Open the handy ${name} on this page — it starts working the moment it loads.`,
        `Type, paste, or load the text you want to work with into the main input box.`,
        `Pick the option you need, such as the format, case, or mode you want to apply.`,
        `The result appears instantly and updates live as you type.`,
        `Copy your final text or keep experimenting — the ${name} is free and unlimited.`,
      ];
  }
}

// ---------------------------------------------------------------------------
// Key Features & Benefits — <h2> + <ul> (4-5 keyword-rich bullets)
// ---------------------------------------------------------------------------
export function buildFeatures(tool) {
  const { name } = tool;
  const profile = getToolProcessingProfile(tool);
  if (profile.kind !== 'local') {
    return [
      profile.feature,
      profile.disclosure,
      `Use ${name} without an account or installation.`,
      'Review the result before using or sharing it.',
      'Avoid submitting private or sensitive information to external services.',
    ];
  }
  return [
    `100% free ${name} — no signup, no watermarks, and no hidden fees, ever.`,
    `Instant, accurate results that update live right inside your browser.`,
    `Works on any device — desktop, tablet, or mobile — with zero installation.`,
    profile.feature,
    `Unlimited use with a clean, simple interface designed for speed.`,
  ];
}
