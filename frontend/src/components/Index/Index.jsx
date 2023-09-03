import {useEffect, useState} from 'react';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import ImagePopup from "../ImagePopup/ImagePopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import {useOutletContext} from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import PopupWithConfirmation from "../PopupWithConfirmation/PopupWithConfirmation";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";

export default function Index() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopup] = useState(false)
  const [cards, setCards] = useState([])
  const { setMenu } = useOutletContext()
  const { logout, user, setUser } = useAuth()
  const [ isLoading, setIsLoading ] = useState(false)
  const [isCardDeleteConfirmationOpen, setIsCardDeleteConfirmationOpen] = useState(false)
  const [cardForDelete, setCardForDelete] = useState({})
  const { api } = useApi()

  useEffect(() => {
    api.getInitialCards()
      .then(setCards)
      .catch(err => console.log(`Ошибка ${err}`));

    // Menu
    setMenu([
      <h2 className='header__user'>{user && user.email}</h2>,
      <div className="header__sign header__sign_out" onClick={() => logout()}>Выйти</div>
    ])
  },[setMenu, user, logout])

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setImagePopup(false)
    setIsCardDeleteConfirmationOpen(false)
    setSelectedCard({})
    setCardForDelete({})
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card){
    setSelectedCard(card)
    setImagePopup(true)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === user._id);
    const request = isLiked ? api.deleteCardLike : api.addCardLike

    request.apply(api, [card._id]).then((newCard) => {
      setCards((currentCards) => currentCards.map((c) => c._id === card._id ? newCard : c))
    }).catch(err => console.log(`Ошибка ${err}`));
  }

  function handlePopupSubmit(makeRequest) {
    setIsLoading(true)

    makeRequest()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }

  function handleAddPlace(params) {
    const { name, link } = params

    handlePopupSubmit(() => {
      return api.addCard(name, link).then((newCard) => {
        setCards([newCard, ...cards])
      })
    })
  }

  function handleCardDeleteConfirm(card) {
    handlePopupSubmit(() => {
      return api.deleteCard(card._id).then(() => {
        setCards((currentCards) => currentCards.filter((c) => c._id !== card._id))
      })
    })
  }

  function handleUpdateUser(params) {
    const {name, about} = params

    handlePopupSubmit(() => {
      return api.changeUserProfile(name, about).then((user) => {
        setUser({
          ...user,
          name: user.name,
          about: user.about
        })
      })
    })
  }

  function handleUpdateAvatar(params) {
    const { avatar } = params;

    handlePopupSubmit(() => {
      return api.changeAvatar(avatar).then(function(user) {
        setUser({
          ...user,
          avatar: user.avatar
        })
      })
    })
  }

  function handleCardDelete(card) {
    setCardForDelete(card)
    setIsCardDeleteConfirmationOpen(true)
  }

  return (
    <AppContext.Provider value={{ isLoading }}>
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLikeClick={handleCardLike}
        onCardDeleteClick={handleCardDelete}
        cards={cards}
      />

      <Footer/>

      <PopupWithConfirmation isOpen={isCardDeleteConfirmationOpen} onClose={closeAllPopups}
                             onConfirm={() => handleCardDeleteConfirm(cardForDelete)}/>

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

      <PopupWithForm
        name='delete-photo'
        title='Вы уверены?'
        titleButton='Да'
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups}
      />
    </AppContext.Provider>
  );
}
