import Popup from "../Popup/Popup";

export default function InfoTooltip({icon, text, isOpen, onClose}) {
  return (
    <Popup name="onRegistrationError"
           isOpen={isOpen}
           onClose={() => onClose()}>
      <img
        alt={text}
        className="popup__notice-image"
        src={icon}
      />
      <h2 className="popup__notice-text">{text}</h2>
    </Popup>
  )
}