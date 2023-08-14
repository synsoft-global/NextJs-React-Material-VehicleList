export const stringTest = {
  test: function (value: string) {
    return value.match(/\d+/g)?.join('') != value.replace(/\s/g, '')
  },
  message: 'message.invalidValue',
}