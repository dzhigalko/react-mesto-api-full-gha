import {useRef} from "react";

import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useForm from "../../hooks/useForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = useRef();
  const {formState, resetForm, handleChange} = useForm({
    avatar: true
  })
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

    resetForm()
  }

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={formState.isFormValid}
    >
      <input
        required=""
        name="avatar"
        className={`popup__input ${!formState.validity.avatar && "popup__input_error"}`}
        type="url"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
        onBlur={(e) => handleChange(e)}
        defaultValue={''}
      />
      <span className={`popup__error ${!formState.validity.avatar && "popup__error_visible"}`}>
        {!formState.validity.avatar && formState.validationMessages.avatar}
      </span>
    </PopupWithForm>
  )
}