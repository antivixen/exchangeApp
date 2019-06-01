export function numberValidate(num: any) {
  return Number(Math.abs(num).toFixed(2));
}

function isDuplicatesAndAlphabetic(password: string): boolean {
  const letterCountMap = new Map();
  let duplicatesCount = 0;
  let alphaMap = "abcdefghijklmnopqrstuvwxyz";
  let isAlphabeticString = false;

  password.split("").forEach((char, index, state) => {
    const charPosition = alphaMap.indexOf(char);
    const charType = letterCountMap.get(char);
    const count =
      !!charType && state[index] === state[index - 1] ? charType + 1 : 1;
    if (count > duplicatesCount) {
      duplicatesCount = count;
    }
    letterCountMap.set(char, count);

    if (
      !isAlphabeticString &&
      state[index + 1] === alphaMap[charPosition + 1] &&
      state[index + 2] === alphaMap[charPosition + 2]
    ) {
      isAlphabeticString = true;
    }
  });

  return duplicatesCount > 1 && isAlphabeticString;
}

export function isValid(password: string): boolean {
  return (
    !!password.length &&
    password.length < 32 &&
    !!password.match(/^[a-h,j-k,m-z]+$/) &&
    isDuplicatesAndAlphabetic(password)
  );
}
