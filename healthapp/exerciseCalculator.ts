export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  ratingValue: number;
  ratingDescription: string;
}

/* interface InputVals {
  value: number;
  arrValues: number[];
} */

const calculateRating = (average: number, target: number): Rating => {
  const difference = average - target;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let ratingValue = 0;
  let ratingDescription = "";
  if (difference < -1) {
    ratingValue = 1;
    ratingDescription = "Hey, don't give up!!";
  } else if (difference >= -1 && difference < 1) {
    ratingValue = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    ratingValue = 3;
    ratingDescription = "Great, keep going!!";
  }

  return {
    ratingValue: ratingValue,
    ratingDescription: ratingDescription,
  };
};

const calculateExercises = (
  daily_exercises: number[],
  targetValue: number,
): Result => {
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter((day) => day > 0).length;
  const success = trainingDays >= targetValue;
  const average =
    daily_exercises.reduce((acc, curr) => acc + curr, 0) / periodLength;

  const rating = calculateRating(average, targetValue);

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating.ratingValue,
    ratingDescription: rating.ratingDescription,
    target: targetValue,
    average: average,
  };
};

/* const parseArgs = (args: string[]): InputVals => {
  const arrVals = args.slice(2).map((val) => Number(val));
  console.log(arrVals);
  if (arrVals.some((val) => isNaN(val))) {
    throw new Error(`The arguments must be numeric: ${arrVals}`);
  }
  if (arrVals.some((val) => val < 0)) {
    throw new Error(`The arguments must be positive: ${arrVals}`);
  }
  return {
    value: Number(arrVals[0]),
    arrValues: arrVals.slice(1),
  };
};
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkArgs = (dailyHours: any, target: any) => {
  if (typeof target !== "number") {
    throw new Error("malformatted parameters");
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  if (dailyHours.some((item: any) => typeof item !== "number")) {
    throw new Error("malformatted parameters");
  }
};

export const exercisesApp = (dailyHours: number[], target: number): unknown => {
  try {
    if (!(dailyHours && target)) {
      console.log("**********************");
      throw new Error("parameters missing");
    }

    checkArgs(dailyHours, target);
    return calculateExercises(dailyHours, target);
  } catch (error: unknown) {
    console.log("Something goes wrong: ", error);
    return error;
  }
};
