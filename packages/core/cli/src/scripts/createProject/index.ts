import path from 'path';
const shell = require('shelljs');
import log from '../../utils/log';
import processMagicComments from './processMagicComments';
import * as process from 'process';
import * as fs from 'fs';
import rimraf from 'rimraf';

interface ICreateProjectProps {
  integration: string;
  targetPath: string;
  repositoryLink: string;
}

async function createProject({
  integration,
  targetPath,
  repositoryLink
}: ICreateProjectProps): Promise<void> {
  const templatePath = `${targetPath}/${integration}`;
  try {
    if (fs.existsSync(templatePath)) {
      rimraf(targetPath);
    }
    await shell.exec(`git clone ${repositoryLink} ${templatePath}`);
  } catch (error) {
    log.error('Unable to get integration template from repository');
    return;
  }

  log.info('Updating Nuxt config');
  try {
    const absoluteTargetPath = path.isAbsolute(templatePath)
      ? templatePath
      : path.join(__dirname, templatePath);
    const nuxtConfigPath = path.join(absoluteTargetPath, 'nuxt.config.js');
    await processMagicComments(nuxtConfigPath);
  } catch (error) {
    log.error('No nuxt.config.js has been found in integration template');
    process.exit(1);
  }
}

export default createProject;
