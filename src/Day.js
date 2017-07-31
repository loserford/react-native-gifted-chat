import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import moment from 'moment/min/moment-with-locales.min'

import { isSameInterval, isSameUser, warnDeprecated, displayTimeString } from './utils'

// {moment(this.props.currentMessage.createdAt).locale(this.context.getLocale()).format('YYYY[年]M[月]D[日] HH:mm')}
export default class Day extends React.Component {
  render () {
    if (!isSameInterval(this.props.currentMessage, this.props.previousMessage)) {
      return (
        <View style={[styles.container, this.props.containerStyle]}>
          <View style={[styles.wrapper, this.props.wrapperStyle]}>
            <Text style={[styles.text, this.props.textStyle]}>
              {
                displayTimeString(this.props.currentMessage.createdAt)
              }
            </Text>
          </View>
        </View>
      )
    }
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 18
  },
  wrapper: {
    backgroundColor: '#d0d0d0',
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  text: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 11,
    fontWeight: '600'
  }
})

Day.contextTypes = {
  getLocale: React.PropTypes.func
}

Day.defaultProps = {
  currentMessage: {
    // TODO test if crash when createdAt === null
    createdAt: null
  },
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
  // TODO: remove in next major release
  isSameInterval: warnDeprecated(isSameInterval),
  isSameUser: warnDeprecated(isSameUser)
}

Day.propTypes = {
  currentMessage: React.PropTypes.object,
  previousMessage: React.PropTypes.object,
  containerStyle: View.propTypes.style,
  wrapperStyle: View.propTypes.style,
  textStyle: Text.propTypes.style,
  // TODO: remove in next major release
  isSameInterval: React.PropTypes.func,
  isSameUser: React.PropTypes.func
}
