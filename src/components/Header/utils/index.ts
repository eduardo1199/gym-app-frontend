export function titleFromPage(url: string): string {
  switch (url) {
    case '/students':
      return 'Alunos'
    case '/machines':
      return 'Máquinas'
    case '/dashboard':
      return 'Dashboard'
    case '/plans':
      return 'Planos'
    default:
      return ''
  }
}