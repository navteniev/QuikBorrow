import transactionsReducer from './transactionsReducer';
import * as types from '../actions/types';

describe('transactionsReducer', () => {
    it('should return the initial state', () => {
        expect(transactionsReducer([], {})).toEqual([])
    })

    it('should handle FETCH_TRANSACTIONS', () => {
        const payload = {
            approved: "false",
            borrower: "5dbcedbc2f01110000da8ac8",
            duration: 0,
            msg: "ads",
            processed: false,
            _id: "5df166451c9d4400008972b2",
        }
        expect(
            transactionsReducer([], {
                type: types.FETCH_TRANSACTIONS.FINISHED,
                payload: [{ ...payload }]
            })
        ).toEqual([payload]);
    })
})
