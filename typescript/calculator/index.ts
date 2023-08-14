import express from 'express';
const app = express();
import { calculator, Operation } from './calculator';

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  // use validation to confirm correct data type
  // if ( !value1 || isNaN(Number(value1))) {
  //   return res.status(400).send({ error: '...' });
  // }

  // use type assertion to confirm correct data type
  // const operation = op as Operation;

  const result = calculator(
    Number(value1), Number(value2), op as Operation
  ); // type assertion when argument is passed in
  res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
