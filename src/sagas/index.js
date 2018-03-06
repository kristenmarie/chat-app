import { takeEvery } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'

// handling a new message from the server asynchronously

// function* is a generator function meaning every time you run the function it can return something slightly different, generate something new
const handleNewMessage = function* handleNewMessage(params) {
  // everytime you have a generator function it is going to have a yield
  yield takeEvery(types.ADD_MESSAGE, (action) => {
    action.author = params.username
    params.socket.send(JSON.stringify(action))
  })
}

export default handleNewMessage