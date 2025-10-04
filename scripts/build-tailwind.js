#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

async function build() {
  try {
    const projectRoot = path.resolve(__dirname, '..');
    const inputPath = path.join(projectRoot, 'src', 'input.css');
    const outDir = path.join(projectRoot, 'dist');
    const outPath = path.join(outDir, 'output.css');

    if (!fs.existsSync(inputPath)) {
      console.error(`Input CSS not found: ${inputPath}`);
      process.exit(1);
    }

    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const css = fs.readFileSync(inputPath, 'utf8');

    const result = await postcss([
      tailwind({ config: path.join(projectRoot, 'tailwind.config.cjs') }),
      autoprefixer,
    ]).process(css, { from: inputPath, to: outPath });

    fs.writeFileSync(outPath, result.css, 'utf8');
    if (result.map) fs.writeFileSync(outPath + '.map', result.map.toString());

    console.log('Built', outPath);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

build();
