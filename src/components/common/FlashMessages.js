import React from 'react';
import Flash from '../../lib/Flash';

class FlashMessages extends React.Component{
  state= {}

  componentDidUpdate() {
    const messages = Flash.getMessages();
    //  if there are no messages, return false
    if(!messages) return false;

    this.setState({ messages });
    Flash.clearMessages();

    setTimeout(() => this.setState({ messages: null }), 5000);
  }

  render() {
    const messages = this.state.messages;
    return(
      <div>
        {messages && messages.map((message, i) =>
          <div className='flashContainer' key={i}>
            <div className={`flash notification is-${message.type}`}  >
              {message.content}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default FlashMessages;
