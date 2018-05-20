import { TEST } from '../actions/Constants';
const initialState = {
  data: ['oranges', 'bananas', 'apples']
};
export default function sampleReducer(state = initialState, action) {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        data: []
      };
    default:
      return state;
  }
}
