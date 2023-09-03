
export default function PopupInput({ value, onChange, isValid, validationMessage, ...props }) {
  return (
    <>
      <input
        {...props}
        className={`popup__input ${!isValid && "popup__input_error"}`}
        value={value}
        onChange={onChange}
      />
      <span className={`popup__error ${!isValid && "popup__error_visible"}`}>{!isValid && validationMessage}</span>
    </>
  )
}