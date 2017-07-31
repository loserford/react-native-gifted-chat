import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import Avatar from './Avatar'
import Bubble from './Bubble'
import Day from './Day'

import {isSameUser, isSameDay} from './utils'

export default class Message extends React.Component {

  getInnerComponentProps () {
    const {containerStyle, ...props} = this.props
    return {
      ...props,
      isSameUser,
      isSameDay
    }
  }

  renderDay () {
    if (this.props.currentMessage.createdAt) {
      const dayProps = this.getInnerComponentProps()
      if (this.props.renderDay) {
        return this.props.renderDay(dayProps)
      }
      return <Day {...dayProps} />
    }
    return null
  }

  renderName () {
    return (
      <Text style={styles.name}>{this.props.currentMessage.user.name}</Text>
    )
  }

  renderBubble () {
    const bubbleProps = this.getInnerComponentProps()
    if (this.props.renderBubble) {
      return this.props.renderBubble(bubbleProps)
    }
    return <Bubble {...bubbleProps} />
  }

  renderAvatar () {
    // if (this.props.user._id !== this.props.currentMessage.user._id) {
    const avatarProps = this.getInnerComponentProps()
    return <Avatar {...avatarProps} />
    // }
    return null
  }

  render () {
    return (
      <View style={{marginBottom: 12}}>
        {this.renderDay()}
        <View style={[styles[this.props.position].container, {
          marginBottom: isSameUser(this.props.currentMessage, this.props.nextMessage) ? 2 : 10
        }, this.props.containerStyle[this.props.position]]}>
          {this.props.position === 'left' ? this.renderAvatar() : null}
          <View style={{flex: 1}}>
            { this.props.position === 'left' && this.props.showName && this.renderName()}
            {this.renderBubble()}
          </View>
          {this.props.position === 'right' ? this.renderAvatar() : null}
        </View>
      </View>
    )
  }
}

const styles = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginLeft: 8,
      marginRight: 0
    }
  }),
  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      marginLeft: 0,
      marginRight: 8
    }
  }),
  name: {
    color: '#484848',
    fontSize: 12,
    marginBottom: 4
  }
}

Message.defaultProps = {
  renderAvatar: null,
  renderBubble: null,
  renderDay: null,
  position: 'left',
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  user: {},
  containerStyle: {}
}

Message.propTypes = {
  renderAvatar: React.PropTypes.func,
  renderBubble: React.PropTypes.func,
  renderDay: React.PropTypes.func,
  position: React.PropTypes.oneOf(['left', 'right']),
  currentMessage: React.PropTypes.object,
  nextMessage: React.PropTypes.object,
  previousMessage: React.PropTypes.object,
  user: React.PropTypes.object,
  containerStyle: React.PropTypes.shape({
    left: View.propTypes.style,
    right: View.propTypes.style
  })
}
