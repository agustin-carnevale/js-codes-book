import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
      // Make sure the cell storage file exists and read it/parse it
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

      res.send(JSON.parse(result));
    } catch (error) {
      //if the file does not exist add in a default list of cells
      if(error.code === 'ENOENT'){
        await fs.writeFile(fullPath, '[]', 'utf-8');
        res.send([]);
      }else{
        throw error;
      }
    }

  });


  router.post('/cells', async (req,res) => {
    const { cells }: {cells: Cell[]} = req.body;

    //serialize cells and write to file
    try {
      await fs.writeFile(fullPath, JSON.stringify(cells),'utf-8');
      res.send({ status: 'ok' });
    } catch (error) {
      res.send({ status: 'error' });
    }

  });

  return router;
};

