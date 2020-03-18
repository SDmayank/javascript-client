const validKey = (key) => {
  if (key === 'password' || key === 'confirmPassword') {
    return 'password';
  }
  return '';
};

export default validKey;
