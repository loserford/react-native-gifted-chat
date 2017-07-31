import React from 'react'
import {
  Platform,
  StyleSheet,
  TextInput
} from 'react-native'

export default class Composer extends React.Component {
  onChange (e) {
    const contentSize = e.nativeEvent.contentSize
    if (!this.contentSize) {
      this.contentSize = contentSize
      this.props.onInputSizeChanged(this.contentSize)
    } else if (this.contentSize.width !== contentSize.width || this.contentSize.height !== contentSize.height) {
      this.contentSize = contentSize
      this.props.onInputSizeChanged(this.contentSize)
    }
  }

  onChangeText (text) {
    if (text.length && text.match(/\n$/)) {
      this.props.onSend({text: this.props.text.trim()}, true)
    } else {
      this.props.onTextChanged(text)
    }
  }

  render () {
    return (
      <TextInput
        multiline={this.props.multiline}

        onChange={(e) => this.onChange(e)}
        onChangeText={text => this.onChangeText(text)}

        style={[styles.textInput, this.props.textInputStyle, {height: this.props.composerHeight}]}

        value={this.props.text}
        accessibilityLabel={this.props.text || this.props.placeholder}
        enablesReturnKeyAutomatically
        underlineColorAndroid='transparent'
        returnKeyType='send'
        {...this.props.textInputProps}
      />
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    fontSize: 15,
    lineHeight: 15,
    minHeight: 35,
    borderWidth: 0.5,
    borderColor: '#dbdbdb',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: 'white',
    textAlignVertical: 'center',
    justifyContent: 'center'
  }
})

Composer.defaultProps = {
  onChange: () => {
  },
  composerHeight: Platform.select({
    ios: 35,
    android: 35
  }), // TODO SHARE with GiftedChat.js and tests
  text: '',
  placeholder: 'Type a message...',
  placeholderTextColor: '#b2b2b2',
  textInputProps: null,
  multiline: true,
  textInputStyle: {},
  onTextChanged: () => {
  },
  onInputSizeChanged: () => {
  }
}

Composer.propTypes = {
  onChange: React.PropTypes.func,
  composerHeight: React.PropTypes.number,
  text: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  placeholderTextColor: React.PropTypes.string,
  textInputProps: React.PropTypes.object,
  onTextChanged: React.PropTypes.func,
  onInputSizeChanged: React.PropTypes.func,
  multiline: React.PropTypes.bool,
  textInputStyle: TextInput.propTypes.style
}
