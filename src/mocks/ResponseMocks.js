export const successRegisterResponse = {
  status: 201,
  response: {
    status: 'ok',
    response: 'You have been successfully registered'
  }
};
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
export const successLoginResponse = {
  status: 200,
  response: {
    "status": "ok",
    "message": "You have been successfully logged in",
    "access_token": "token....."
  }
};
export const loginFailResponse = {
  status: 400,
  response: {
    "status": "error",
    "message": "Invalid password"
  }
};
export const logoutResponse = {
  status: 200,
  response: {
    "status": "ok",
    "message": "You have successfully logged out"
  }
};
