/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
self.importScripts('https://www.gstatic.com/firebasejs/6.4.1/firebase-app.js')
self.importScripts('https://www.gstatic.com/firebasejs/6.4.1/firebase-messaging.js')

const firebaseConfig = {
  messagingSenderId: '1082565869648'
}

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('Payload: ', payload)
  return self.registration.showNotification(payload.data.title, {
    body: payload.data.body,
    icon: payload.data.icon
  })
})
