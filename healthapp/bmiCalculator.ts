interface InputValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): InputValues => {
  if (
    !args
      .slice(2)
      .map((item) => !!item)
      .every((item) => item)
  )
    throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  console.log();
  if (Number(args[2]) === 0)
    throw new Error("Height must be greater than zero");

  if (Number(args[2]) < 0 || Number(args[3]) < 0)
    throw new Error("Arguments must be positive");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values are not numbers!");
  }
};

const bmiCalculator = (height: number, weight: number): string => {
  const bmi: number = Number((weight / (height / 100) ** 2).toFixed(2));
  if (bmi < 16) {
    return `Underweight (Severe thinness)`;
  } else if (bmi >= 16 && bmi < 17) {
    return `Underweight (Moderate thinness)`;
  } else if (bmi >= 17 && bmi < 18.5) {
    return `Underweight (Mid thinness)`;
  } else if (bmi >= 18.5 && bmi < 25) {
    return `Normal range`;
  } else if (bmi >= 25 && bmi < 30) {
    return `Overweight (Pre-obese)`;
  } else if (bmi >= 30 && bmi < 35) {
    return `Obese (Class I)`;
  } else if (bmi >= 35 && bmi < 40) {
    return `Obese (Class II)`;
  } else if (bmi >= 40) {
    return `Obese (Class III)`;
  }

  return "Values out of range";
};

export const bmiApp = (height: string, weight: string): unknown => {
  try {
    const { value1, value2 } = parseArguments(["", "", height, weight]);
    return bmiCalculator(value1, value2);
  } catch (error: unknown) {
    return error;
  }
};
