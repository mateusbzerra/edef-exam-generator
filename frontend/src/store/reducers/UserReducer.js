export default function UserReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_USER': {
      return state;
    }

    default:
      return state;
  }
}
