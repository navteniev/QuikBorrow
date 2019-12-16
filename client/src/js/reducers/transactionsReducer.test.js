import transactionsReducer from './transactionsReducer';
import * as types from '../actions/types';

describe('transactionsReducer', () => {
    it('should return the initial state', () => {
        const initialState = {
            fetching: false,
            data: []
        }
        expect(transactionsReducer({ ...initialState }, {})).toEqual(initialState)
    })

    it('should handle FETCH_TRANSACTIONS.FINISHED', () => {
        const payload = {
            approved: "false",
            borrower: "5dbcedbc2f01110000da8ac8",
            duration: 0,
            msg: "ads",
            processed: false,
            _id: "5df166451c9d4400008972b2",
        }
        expect(
            transactionsReducer({}, {
                type: types.FETCH_TRANSACTIONS.FINISHED,
                payload: [{ ...payload }]
            })
        ).toEqual({fetching: false, data: [payload]});
    })

    it('handles FETCH_TRANSACTIONS.FETCHING', () => {
        const initialState = {
            fetching: false
        }
        const action = {
            type: types.FETCH_TRANSACTIONS.FETCHING
        }
        const result = transactionsReducer(initialState, action)
        expect(result).toEqual({ fetching: true })
    })

    it('sets fetching to false for FETCH_TRANSACTIONS.FINISHED', () => {
        const initialState = {
            fetching: true
        }
        const action = {
            type: types.FETCH_TRANSACTIONS.FINISHED
        }
        const result = transactionsReducer(initialState, action)
        expect(result).toEqual({ fetching: false })
    })
})
