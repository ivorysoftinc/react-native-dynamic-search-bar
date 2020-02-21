import React, { Component } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
/**
 * ? Local Imports
 */
import styles, {
  container,
  _shadowStyle,
  textInputStyle,
  ifIPhoneXHeader
} from "./SearchBar.style";
import SearchIcon from "./components/SearchIcon/SearchIcon";
import SearchCancel from "./components/SearchCancel/SearchCancel";
import SearchTextInput from "./components/SearchTextInput/SearchTextInput";

interface IProps {
  fontSize: number;
  iconName: string;
  iconType: string;
  iconSize: number;
  onPress: Function;
  iconColor: string;
  fontColor: string;
  autoFocus: boolean;
  iconComponent: any;
  shadowColor: string;
  placeholder: string;
  textInputValue: any;
  cancelComponent: any;
  noExtraMargin: boolean;
  cancelIconName: string;
  cancelIconType: string;
  cancelIconSize: number;
  onPressCancel: Function;
  cancelIconColor: string;
  textInputComponent: any;
  onPressToFocus: Function;
  cancelIconComponent: any;
  textInputDisable: boolean;
  cancelButtonDisable: boolean;
}

interface IState {}

let textInputRef = null;

export default class SearchBar extends Component<IProps, IState> {
  render() {
    const {
      onPress,
      fontSize,
      iconName,
      iconType,
      iconSize,
      iconColor,
      fontColor,
      autoFocus,
      shadowColor,
      placeholder,
      onPressCancel,
      iconComponent,
      noExtraMargin,
      onPressToFocus,
      textInputValue,
      cancelIconName,
      cancelIconType,
      cancelIconSize,
      cancelIconColor,
      cancelComponent,
      textInputDisable,
      textInputComponent,
      cancelIconComponent,
      cancelButtonDisable
    } = this.props;

    return (
      <TouchableOpacity
        rippleColor="#807DE7"
        rippleContainerBorderRadius={10}
        onPress={() => {
          onPressToFocus ? textInputRef.focus() : onPress();
        }}
        style={[
          styles.center,
          container(this.props),
          ifIPhoneXHeader(noExtraMargin),
          _shadowStyle(shadowColor)
        ]}
      >
        <View style={styles.containerGlue}>
          <View style={styles.searchStyle}>
            <SearchIcon
              iconName={iconName}
              iconType={iconType}
              iconSize={iconSize}
              iconColor={iconColor}
              iconComponent={iconComponent}
            />
            <SearchTextInput
              fontSize={fontSize}
              fontColor={fontColor}
              placeholder={placeholder}
              textInputDisable={textInputDisable}
              textInputComponent={
                textInputComponent ||
                (!textInputDisable && (
                  <View style={styles.textInputContainer}>
                    <TextInput
                      autoFocus={autoFocus}
                      value={textInputValue}
                      placeholder={placeholder}
                      placeholderTextColor={fontColor}
                      style={[textInputStyle(fontSize, fontColor)]}
                      ref={c => {
                        this.textInput = c;
                        textInputRef = c;
                      }}
                      {...this.props}
                    />
                  </View>
                ))
              }
            />
          </View>
          <SearchCancel
            cancelIconName={cancelIconName}
            cancelIconType={cancelIconType}
            cancelIconSize={cancelIconSize}
            cancelIconColor={cancelIconColor}
            cancelComponent={cancelComponent}
            cancelIconComponent={cancelIconComponent}
            cancelButtonDisable={cancelButtonDisable}
            onPressCancel={() => {
              if (onPressCancel) {
                if (this.textInput) this.textInput.clear();
                onPressCancel();
              } else {
                if (this.textInput) this.textInput.clear();
              }
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}