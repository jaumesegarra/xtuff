const moment = require('moment');
const testUtils = require('./test.utils');

test('Generate static files', async () => {
  const stuffPath = testUtils.stuffPath('static-files-stuff');

  const cmdResult = await testUtils.cli(['static-files', stuffPath]);
  expect(cmdResult.code).toBe(0);

  const result = await testUtils.getJson(stuffPath, 'file.json');
  expect(result['message']).toBe('It works fine!');
});

test('Patterns on filenames', async () => {
  const stuffName = 'filenamePatternsStuff';
  const stuffPath = testUtils.stuffPath(stuffName);

  const cmdResult = await testUtils.cli(['filename-patterns', stuffPath]);
  expect(cmdResult.code).toBe(0);

  const uppercaseFolderExists = await testUtils.fileExists(stuffPath, 'FILENAME_PATTERNS_STUFF_FOLDER/file.json');
  expect(uppercaseFolderExists).toBe(true);

  const capitalizedFileExists = await testUtils.fileExists(stuffPath, 'FilenamePatternsStuff_Capitalized.json');
  expect(capitalizedFileExists).toBe(true);

  const normalFileExists = await testUtils.fileExists(stuffPath, 'filenamePatternsStuff.json');
  expect(normalFileExists).toBe(true);

  const snakeCaseFileExists = await testUtils.fileExists(stuffPath, 'filename_patterns_stuff_SnakeCase.json');
  expect(snakeCaseFileExists).toBe(true);

  const result = await testUtils.getJson(stuffPath, 'filename_patterns_stuff_SnakeCase.json');
  expect(result['message']).toBe('Hello people');
});

test('Simple patterns', async () => {
  const stuffName = 'simple-patterns-stuff';
  const stuffPath = testUtils.stuffPath(stuffName);

  const cmdResult = await testUtils.cli(['simple-patterns', stuffPath]);
  expect(cmdResult.code).toBe(0);

  const result = await testUtils.getJson(stuffPath, 'file.json');

  expect(result['name']).toBe(stuffName);
  expect(result['Name']).toBe('Simple-patterns-stuff');
  expect(result['NAME']).toBe('SIMPLE-PATTERNS-STUFF');
  expect(result['nameSubname']).toBe('simplePatternsStuff');
  expect(result['name_subname']).toBe('simple_patterns_stuff');
});

test('Calcule paths (pattern)', async () => {
  const stuffName = 'path-patterns-stuff';
  const stuffPath = testUtils.stuffPath(stuffName);

  const cmdResult = await testUtils.cli(['path-patterns', stuffPath]);
  expect(cmdResult.code).toBe(0);

  const folderResult = await testUtils.getJson(stuffPath, 'folder/file.json');
  const packageExistsOnFolder = await testUtils.fileExists(stuffPath+'/folder', folderResult['path']);
  expect(packageExistsOnFolder).toBe(true);

  const subfolderResult = await testUtils.getJson(stuffPath, 'folder/subfolder/file.json');
  const packageExistsOnSubfolder = await testUtils.fileExists(stuffPath+'/folder/subfolder', subfolderResult['path']);
  expect(packageExistsOnSubfolder).toBe(true);
});

test('Now pattern', async () => {
  const stuffName = 'now-pattern-stuff';
  const stuffPath = testUtils.stuffPath(stuffName);

  const cmdResult = await testUtils.cli(['now-pattern', stuffPath]);
  expect(cmdResult.code).toBe(0);

  const result = await testUtils.getJson(stuffPath, 'file.json');
  expect(result['date']).toBe(moment().format('DD/MM/YYYY'));
});


test('Custom variables', async () => {
  const stuffName = 'custom-variables-stuff';
  const stuffPath = testUtils.stuffPath(stuffName);

  const cmdResult = await testUtils.cli(['custom-variables', stuffPath], [{ name: "vars", value: '{"author": "Jaume Segarra"}' }]);
  expect(cmdResult.code).toBe(0);

  const result = await testUtils.getJson(stuffPath, 'file.json');
  expect(result['author']).toBe('Jaume Segarra');
  expect(result['username']).toBe('jaume_segarra');
});

test('Custom delimiters', async () => {
  const stuffName = 'custom-delimiters-stuff';
  const stuffPath = testUtils.stuffPath(stuffName);

  const cmdResult = await testUtils.cli(['custom-delimiters', stuffPath], [{ name: "delimiter", value: '$' }]);
  expect(cmdResult.code).toBe(0);

  const result = await testUtils.getJson(stuffPath, 'file.json');
  expect(result['message']).toBe('custom-delimiters-stuff');

  const fileExists = await testUtils.fileExists(stuffPath, 'custom-delimiters-stuff.json');
  expect(fileExists).toBe(true);
});