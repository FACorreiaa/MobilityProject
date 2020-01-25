import React from 'react';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function Notify() {
  return (
    <div>
      {store.addNotification({
        title: 'Balance!',
        message: 'Your balance is getting to 0',
        type: 'warning',
        insert: 'top',
        container: 'top-center',
        animationIn: ['animated', 'flash'],
        animationOut: ['animated', 'zoomOut'],
        dismiss: {
          duration: 100,
          onScreen: true
        }
      })}
    </div>
  );
}

export default Notify;
