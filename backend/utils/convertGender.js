function convertGender(gender) {
  // Check if gender is null or undefined and return null immediately
  if (gender == null) {
    return null;
  }

  // Convert gender to lowercase for case-insensitive comparison
  // and trim spaces
  const genderLower = gender.trim().toLowerCase();

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
    case "u":
    case "unknown":
      return null;
    default:
      // If gender is not recognized, return null
      return null;
  }
}

module.exports = convertGender;
