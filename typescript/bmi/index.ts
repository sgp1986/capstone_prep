import express from 'express';
import { calculateBmi } from "./bmiCalculator";
// import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const validInputs = (h: number, w: number): boolean => {
  return !isNaN(h) && !isNaN(w);
};

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (validInputs(Number(height), Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({height, weight, bmi });
  } else {
    res.status(400).send('malformatted parameters');
  }
});

app.post('/exercises', (req, res) => {
  console.log(req.body);
  res.send('worked');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
