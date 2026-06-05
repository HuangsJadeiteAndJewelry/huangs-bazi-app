export function calculateBirthZodiac(yearPillar) {
  const zodiacAnimal = yearPillar.branch.animal;
  const zodiacElement = yearPillar.stem.element;

  return {
    zodiacAnimal,
    zodiacElement,
    zodiacDisplayName: `${zodiacElement} ${zodiacAnimal}`,
    zodiacBranchKey: yearPillar.branch.key,
    zodiacStemKey: yearPillar.stem.key,
    zodiacStemZh: yearPillar.stem.zh,
    zodiacBranchZh: yearPillar.branch.zh,
    calculationBasis: "baZiSolarYear",
  };
}