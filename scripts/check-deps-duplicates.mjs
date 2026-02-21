#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const templatesDir = path.join(root, 'templates');

function listPackageJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listPackageJsonFiles(full));
      continue;
    }
    if (entry.isFile() && entry.name === 'package.json' && full.includes(`${path.sep}skeleton${path.sep}`)) {
      files.push(full);
    }
  }
  return files;
}

function parseRawDuplicateKeys(raw, sectionName) {
  const sectionRegex = new RegExp(`"${sectionName}"\\s*:\\s*\\{([\\s\\S]*?)\\}`, 'm');
  const match = raw.match(sectionRegex);
  if (!match) return [];

  const seen = new Map();
  const dupes = [];
  const lineRegex = /"([^"]+)"\s*:/g;
  let lineMatch;
  while ((lineMatch = lineRegex.exec(match[1])) !== null) {
    const pkg = lineMatch[1];
    const count = (seen.get(pkg) || 0) + 1;
    seen.set(pkg, count);
    if (count === 2) dupes.push(pkg);
  }
  return dupes;
}

function validatePackage(pkgPath) {
  const raw = fs.readFileSync(pkgPath, 'utf8');
  const json = JSON.parse(raw);
  const deps = json.dependencies || {};
  const devDeps = json.devDependencies || {};
  const optionalDeps = json.optionalDependencies || {};
  const peerDeps = json.peerDependencies || {};

  const errors = [];

  for (const section of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
    const dupes = parseRawDuplicateKeys(raw, section);
    for (const dep of dupes) {
      errors.push(`- ${pkgPath}: pacote duplicado dentro de ${section}: ${dep}`);
    }
  }

  for (const depName of Object.keys(deps)) {
    if (depName in devDeps) {
      if (deps[depName] === devDeps[depName]) {
        errors.push(`- ${pkgPath}: ${depName} repetido em dependencies e devDependencies com mesma versão (${deps[depName]})`);
      } else {
        errors.push(`- ${pkgPath}: ${depName} repetido em dependencies (${deps[depName]}) e devDependencies (${devDeps[depName]})`);
      }
    }
    if (depName in optionalDeps) {
      errors.push(`- ${pkgPath}: ${depName} repetido em dependencies e optionalDependencies`);
    }
    if (depName in peerDeps) {
      errors.push(`- ${pkgPath}: ${depName} repetido em dependencies e peerDependencies`);
    }
  }

  for (const depName of Object.keys(devDeps)) {
    if (depName in optionalDeps) {
      errors.push(`- ${pkgPath}: ${depName} repetido em devDependencies e optionalDependencies`);
    }
    if (depName in peerDeps) {
      errors.push(`- ${pkgPath}: ${depName} repetido em devDependencies e peerDependencies`);
    }
  }

  return errors;
}

const packageJsonFiles = listPackageJsonFiles(templatesDir);
if (packageJsonFiles.length === 0) {
  console.log('Nenhum package.json de skeleton encontrado em templates/*/skeleton.');
  process.exit(0);
}

let allErrors = [];
for (const pkgPath of packageJsonFiles) {
  allErrors = allErrors.concat(validatePackage(pkgPath));
}

if (allErrors.length > 0) {
  console.error('Falha na validação de dependências duplicadas:');
  for (const err of allErrors) console.error(err);
  process.exit(1);
}

console.log(`OK: ${packageJsonFiles.length} package.json validados sem duplicações.`);
