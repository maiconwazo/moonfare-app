export const acceptOnlyLetters = (e: any) => {
  const specialKeys = [8, 9, 32, 37, 46, 39];
  const charCode = e.which ? e.which : e.keyCode;

  if ((charCode > 64 && charCode < 91) || specialKeys.indexOf(charCode) != -1) {
    return true;
  } else {
    e.preventDefault();
    return false;
  }
};

export const acceptOnlyNumbers = (e: any) => {
  const specialKeys = [8, 9, 37, 46, 39];
  const charCode = e.which ? e.which : e.keyCode;

  if (
    (charCode >= 48 && charCode <= 57) ||
    (charCode >= 96 && charCode <= 105) ||
    specialKeys.indexOf(charCode) != -1
  ) {
    return true;
  } else {
    e.preventDefault();
    return false;
  }
};

export const acceptOnlyLetterAndNumbers = (e: any) => {
  const specialKeys = [8, 9, 37, 46, 39];
  const charCode = e.which ? e.which : e.keyCode;

  if (
    (charCode > 64 && charCode < 91) ||
    (charCode >= 48 && charCode <= 57) ||
    (charCode >= 96 && charCode <= 105) ||
    specialKeys.indexOf(charCode) != -1
  ) {
    return true;
  } else {
    e.preventDefault();
    return false;
  }
};
