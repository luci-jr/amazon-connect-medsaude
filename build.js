/**
 * Med+Saúde - Build Script (Angular-Like Component Bundler)
 * Sincroniza o código fonte modular em src/ para a pasta de distribuição public/ e dist/
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const SRC_DIR = path.join(ROOT_DIR, 'src');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

function build() {
  console.log('⚡ Iniciando Build da Arquitetura Angular [Med+Saúde]...');

  // 1. Garantir diretórios de distribuição
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const publicCss = path.join(PUBLIC_DIR, 'css');
  const publicJs = path.join(PUBLIC_DIR, 'js');
  const publicImages = path.join(PUBLIC_DIR, 'images');
  const publicData = path.join(PUBLIC_DIR, 'data');

  [publicCss, publicJs, publicImages, publicData].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  // 2. Copiar index.html, manifest.json, favicon.ico para public/ com Cache-Buster dinâmico
  const cacheBuster = Date.now();
  let indexHtml = fs.readFileSync(path.join(SRC_DIR, 'index.html'), 'utf8');
  indexHtml = indexHtml.replace(/href="\.\/css\/style\.css(\?[^"]*)?"/g, `href="./css/style.css?v=${cacheBuster}"`);
  indexHtml = indexHtml.replace(/src="\.\/js\/app\.js(\?[^"]*)?"/g, `src="./js/app.js?v=${cacheBuster}"`);
  indexHtml = indexHtml.replace(/src="\.\/js\/chat-widget\.js(\?[^"]*)?"/g, `src="./js/chat-widget.js?v=${cacheBuster}"`);
  indexHtml = indexHtml.replace(/src="\.\/js\/data\.js(\?[^"]*)?"/g, `src="./js/data.js?v=${cacheBuster}"`);
  indexHtml = indexHtml.replace(/src="\.\/main\.js(\?[^"]*)?"/g, `src="./main.js?v=${cacheBuster}"`);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'index.html'), indexHtml, 'utf8');

  if (fs.existsSync(path.join(SRC_DIR, 'manifest.json'))) {
    fs.copyFileSync(path.join(SRC_DIR, 'manifest.json'), path.join(PUBLIC_DIR, 'manifest.json'));
  }

  if (fs.existsSync(path.join(SRC_DIR, 'favicon.ico'))) {
    fs.copyFileSync(path.join(SRC_DIR, 'favicon.ico'), path.join(PUBLIC_DIR, 'favicon.ico'));
  }

  // 3. Copiar CSS para public/css/
  if (fs.existsSync(path.join(SRC_DIR, 'styles.css'))) {
    fs.copyFileSync(path.join(SRC_DIR, 'styles.css'), path.join(publicCss, 'style.css'));
  }

  // 4. Copiar Assets (images e data)
  const srcImages = path.join(SRC_DIR, 'assets', 'images');
  if (fs.existsSync(srcImages)) {
    fs.readdirSync(srcImages).forEach(file => {
      fs.copyFileSync(path.join(srcImages, file), path.join(publicImages, file));
    });
  }

  const srcData = path.join(SRC_DIR, 'assets', 'data');
  if (fs.existsSync(srcData)) {
    fs.readdirSync(srcData).forEach(file => {
      fs.copyFileSync(path.join(srcData, file), path.join(publicData, file));
    });
  }

  const srcJs = path.join(SRC_DIR, 'assets', 'js');
  if (fs.existsSync(srcJs)) {
    fs.readdirSync(srcJs).forEach(file => {
      fs.copyFileSync(path.join(srcJs, file), path.join(publicJs, file));
    });
  }

  // 5. Copiar Main e Módulos da Arquitetura Angular para public/
  if (fs.existsSync(path.join(SRC_DIR, 'main.js'))) {
    fs.copyFileSync(path.join(SRC_DIR, 'main.js'), path.join(PUBLIC_DIR, 'main.js'));
  }

  function copiarDiretorioRecursivo(origem, destino) {
    if (!fs.existsSync(origem)) return;
    if (!fs.existsSync(destino)) fs.mkdirSync(destino, { recursive: true });
    fs.readdirSync(origem).forEach(item => {
      const srcItem = path.join(origem, item);
      const destItem = path.join(destino, item);
      if (fs.statSync(srcItem).isDirectory()) {
        copiarDiretorioRecursivo(srcItem, destItem);
      } else {
        fs.copyFileSync(srcItem, destItem);
      }
    });
  }

  copiarDiretorioRecursivo(path.join(SRC_DIR, 'app'), path.join(PUBLIC_DIR, 'app'));

  console.log('✅ Build concluído com sucesso! Distribuição pronta em ./public.');
}

build();
