const mongoose = require('mongoose');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const Notification = require('../models/Notification');
const ApiError = require('../utils/ApiError');
const { generateTransactionReference } = require('../utils/transactionReference');
const { ACCOUNT_STATUS } = require('../utils/constants');

async function withSession(work) {
  const session = await mongoose.startSession();
  try { let result; await session.withTransaction(async () => { result = await work(session); }); return result; } finally { await session.endSession(); }
}
async function deposit(user, accountId, amount, description='Deposit') {
  return withSession(async session => {
    const account = await Account.findOne({ _id: accountId, userId: user._id }).session(session);
    if (!account) throw new ApiError(404, 'Account not found', 'NOT_FOUND');
    if (account.status !== ACCOUNT_STATUS.ACTIVE) throw new ApiError(409, 'Account is not active', 'ACCOUNT_NOT_ACTIVE');
    const before = account.balance;
    account.balance += amount; account.availableBalance += amount;
    await account.save({ session });
    const tx = await Transaction.create([{ transactionReference: generateTransactionReference('DEP'), userId: user._id, destinationAccountId: account._id, type: 'DEPOSIT', amount, currency: account.currency, status: 'COMPLETED', description, balanceBefore: before, balanceAfter: account.balance }], { session });
    await Notification.create([{ userId: user._id, type: 'TRANSACTION', title: 'Deposit successful', message: `₹${amount.toFixed(2)} was credited to account ending ${account.accountNumber.slice(-4)}.`, metadata: { transactionId: tx[0]._id } }], { session });
    return { transaction: tx[0], account };
  });
}
async function withdraw(user, accountId, amount, description='Withdrawal') {
  return withSession(async session => {
    const account = await Account.findOne({ _id: accountId, userId: user._id }).session(session);
    if (!account) throw new ApiError(404, 'Account not found', 'NOT_FOUND');
    if (account.status !== ACCOUNT_STATUS.ACTIVE) throw new ApiError(409, 'Account is not active', 'ACCOUNT_NOT_ACTIVE');
    if (account.availableBalance < amount) throw new ApiError(409, 'Insufficient funds', 'INSUFFICIENT_FUNDS');
    const before = account.balance;
    account.balance -= amount; account.availableBalance -= amount;
    await account.save({ session });
    const tx = await Transaction.create([{ transactionReference: generateTransactionReference('WDL'), userId: user._id, sourceAccountId: account._id, type: 'WITHDRAWAL', amount, currency: account.currency, status: 'COMPLETED', description, balanceBefore: before, balanceAfter: account.balance }], { session });
    await Notification.create([{ userId: user._id, type: 'TRANSACTION', title: 'Withdrawal successful', message: `₹${amount.toFixed(2)} was debited from your account.`, metadata: { transactionId: tx[0]._id } }], { session });
    return { transaction: tx[0], account };
  });
}
async function transfer(user, sourceAccountId, destinationAccountNumber, amount, description='Transfer') {
  return withSession(async session => {
    const source = await Account.findOne({ _id: sourceAccountId, userId: user._id }).session(session);
    const destination = await Account.findOne({ accountNumber: destinationAccountNumber }).session(session);
    if (!source || !destination) throw new ApiError(404, 'Source or destination account not found', 'NOT_FOUND');
    if (source._id.equals(destination._id)) throw new ApiError(409, 'Source and destination accounts cannot be the same', 'SELF_TRANSFER');
    if (source.status !== 'ACTIVE' || destination.status !== 'ACTIVE') throw new ApiError(409, 'Both accounts must be active', 'ACCOUNT_NOT_ACTIVE');
    if (source.availableBalance < amount) throw new ApiError(409, 'Insufficient funds', 'INSUFFICIENT_FUNDS');
    const before = source.balance;
    source.balance -= amount; source.availableBalance -= amount;
    destination.balance += amount; destination.availableBalance += amount;
    await source.save({ session }); await destination.save({ session });
    const tx = await Transaction.create([{ transactionReference: generateTransactionReference('TRF'), sourceAccountId: source._id, destinationAccountId: destination._id, userId: user._id, type: 'TRANSFER', amount, currency: source.currency, status: 'COMPLETED', description, balanceBefore: before, balanceAfter: source.balance, metadata: { destinationAccount: destination.accountNumber.slice(-4) } }], { session });
    await Notification.create([{ userId: user._id, type: 'TRANSACTION', title: 'Transfer successful', message: `₹${amount.toFixed(2)} transferred successfully.`, metadata: { transactionId: tx[0]._id } }], { session });
    return { transaction: tx[0], sourceAccount: source, destinationAccount: destination };
  });
}
module.exports = { deposit, withdraw, transfer };
