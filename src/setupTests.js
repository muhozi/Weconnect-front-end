const localStorageMock = () => {
  var store = {};

  return {
    getItem: key => {
      return store[key] || null;
    },
    setItem: (key, value) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: key => delete store[key]
  };
};
global.localStorage = localStorageMock();
