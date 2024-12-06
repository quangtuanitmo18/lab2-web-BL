import { checkSchema, Schema } from 'express-validator'
import { USERS_MESSAGES } from '~/constants/messages'

import { validate } from '~/utils/validation'

const userSchema: Schema = {
  firstName: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.FIRSTNAME_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGES.FIRSTNAME_MUST_BE_A_STRING
    },
    trim: true,

    isLength: {
      options: {
        min: 1,
        max: 100
      },
      errorMessage: USERS_MESSAGES.FIRSTNAME_LENGTH_MUST_BE_FROM_1_TO_100
    }
  },
  lastName: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.LASTNAME_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGES.LASTNAME_MUST_BE_A_STRING
    },
    trim: true,

    isLength: {
      options: {
        min: 1,
        max: 100
      },
      errorMessage: USERS_MESSAGES.LASTNAME_LENGTH_MUST_BE_FROM_1_TO_100
    }
  },
  middleName: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.MIDDLENAME_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGES.MIDDLENAME_MUST_BE_A_STRING
    },
    trim: true,

    isLength: {
      options: {
        min: 1,
        max: 100
      },
      errorMessage: USERS_MESSAGES.MIDDLENAME_LENGTH_MUST_BE_FROM_1_TO_100
    }
  },
  group: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.GROUP_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGES.GROUP_MUST_BE_A_STRING
    },
    trim: true
  },
  course: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.COURSE_IS_REQUIRED
    },
    isNumeric: {
      errorMessage: USERS_MESSAGES.COURSE_MUST_BE_A_NUMBER
    },
    trim: true
  },
  faculty: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.FACULTY_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGES.FACULTY_MUST_BE_A_STRING
    },
    trim: true
  }
}
export const paginationValidator = validate(
  checkSchema(
    {
      limit: {
        isNumeric: true,
        custom: {
          options: async (value, { req }) => {
            const num = Number(value)
            if (num > 100 || num < 1) {
              throw new Error('1 <= limit <= 100')
            }
            return true
          }
        }
      },
      page: {
        isNumeric: true,
        custom: {
          options: async (value, { req }) => {
            const num = Number(value)
            if (num < 1) {
              throw new Error('page >= 1')
            }
            return true
          }
        }
      }
    },
    ['query']
  )
)

export const createUserValidator = validate(checkSchema({ ...userSchema }, ['body']))
export const updateUserValidator = validate(checkSchema({ ...userSchema }, ['body']))
export const getUserByIdValidator = validate(checkSchema({ id: { notEmpty: true } }, ['params']))
export const deleteUserValidator = validate(checkSchema({ id: { notEmpty: true } }, ['params']))
