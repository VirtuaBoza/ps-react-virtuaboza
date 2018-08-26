export const formatDateFromISOToShort = inputDate => {
  const dateElements = inputDate.split('-');
  return `${dateElements[1]}/${dateElements[2]}/${dateElements[0]}`;
};

export const formatDateFromShortToISO = formattedDate => {
  const dateElements = formattedDate.split('/');
  return `${dateElements[2]}-${dateElements[0]}-${dateElements[1]}`;
};
