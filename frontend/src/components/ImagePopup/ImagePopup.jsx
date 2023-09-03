import Popup from "../Popup/Popup";

export default function ImagePopup({card, isOpen, onClose}) {
  return (
    <Popup name={"image-full"} onClose={onClose} isOpen={isOpen} containerClass="popup__image">
      <figure className="popup__image-container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img
          className="popup__image"
          src={card.link}
          alt={card.name}
        />
        <figcaption className="popup__image-name">{card.name}</figcaption>
      </figure>
    </Popup>
  )
}