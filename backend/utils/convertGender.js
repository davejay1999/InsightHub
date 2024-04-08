function convertGender(gender) {
  // Convert gender to lowercase for case-insensitive comparison
  const genderLower = gender.toLowerCase();

  // Assign a number to each gender
  // 1 = Male, 2 = Female, 3 = Non-Binary, 4 = Transgender, 5 = Intersex, 6 = Prefer Not to Say, 7 = Other
  switch (genderLower) {
    case "male":
    case "m":
      return 1;
    case "female":
    case "f":
      return 2;
    case "non-binary":
    case "nonbinary":
    case "nb":
      return 3;
    case "transgender":
    case "trans":
    case "tg":
      return 4;
    case "intersex":
    case "i":
      return 5;
    case "prefer not to say":
    case "pnts":
      return 6;
    case "other":
    case "o":
      return 7;
    default:
      // If gender is not recognized, return null
      return null;
  }
}

module.exports = convertGender;
