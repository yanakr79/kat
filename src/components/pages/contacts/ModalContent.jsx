import React from 'react';
import { useTranslation } from '../../../i18n';

import Spinner from '../../Spinner';
import Button from '../../Button';
import Message from '../../Message';
import { ModalHeader, ModalFooter, ModalBody } from '../../Modal';

const ModalContent = ({ loading, error, handleButtonClick }) => {
  const { t } = useTranslation();

  if (error) {
    return (
      <>
        <ModalHeader>{t('form.error')}</ModalHeader>
        <ModalBody>
          <Message type="error">
            <b>{error}</b>
            <p>
              {t('cf.sorry')}
              <br />
              {t('cf.try_later')}
            </p>
          </Message>
        </ModalBody>
      </>
    );
  }
  if (loading) {
    return (
      <>
        <ModalHeader>{t('form.sending')}</ModalHeader>
        <ModalBody>
          <p>{t('form.pls_wait')}</p>
        </ModalBody>
        <ModalFooter justify="center">
          <Spinner w={2} />
          <Button onClick={handleButtonClick} primary>
            {t('form.cancel')}
          </Button>
        </ModalFooter>
      </>
    );
  }
  return (
    <>
      <ModalHeader>{t('form.success')}</ModalHeader>
      <ModalBody>
        <Message type="success">
          <p>{t('cf.thanks')}</p>
          <p>{t('cf.we_will_response')}</p>
        </Message>
      </ModalBody>
    </>
  );
};

export default ModalContent;
