interface RegisterFormItem {
  index: number
  value: string
  type: string
  placeholder: string
  class: string
}

export const registerFormItem: RegisterFormItem[] = [
  {
    index: 1,
    value: 'name',
    type: 'text',
    placeholder: 'name',
    class: 'input',
  },
  {
    index: 2,
    value: 'email',
    type: 'email',
    placeholder: 'email',
    class: 'input',
  },
  {
    index: 3,
    value: 'password',
    type: 'password',
    placeholder: 'password',
    class: 'input',
  },
  {
    index: 4,
    value: 'code',
    type: 'text',
    placeholder: 'code',
    class: 'input',
  },
]
