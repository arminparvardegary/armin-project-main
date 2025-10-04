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

        // Create a public/ directory for Vercel and copy necessary files
        const publicDir = path.join(projectRoot, 'public');
        if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

        // Copy index.html
        const indexSrc = path.join(projectRoot, 'index.html');
        const indexDest = path.join(publicDir, 'index.html');
        if (fs.existsSync(indexSrc)) fs.copyFileSync(indexSrc, indexDest);

        // Copy dist/output.css into public/dist/output.css
        const publicDist = path.join(publicDir, 'dist');
        if (!fs.existsSync(publicDist)) fs.mkdirSync(publicDist, { recursive: true });
        fs.copyFileSync(outPath, path.join(publicDist, 'output.css'));

        // Copy top-level image assets (.png, .jpg, .jpeg, .svg, .webp) into public/
        const files = fs.readdirSync(projectRoot);
        const assetExt = /\.(png|jpe?g|svg|webp)$/i;
        for (const f of files) {
            if (assetExt.test(f)) {
                const src = path.join(projectRoot, f);
                const dest = path.join(publicDir, f);
                try {
                    fs.copyFileSync(src, dest);
                } catch (e) {
                    // ignore copy errors for non-files
                }
            }
        }

        console.log('Copied build output and assets to', publicDir);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

build();
