const errorGenerator = {
  not_found: (name: string) => `Δεν βρέθηκε ${name} με αυτά τα στοιχεία.`,
};

export const employerErrors = {
  NOT_FOUND: errorGenerator.not_found('εργοδότης'),
};
export const generalErrors = {
  NOT_FOUND: errorGenerator.not_found('αποτέλεσμα'),
};
export const employeeErrors = {
  NOT_FOUND: errorGenerator.not_found('υπάλληλος'),
  EMPTY_EMPLOYEE_LIST: 'Δεν βρέθηκαν υπάλληλοι για αυτόν τον εργοδότη',
};
