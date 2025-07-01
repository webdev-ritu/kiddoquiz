import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LoginPopup({ show, handleClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    handleClose();
    navigate('/login');
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{t('login_required')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('please_login_to_start_quiz')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('cancel')}
        </Button>
        <Button variant="primary" onClick={handleLoginRedirect}>
          {t('login_now')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
