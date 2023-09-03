import usePopupClose from "../../hooks/usePopupClose";

export default function Popup({name, title, onClose, isOpen, containerClass, children, popupTitleClassName}) {
  const { handleOverlayClick } = usePopupClose(isOpen, onClose)

  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={handleOverlayClick}>
      <div className={containerClass || "popup__container"}>
        {title && <h2 className={`popup__title ${popupTitleClassName && popupTitleClassName}`}>{title}</h2>}
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <>
          {children}
        </>
      </div>
    </div>
  )
}