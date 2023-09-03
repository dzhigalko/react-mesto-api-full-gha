import {useState} from "react";

export default function useForm(inputValues) {
  const initValidity = {}
  const requiredInputs = []
  const initValues = {}
  const initValidationMessages = {}

  Object.keys(inputValues).forEach((key) => {
    initValidity[key] = true
    initValues[key] = ''
    initValidationMessages[key] = ''

    if (inputValues[key]) {
      requiredInputs.push(key)
    }
  })

  const [formState, setFormState] = useState({
    values: initValues,
    validity: initValidity,
    validationMessages: initValidationMessages,
    isFormValid: false,
    validatedFields: [],
    requiredInputs,
  })

  const handleChange = (event) => {
    const {value, name, validationMessage} = event.target
    const isValid = event.target.checkValidity()

    const validity = {...formState.validity, [name]: isValid }
    const validationMessages = {...formState.validationMessages, [name]: validationMessage}
    let validatedFields = formState.validatedFields

    if (!formState.validatedFields.includes(name)) {
      validatedFields = [...validatedFields, name]
    }

    const isAllRequiredFieldsValidated = validatedFields.length >= formState.requiredInputs.length
      && formState.requiredInputs.every(v => validatedFields.includes(v))
    const isFormValid = Object.values(validity).every(v => v === true) && isAllRequiredFieldsValidated

    setFormState({
      ...formState,
      values: {...formState.values, [name]: value},
      validity: validity,
      validationMessages: validationMessages,
      isFormValid: isFormValid,
      validatedFields: validatedFields
    })
  }

  const resetForm = (resetValues) => {
    resetValues = resetValues || {}
    const newValidity = {}
    const newValues = {}
    const newValidationMessages = {}

    Object.keys(inputValues).forEach((key) => {
      newValidity[key] = true
      newValues[key] = resetValues[key] || ''
      newValidationMessages[key] = ''
    })

    setFormState({
      ...formState,
      values: newValues,
      validity: newValidity,
      validationMessages: newValidationMessages,
      isFormValid: false,
      validatedFields: []
    })
  }

  return {formState, handleChange, resetForm}
}