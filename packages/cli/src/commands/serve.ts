import path from 'path';
import { Command } from 'commander';
import { serve } from '@jscodesbook/local-api';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename='notebook.js', options: { port: string })=>{
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), path.basename(filename), dir, !isProduction);

      console.log(`Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`);
    } catch (error) {
      if(error.code === 'EADDRINUSE'){
        console.log('Port is already in use. Try running on a different port.')
      }else{
        console.error('Something went wrong: ', error.message);
      }
      process.exit(1);
    }
  });