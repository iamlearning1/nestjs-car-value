import fs from 'fs/promises';
import path from 'path';
import { getConnection } from 'typeorm';

global.beforeEach(async () => {
  try {
    await fs.rm(path.join(__dirname, '..', 'test.sqlite'));
  } catch {}
});

global.afterEach(() => {
  try {
    const connection = getConnection();
    connection.close();
  } catch {}
});
