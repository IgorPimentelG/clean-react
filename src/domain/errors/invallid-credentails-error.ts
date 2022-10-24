export class InvalidCredentailsError extends Error {
  constructor () {
    super('Credenciais inválidas')
    this.name = 'InvalidCredentailsError'
  }
}
