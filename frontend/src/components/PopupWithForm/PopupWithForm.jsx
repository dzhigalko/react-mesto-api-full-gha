import Popup from "../Popup/Popup"
import {useContext} from "react";
import AppContext from "../../contexts/AppContext";

export default function PopupWithForm({name, title, titleButton, children, isOpen, onClose, onSubmit, isValid}) {
  const { isLoading } = useContext(AppContext)

  return (
    <Popup name={name} title={title} onClose={onClose} isOpen={isOpen}>
      <form
        className="popup__form"
        name={name}
        onSubmit={onSubmit}
        noValidate={true}
      >
        {children}
        <button
          className={`popup__button ${!isValid && "popup__button_disabled"}`}
          type="submit"
          aria-label="Сохранить"
          disabled={!isValid}
        >
          {isLoading ? "Сохранение..." : titleButton || 'Сохранить'}
        </button>
      </form>
    </Popup>
  )
}