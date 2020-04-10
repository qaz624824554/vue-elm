import http from './http'

export const guessCity = http('/cities', { type: 'guess' })

export const hotCity = http('/cities', { type: 'hot' })

export const groupCity = http('/cities', { type: 'group' })
