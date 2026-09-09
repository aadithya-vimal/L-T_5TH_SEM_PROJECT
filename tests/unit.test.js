const { canTransition } = require('../utils/transactionStateMachine');
const { pagination } = require('../utils/pagination');
describe('banking business utilities',()=>{test('allows valid transaction transitions',()=>{expect(canTransition('PENDING','PROCESSING')).toBe(true);expect(canTransition('PROCESSING','COMPLETED')).toBe(true);expect(canTransition('FAILED','COMPLETED')).toBe(false);});test('pagination clamps values',()=>{expect(pagination({page:'2',limit:'200'})).toMatchObject({page:2,limit:100,skip:100});});});
