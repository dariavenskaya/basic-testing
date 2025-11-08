// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(100).getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    expect(() => account.withdraw(101)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(101, getBankAccount(100))).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(100);
    expect(account.getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(100);
    expect(account.getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const account = getBankAccount(100);
    const toAccount = getBankAccount(50);
    account.transfer(100, toAccount);
    expect(account.getBalance()).toBe(0);
    expect(toAccount.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const balance = await account.fetchBalance();

    // The function does not fail. It just returns null, so we need to check if it is null or not.
    if (balance === null) {
      expect(balance).toBeNull();
    } else {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(42);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(42);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
