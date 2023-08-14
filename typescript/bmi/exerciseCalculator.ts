interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

// interface InputValues {
//   target: number;
//   dailyHours: number[];
// }

// const parseArguments = (args: string[]): InputValues => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   let target;
//   const dailyHours: number[] = [];

//   args.forEach((num, index): void => {
//     const n = Number(num);
//     if (index < 2) {
//       return;
//     } else if (index === 2) {
//       if (!isNaN(n)) {
//         target = n;
//       } else {
//         throw new Error('The target value was not a number!');
//       }
//     } else {
//       if (!isNaN(n)) {
//         dailyHours.push(n);
//       } else {
//         throw new Error('One of the values was not a number!');
//       }
//     }
//   });

//   return {
//     target,
//     dailyHours
//   };
// };

export function calculateExercises(dailyHours: number[], target: number): Result {
  const countTrainingDays = (): number => {
    let count = 0;

    dailyHours.forEach((day): void => {
      if (day > 0) count++;
    });

    return count;
  };

  const calculateAverage = (): number => {
    const days = dailyHours.length;

    const sum = dailyHours.reduce((sum,day): number => sum + day, 0);

    return sum / days;
  };
  const average = calculateAverage();

  const findRating = (): number => {
    if (average >= target) {
      return 3;
    } else if (target - average <= 1) {
      return 2;
    } else {
      return 1;
    }
  };

  const findRatingDesc = (): string => {
    if (average >= target) {
      return "Great job!";
    } else if (target - average <= 1) {
      return "Not too bad but could be better.";
    } else {
      return "Terrible. Take a lap.";
    }
  };

  return {
    periodLength: dailyHours.length,
    trainingDays: countTrainingDays(),
    success: average >= target,
    rating: findRating(),
    ratingDescription: findRatingDesc(),
    target: target,
    average: average,
  };
}

// try {
//   const { target, dailyHours } = parseArguments(process.argv);
//   console.log(calculateExercises(dailyHours, target));
// } catch (error: unknown) {
//   let errorMessage = 'Whoops..';
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }
