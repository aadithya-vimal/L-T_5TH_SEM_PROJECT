const { body, param, query, validationResult } = require('express-validator');
const collect = (req, _res, next) => { req.validationErrors = validationResult(req).array(); next(); };
const objectId = field => param(field).isMongoId().withMessage(`${field} must be a valid id`);
const amount = body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0');
module.exports = {
  authRegister: [body('name').trim().isLength({ min: 2, max: 80 }), body('email').isEmail(), body('password').isLength({ min: 8 }), body('phone').trim().isLength({ min: 10, max: 15 }), collect],
  authLogin: [body('email').isEmail(), body('password').notEmpty(), collect],
  accountCreate: [body('accountType').isIn(['SAVINGS','CURRENT']), body('currency').optional().isLength({ min: 3, max: 3 }), collect],
  accountId: [objectId('id'), collect],
  deposit: [body('accountId').isMongoId(), amount, body('description').optional().trim().isLength({ max: 250 }), collect],
  withdraw: [body('accountId').isMongoId(), amount, body('description').optional().trim().isLength({ max: 250 }), collect],
  transfer: [body('sourceAccountId').isMongoId(), body('destinationAccountNumber').isLength({ min: 8, max: 30 }), amount, collect],
  transactionList: [query('page').optional().isInt({ min: 1 }), query('limit').optional().isInt({ min: 1, max: 100 }), collect],
  beneficiaryCreate: [body('nickname').trim().isLength({ min: 2, max: 50 }), body('accountHolderName').trim().isLength({ min: 2, max: 100 }), body('accountNumber').trim().isLength({ min: 8, max: 30 }), body('bankName').trim().isLength({ min: 2, max: 100 }), body('ifscCode').matches(/^[A-Z]{4}0[A-Z0-9]{6}$/), collect],
  beneficiaryId: [objectId('id'), collect],
  billPayment: [body('accountId').isMongoId(), body('billerName').trim().isLength({ min: 2, max: 100 }), body('billerCategory').isIn(['ELECTRICITY','WATER','MOBILE','INTERNET','CREDIT_CARD','OTHER']), body('consumerNumber').trim().notEmpty(), amount, collect],
  statusUpdate: [objectId('id'), body('status').isString().notEmpty(), collect],
  supportCreate: [body('subject').trim().isLength({ min: 3, max: 120 }), body('description').trim().isLength({ min: 5, max: 1000 }), body('category').optional().isIn(['ACCOUNT','TRANSACTION','CARD','SECURITY','OTHER']), body('priority').optional().isIn(['LOW','MEDIUM','HIGH']), collect],
  supportStatus: [objectId('id'), body('status').isIn(['OPEN','IN_PROGRESS','RESOLVED','CLOSED']), body('resolution').optional().trim().isLength({ max: 1000 }), collect]
};
