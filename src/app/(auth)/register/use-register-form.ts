import { emailSchema } from '@/utils/schemas';
import { debounce } from 'lodash';
import React from 'react';
import zxcvbn from 'zxcvbn';

import { checkEmailExists } from './actions';

export function useRegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState<boolean | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = React.useState(false);
  const [passwordStrength, setPasswordStrength] = React.useState(0);
  const [passwordFeedback, setPasswordFeedback] = React.useState('');

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  function toggleConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  }

  const checkEmailAvailability = React.useCallback(async (email: string) => {
    try {
      const result = await checkEmailExists({ email });
      return !result;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  }, []);

  const debouncedCheckEmail = React.useMemo(
    () =>
      debounce(async (email: string) => {
        setIsCheckingEmail(true);
        const isAvailable = await checkEmailAvailability(email);
        setIsEmailValid(isAvailable);
        setIsCheckingEmail(false);
      }, 600),
    [setIsCheckingEmail, checkEmailAvailability, setIsEmailValid],
  );

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const email = event.target.value;
    const emailValidation = emailSchema.safeParse(email);

    if (email === '') {
      setIsEmailValid(null);
      setIsCheckingEmail(false);
      return;
    }

    if (emailValidation.success) {
      debouncedCheckEmail(email);
    } else {
      setIsEmailValid(null);
    }
  }

  function evaluatePasswordStrength(password: string) {
    if (password === '') {
      setPasswordStrength(0);
      setPasswordFeedback('');
      return;
    }

    const { score, feedback } = zxcvbn(password);
    setPasswordStrength(score);
    setPasswordFeedback(feedback.suggestions.join(' '));
  }

  return {
    isPasswordVisible,
    isConfirmPasswordVisible,
    isEmailValid,
    isCheckingEmail,
    passwordStrength,
    passwordFeedback,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    evaluatePasswordStrength,
    handleEmailChange,
  };
}
