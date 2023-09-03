import {useEffect} from "react";

import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useForm from "../../hooks/useForm";
import PopupInput from "../PopupInput/PopupInput"
export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const {formState, resetForm, handleChange} = useForm({
    name: true,
    link: true
  })

  useEffect(() => {
    resetForm()
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()

    onAddPlace({
      name: formState.values.name,
      link: formState.values.link
    })
  }

  return (
    <PopupWithForm
      name='add-place'
      title='Новое место'
      titleButton='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={formState.isFormValid}
    >
      <PopupInput
        required={true}
        name="name"
        type="text"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        value={formState.values.name}
        onChange={handleChange}
        isValid={formState.validity.name}
        validationMessage={formState.validationMessages.name}
      />
      <PopupInput
        required={true}
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        value={formState.values.link}
        onChange={handleChange}
        isValid={formState.validity.link}
        validationMessage={formState.validationMessages.link}
      />
    </PopupWithForm>
  )
}