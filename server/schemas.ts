import globby from 'globby';
import path from 'path';
import fs from 'fs-extra';
import Ajv from 'ajv';

const schemafiles = globby.sync(['**/*.json', '!test'], {
  cwd: path.resolve(process.cwd(), 'schemas'),
  absolute: true
});

const schemas = schemafiles.map(schemafile => {
  return JSON.parse(fs.readFileSync(schemafile, 'utf8'));
});

const ajv = new Ajv({
	verbose: true
});
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
ajv.addSchema([schemas])

export const FormTemplateSchema = ajv.getSchema('http://theform.app/schemas/FormTemplate.json');

export const ApiFormNewFormSchema = ajv.getSchema('http://theform.app/schemas/Api/Form/NewForm.json');

export const ApiFormUpdateFormSchema = ajv.getSchema('http://theform.app/schemas/Api/Form/UpdateForm.json');

export const ApiResponseNewResponseSchema = ajv.getSchema('http://theform.app/schemas/Api/Response/NewResponse.json');

export const errorsText = (errors: Ajv.ErrorObject[]) => {
  return ajv.errorsText(errors, {
    separator: '\n'
  })
};
