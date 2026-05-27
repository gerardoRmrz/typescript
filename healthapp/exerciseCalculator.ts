interface Result {
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

const calculateRating = (average: number, target: number): Rating => {
  const difference = average - target;
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
  dailyExercisesHours: number[],
  targetValue: number,
): Result => {
  const periodLength = dailyExercisesHours.length;
  const trainingDays = dailyExercisesHours.filter((day) => day > 0).length;
  const success = trainingDays >= targetValue;
  const average =
    dailyExercisesHours.reduce((acc, curr) => acc + curr, 0) / periodLength;

  const rating = calculateRating(average, targetValue);

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: false,
    rating: rating.ratingValue,
    ratingDescription: rating.ratingDescription,
    target: targetValue,
    average: average,
  };
};

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (error) {
  console.log("Something goes wrong: ", error);
}
