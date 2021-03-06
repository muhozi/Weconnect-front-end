/**
 * Mock register response
 */
export const successRegisterResponse = {
  status: 201,
  response: {
    status: 'ok',
    response: 'You have been successfully registered'
  }
};

/**
 * Mock registration exception response
 */
export const registerFailResponse = {
  status: 400,
  response: {
    status: 'error',
    message: 'Please provide valid details',
    errors: {
      username: ['username has been taken'],
      email: ['email has been taken']
    }
  }
};

/**
 * Mock login response
 */
export const successLoginResponse = {
  status: 200,
  response: {
    status: 'ok',
    message: 'You have been successfully logged in',
    access_token: 'fnsdjfnskjdfs',
    user: {
      username: 'emery',
      email: 'emery@weconnect.com'
    }
  }
};

/**
 * Mock invalid login response
 */
export const loginFailResponse = {
  status: 400,
  response: {
    status: 'error',
    message: 'Invalid password'
  }
};

/**
 * Mock logout request response
 */
export const logoutResponse = {
  status: 200,
  response: {
    status: 'ok',
    message: 'You have successfully logged out'
  }
};

/**
 * Mock businesses response data
 */
export const businessesResponse = {
  status: 200,
  response: {
    status: 'ok',
    message: 'There are 20 businesses found',
    next_page: 2,
    previous_page: null,
    current_page: 1,
    pages: 15,
    total_businesses: 281,
    businesses: [
      {
        id: 'l2JLrg81Rjd6KWeAeLanpEGVvMoQPYzNbk',
        user_id: 'LJva4WoPE2RZ6zVnYyn7YO35NQk8GjgMyd',
        name: 'Andela Talent Accelerator',
        description: 'Awesome',
        category: 'kjsdhfksjdhkj',
        country: 'Kenya',
        city: 'Nairobi',
        reviews_count: 0,
        created_at: 'Tue, 17 Jul 2018 18:12:01 GMT'
      }
    ]
  }
};

/**
 * Mock invalid businesses response data
 */
export const invalidBusinessesResponse = {
  status: 400,
  response: {
    status: 'error',
    message: 'Page not found'
  }
};

/**
 * Mock single business response
 */
export const singleBusinessResponse = {
  status: 200,
  response: {
    status: 'ok',
    message: 'Business found',
    business: {
      id: 'a69de3743ae24ac89dc3dc2e54c91b3b',
      user_id: 'a69de3743ae24ac89dc3dc2e54c9bdsf',
      name: 'Inzora rooftop',
      description: 'We get best coffee',
      category: 'Coffee-shop',
      country: 'Rwanda',
      city: 'Kigali',
      reviews_count: '1',
      created_at: 'Thu, 24 May 2018 19:14:36 GMT'
    }
  }
};

/**
 * Mock invalid single business response
 */
export const invalidBusinessResponse = {
  status: 400,
  response: {
    status: 'error',
    message: 'Business not found'
  }
};

/**
 * Mock business registration response
 */
export const businessRegistrationResponse = {
  status: 201,
  response: {
    status: 'ok',
    message: 'Your business has been successfully registered'
  }
};

/**
 * Mock invalid business registration response
 */
export const invalidBusinessRegisterResponse = {
  status: 400,
  response: {
    status: 'error',
    message: 'Please provide valid details',
    errors: {
      city: ['City is required']
    }
  }
};

/**
 * Mock business update response
 */
export const businessUpdateResponse = {
  status: 201,
  response: {
    status: 'ok',
    message: 'Your business has been successfully updated'
  }
};
/**
 * Mock business invalid update response
 */
export const businessInvalidUpdateResponse = {
  status: 400,
  response: {
    status: 'error',
    message: "This business doesn't exist or you don't have privileges to it"
  }
};

/**
 * Mock business delete response
 */
export const businessDeleteResponse = {
  status: 202,
  response: {
    status: 'ok',
    message: 'Your business has been successfully deleted'
  }
};

/**
 * Mock business invalid delete response
 */
export const businessDeleteInvalidResponse = {
  status: 400,
  response: {
    status: 'error',
    message: 'Business not found'
  }
};

/**
 * Reset password response mock
 */
export const resetPasswordResponse = {
  status: 201,
  response: {
    status: 'ok',
    message: 'Check your email to reset password'
  }
};

/**
 * Invalid reset password response mock
 */
export const invalidResetPasswordResponse = {
  status: 400,
  response: {
    status: 'error',
    message: "Email doesn't exist"
  }
};

/**
 * Change password invalid response mock
 */
export const changePasswordResponse = {
  status: 201,
  response: {
    status: 'ok',
    message: 'Your email was confirmed successfully'
  }
};

/**
 * Change password invalid response mock
 */
export const invalidChangePasswordResponse = {
  status: 400,
  response: {
    status: 'ok',
    message: 'Your email was confirmed successfully'
  }
};

/**
 * Confirm email valid response mock
 */
export const confirmEmailResponse = {
  status: 200,
  response: {
    status: 'ok',
    message: 'Your email was confirmed successfully'
  }
};

/**
 * Confirm email invalid response mock
 */
export const invalidConfirmEmailResponse = {
  status: 400,
  response: {
    status: 'error',
    message: 'Invalid confirm link token or email'
  }
};
/**
 * Add review response mock
 */
export const addReviewResponse = {
  status: 201,
  response: {
    status: 'ok',
    message: 'Your review has been submitted'
  }
};
/**
 * Add review invalid response mock
 */
export const invalidAddReviewResponse = {
  status: 400,
  response: {
    status: 'error',
    message: "This business doesn't exist"
  }
};

/**
 * Unauthorized response mock
 */
export const unauthorizedResponse = {
  response: {
    status: 401,
    statusText: 'UNAUTHORIZED',
    data: {
      status: 'error',
      message: 'Unauthorized'
    }
  }
};

export const unauthorizedLoginResponse = {
  response: {
    status: 401,
    statusText: 'UNAUTHORIZED',
    data: {
      status: 'error',
      message: 'Invalid email or password'
    }
  }
};

export const networkErrorResponse = {
  message: 'Network error'
};
