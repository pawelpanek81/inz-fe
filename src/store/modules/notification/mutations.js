import MT from './mutation-types';

export default {
  [MT.SET_UNREAD_NOTIFICATIONS](state, notifications) {
    state.unreadNotifications = notifications;
  },
  [MT.SET_UNREAD_COUNT](state, count) {
    state.unreadCount = count;
  },
};
