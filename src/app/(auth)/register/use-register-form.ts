import { emailSchema } from '@/utils/schemas';
import { debounce } from 'lodash';
import React from 'react';

import { checkEmailExists } from './actions';

export function useRegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState<boolean | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = React.useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  function toggleConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  }

  async function checkEmailAvailability(email: string) {
    try {
      const result = await checkEmailExists({ email });

      return !result;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  }

  const debouncedCheckEmail = React.useCallback(
    debounce(async (email: string) => {
      setIsCheckingEmail(true);
      const isAvailable = await checkEmailAvailability(email);
      setIsEmailValid(isAvailable);
      setIsCheckingEmail(false);
    }, 700), // ms debounce
    [],
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

  return {
    isPasswordVisible,
    isConfirmPasswordVisible,
    isEmailValid,
    isCheckingEmail,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleEmailChange,
  };
}
