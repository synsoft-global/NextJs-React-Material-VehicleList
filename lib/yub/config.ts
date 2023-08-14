import { setLocale } from 'yup'

setLocale({
  mixed: {
    default: 'message.invalidValue',
    required: 'message.required',
    notType: 'message.invalidValue',
  },
  string: {
    min: 'message.invalidValue',
    max: 'message.invalidValue',
    email: 'message.invalidEmail',
    matches: 'message.invalidValue',
  },
  number: {
    moreThan: 'message.invalidValue'
  }
})