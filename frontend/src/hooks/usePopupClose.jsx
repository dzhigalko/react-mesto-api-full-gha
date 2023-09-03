import {useEffect} from "react";

export default function usePopupClose(isOpen, closePopup) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closePopup()
    }
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closePopup()
      }
    }

    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, closePopup])

  return { handleOverlayClick }
}