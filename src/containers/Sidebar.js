import { connect } from 'react-redux'
import SidebarComponent from '../components/Sidebar'

// Connect to MessagesList component.
export const Sidebar = connect(state => ({
  users: state.users
}), {})(SidebarComponent)