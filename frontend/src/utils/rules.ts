import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
import { AnyObject } from 'yup/lib/types'

type Rules = {
  [key in
    | 'email'
    | 'password'
    | 'confirm_password'
    | 'firstName'
    | 'lastName'
    | 'middleName'
    | 'course'
    | 'group'
    | 'faculty']?: RegisterOptions
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  firstName: {
    required: {
      value: true,
      message: 'firstName là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 1 - 160 ký tự'
    },
    minLength: {
      value: 1,
      message: 'Độ dài từ 1 - 160 ký tự'
    }
  },
  lastName: {
    required: {
      value: true,
      message: 'lastName là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 1 - 160 ký tự'
    },
    minLength: {
      value: 1,
      message: 'Độ dài từ 1 - 160 ký tự'
    }
  },
  middleName: {
    required: {
      value: true,
      message: 'middleName là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 1 - 160 ký tự'
    },
    minLength: {
      value: 1,
      message: 'Độ dài từ 1 - 160 ký tự'
    }
  },
  course: {
    required: {
      value: true,
      message: 'course là bắt buộc'
    },
    valueAsNumber: true,
    maxLength: {
      value: 160,
      message: 'Độ dài từ 1 - 160 ký tự'
    },
    minLength: {
      value: 1,
      message: 'Độ dài từ 1 - 160 ký tự'
    }
  },
  faculty: {
    required: {
      value: true,
      message: 'faculty là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 1 - 160 ký tự'
    },
    minLength: {
      value: 1,
      message: 'Độ dài từ 1 - 160 ký tự'
    }
  },
  group: {
    required: {
      value: true,
      message: 'group là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 1 - 160 ký tự'
    },
    minLength: {
      value: 1,
      message: 'Độ dài từ 1 - 160 ký tự'
    }
  },
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 - 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại password không khớp'
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự'),
  confirm_password: handleConfirmPasswordYup('password'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

export const userSchema = yup.object({
  firstName: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  lastName: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  middleName: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  group: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  faculty: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  course: yup.number().max(20, 'Độ dài tối đa là 20 ký tự')
})

export type UserSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>
