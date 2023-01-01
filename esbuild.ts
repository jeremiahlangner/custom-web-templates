import { build } from 'esbuild';

build({
  entryPoints: [
  ],
  platform: 'browser',
  outdir: 'dist',
  minify: true,
  bundle: true,
}).catch(e => {
  console.log(e);
  process.exit(1);
});
