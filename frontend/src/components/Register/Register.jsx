import {Link, useOutletContext} from "react-router-dom";
import {useEffect} from "react";
import fail from "../../images/fail.svg"
import success from "../../images/success.svg"
import useForm from "../../hooks/useForm";
import useApi from "../../hooks/useApi";


export default function Register({ onError, onSuccess }) {
  const {formState, handleChange} = useForm({
    email: true,
    password: true
  })

  const { setMenu } = useOutletContext()
  const { api } = useApi()

  useEffect(() => {
    setMenu([
      <Link className="header__sign" to="/sign-in">Войти</Link>
    ])
  }, [setMenu])

  function handleSubmit(e) {
    e.preventDefault()

    api.signup(formState.values.email, formState.values.password).then(() => {
      onSuccess(success, "Вы успешно зарегистрировались!")
    }).catch(() => {
      onError(fail, "Что-то пошло не так! Попробуйте ещё раз.")
    })
  }

  return (<>
    <section className="login login__page">
      <h2 className="login__title">Регистрация</h2>
      <form
        className="login__form"
        name="register-form"
        onSubmit={handleSubmit}
      >
        <input
          required=""
          name="email"
          className="login__input"
          placeholder="Email"
          value={formState.values.email}
          onChange={handleChange}
        />
        <input
          required=""
          name="password"
          className="login__input"
          type="password"
          placeholder="Пароль"
          value={formState.values.password}
          onChange={handleChange}
        />
        <button
          className="login__button"
          type="submit"
          aria-label="Зарегистрироваться"
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="login__subtitle">Уже зарегистрированы?
        <Link className="login__subtitle-link" to="/sign-in"> Войти</Link>
      </p>
    </section>
  </>)
}