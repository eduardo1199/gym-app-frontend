import { beforeEach, describe, vi } from 'vitest'

import { isActivePlanUser } from './index'
import { add } from 'date-fns'

describe('Is Active Plan User', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be have active plan with date valid', () => {
    const dateCurrentMock = new Date(2024, 5, 12)

    const endDate = add(dateCurrentMock, {
      months: 1,
    }).toDateString()

    const initialDate = add(dateCurrentMock, {
      months: -1,
    }).toDateString()

    vi.setSystemTime(dateCurrentMock)

    const isActive = isActivePlanUser(initialDate, endDate)

    expect(isActive).toBeTruthy()
  })

  it('should be have not active plan with invalid date', () => {
    const dateCurrentMock = new Date(2024, 5, 12)

    const endDate = add(dateCurrentMock, {
      months: -1,
    }).toDateString()

    const initialDate = add(dateCurrentMock, {
      months: -2,
    }).toDateString()

    vi.setSystemTime(dateCurrentMock)

    const isActive = isActivePlanUser(initialDate, endDate)

    expect(isActive).toBeFalsy()
  })
})
