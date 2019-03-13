const errorGenerator = {
  not_found: (name: string) => `Δεν βρέθηκε ${name} με αυτά τα στοιχεία.`,
  not_found_many: (name: string) => `Δεν βρέθηκαν ${name} με αυτά τα στοιχεία.`,
};

export const generalErrors = {
  NOT_FOUND: 'Δεν βρέθηκαν αποτελέσματα.',
  INSERT_ONLY_NUMBERS: 'Εισάγετε μόνο αριθμούς.',
  VAT_LENGTH: 'Ο ΑΦΜ αποτελείται από 9 αριθμούς.',
  AME_LENGTH: 'Ο ΑΜΕ αποτελείται από 10 αριθμούς.',
  TOO_MANY_CHARACTERS: 'Εισάγετε λιγότερους χαρακτήρες.',
  VAT_MUST_BE_UNIQUE: 'Αυτός ο ΑΦΜ χρησιμοποιείται ήδη.',
  DB_INSERTION_ERROR: 'Σφάλμα καταχώρησης στη βάση.',
};
export const employerErrors = {
  NOT_FOUND: errorGenerator.not_found('εργοδότης'),
  NOT_FOUND_MANY: errorGenerator.not_found_many('εργοδότες'),
};
export const employeeErrors = {
  NOT_FOUND: errorGenerator.not_found('υπάλληλος'),
  EMPTY_EMPLOYEE_LIST: 'Δεν βρέθηκαν υπάλληλοι για αυτόν τον εργοδότη.',
  TIME_FORMAT: 'Η ώρα ορίζεται σε 24ωρη μορφή με το μοτίβο ΩΩΛΛ.',
};
