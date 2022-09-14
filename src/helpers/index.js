export const getRegexPatternFromKey = (key) => {
  if (key === 'password')
    return {
      regex: '(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}',
      title: 'Password should have at least one lowercase letter, one uppercase letter, one number and one special character and should be at least 8 characters long',
    }
  if (key === 'academic_year')
    return {
      regex: '[1-4]{1}',
      title: 'Academic year should be a number between 1 and 4',
    }
  if (key === 'phone')
    return {
      regex: '[0-9]{10}',
      title: 'Phone number must be 10 digits',
    }
  return {}
}
