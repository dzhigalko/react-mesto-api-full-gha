import Popup from "../Popup/Popup";

export default function PopupWithConfirmation({ isOpen, onClose, onConfirm }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name="delete-photo" title="Вы уверены?"
           popupTitleClassName="popup__title_type_delete-photo">
      <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
      <button className="popup__button" type="button" aria-label="Да" onClick={onConfirm}>Да</button>
    </Popup>
  )
}