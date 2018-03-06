import { connect } from 'react-redux'
import MessagesListComponent from '../components/MessagesList'

// Connect to MessagesList component.
export const MessagesList = connect(state => ({
  messages: state.messages
}), {})(MessagesListComponent)