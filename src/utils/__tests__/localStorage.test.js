import {
  clearLocalStorage, getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage,
} from '../localStorage';

describe('LocalStorage utils tests', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem');
  });

  afterEach(() => {
    localStorage.setItem.mockRestore();
  });

  it('Should return undefined on no token', () => {
    const localStorageToken = getFromLocalStorage('token');
    expect(localStorageToken).toBeUndefined();
  });

  it('Should save token to local storage', () => {
    saveToLocalStorage('token', 1);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', '1');

    const localStorageToken = getFromLocalStorage('token');
    expect(localStorageToken).toEqual(1);
  });

  it('Should remove token from local storage', () => {
    removeFromLocalStorage('token');
    expect(getFromLocalStorage('token')).toBeUndefined();
  });

  it('Should clear local storage', () => {
    clearLocalStorage();
    expect(getFromLocalStorage('token')).toBeUndefined();
  });
});
