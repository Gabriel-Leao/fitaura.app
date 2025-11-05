export type User = {
  id: string
  name: string
  email: string
  age: number
  height?: string
  goal?: 'Perder peso' | 'Ganhar peso' | 'Manter peso'
  sex: 'Masculino' | 'Feminino'
  password: string
}
