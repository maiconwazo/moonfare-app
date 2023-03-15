import genericStyles from '../index.module.css';
import { Roboto } from 'next/font/google';
import useOnboarding from '@/hooks/onboarding-manager';
import { useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import { format, isValid, parse, parseISO } from 'date-fns';
import {
  acceptOnlyLetterAndNumbers,
  acceptOnlyLetters,
} from '@/utils/input-functions';

const roboto700 = Roboto({ weight: '700', subsets: ['latin'] });

export default function IdentificationStep() {
  const { executeInstance } = useOnboarding();
  const [submitted, setSubmitted] = useState(false);
  const [documentNumberMaxLength, setDocumentNumberMaxLength] = useState(9);
  const documentNumberRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const birthdate = formData.get('birthdate') as string;
    if (birthdate) {
      const date = parse(birthdate, 'dd/MM/yyyy', new Date());
      const formattedDate = format(date, 'yyy-MM-dd HH:mm:ss') + 'Z';

      formData.set('birthdate', formattedDate);
      console.log(formattedDate);
    }

    executeInstance(formData);
  };

  const fixDate = (e: any) => {
    const value = e.target.value;

    try {
      const date = parse(value, 'dd/MM/yyyy', new Date());
      if (!isValid(date)) e.target.value = '';
    } catch {
      console.log('erro');
      e.target.value = '';
    }
  };

  const getDocumentNumberLength = (e: any) => {
    if (documentNumberRef?.current) documentNumberRef.current.value = '';
    switch (e.target.value) {
      case 'id':
        return 9;
      case 'passport':
        return 9;
      case 'driverLicense':
        return 11;
      default:
        return 11;
    }
  };

  return (
    <section>
      <header>
        <p className={`${genericStyles.title} ${roboto700.className}`}>
          Identification
        </p>
        <p className={genericStyles.subTitle}>
          We want to know more about you!
        </p>
      </header>
      <br />
      <form
        className={`${genericStyles.form} ${
          submitted && genericStyles.submitted
        }`}
        onSubmit={onSubmit}
      >
        <section className={genericStyles.group}>
          <section className={genericStyles.formItem}>
            <label htmlFor="documentType">
              Document type <span aria-label="required">*</span>
            </label>
            <select
              id="documentType"
              name="documentType"
              required
              onChange={(e) =>
                setDocumentNumberMaxLength(getDocumentNumberLength(e))
              }
            >
              <option className={genericStyles.option} value="id">
                ID
              </option>
              <option className={genericStyles.option} value="passport">
                Passport
              </option>
              <option className={genericStyles.option} value="driverLicense">
                Driver license
              </option>
            </select>
          </section>
          <section className={genericStyles.formItem}>
            <label htmlFor="documentNumber">
              Doc. Number <span aria-label="required">*</span>
            </label>
            <input
              ref={documentNumberRef}
              type="text"
              id="documentNumber"
              name="documentNumber"
              required
              autoComplete="off"
              pattern="[a-zA-Z0-9]+"
              maxLength={documentNumberMaxLength}
              onChange={(e: any) =>
                (e.target.value = e.target.value.toUpperCase())
              }
              onKeyDown={acceptOnlyLetterAndNumbers}
            />
          </section>
          <section className={genericStyles.formItem}>
            <label htmlFor="birthdate">
              Birthdate <span aria-label="required">*</span>
            </label>
            <InputMask
              type="text"
              id="birthdate"
              name="birthdate"
              autoComplete="off"
              placeholder="DD/MM/YYYY"
              required
              mask="99/99/9999"
              onBlur={fixDate}
            />
          </section>
        </section>
        <section className={genericStyles.formItem}>
          <label htmlFor="firstName">
            First name <span aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            autoComplete="off"
            pattern="[a-zA-Z ]+"
            required
            onKeyDown={acceptOnlyLetters}
          />
        </section>
        <section className={genericStyles.formItem}>
          <label htmlFor="familyName">
            Family name <span aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="familyName"
            name="familyName"
            autoComplete="off"
            pattern="[a-zA-Z ]+"
            required
            onKeyDown={acceptOnlyLetters}
          />
        </section>
        <button
          className={genericStyles.button}
          type="submit"
          onClick={() => setSubmitted(true)}
        >
          Next
        </button>
      </form>
    </section>
  );
}
