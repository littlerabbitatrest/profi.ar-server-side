import { OpenAPIObject } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';

const definitionDir = path.join('./src/api', 'definitions');
const controllerDir = path.join('./src', 'app');
const entityDir = path.join('./src', 'app');

const getFiles = dir => {
  const files = [] as string[];
  const func = localDir => {
    const localFiles = fs.readdirSync(localDir);
    for (const i in localFiles) {
      const name = path.join(localDir, localFiles[i]);
      if (fs.statSync(name).isDirectory()) func(name);
      else files.push(name);
    }

    return files;
  };

  return func(dir);
};

const pathsFiles = getFiles(controllerDir);
const modelsFiles = getFiles(entityDir);

const securityDefinitions = yaml.load(fs.readFileSync(path.join(definitionDir, 'security.api.yaml'), 'utf8')) as OpenAPIObject;
const main = yaml.load(fs.readFileSync(path.join(definitionDir, 'main.api.yaml'), 'utf8')) as OpenAPIObject;
const tags = yaml.load(fs.readFileSync(path.join(definitionDir, 'tags.api.yaml'), 'utf8'));
const paths = pathsFiles
  .filter(file => path.extname(file) === '.yaml')
  .filter(file => file.includes('.controller.'))
  .flatMap(file => yaml.load(fs.readFileSync(file, 'utf8')) as any)
  .reduce((acc, route) => ({ ...acc, ...route }), {} as any);
const models = modelsFiles
  .filter(file => path.extname(file) === '.yaml')
  .filter(file => !file.includes('.controller.'))
  .flatMap(file => yaml.load(fs.readFileSync(file, 'utf8')) as OpenAPIObject)
  .reduce((acc, model) => ({ ...acc, ...model }), {} as OpenAPIObject);

export const swaggerApi = {
  ...main,
  securityDefinitions,
  tags,
  paths,
  definitions: models
} as OpenAPIObject;
