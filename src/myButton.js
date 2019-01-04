import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class MyButton extends Component {

    render() {
        // console.warn(this.props.bgColor)
        return (
            <View style={{
                backgroundColor: this.props.bgColor,
                flex: 1,
                borderRadius: 15,
                margin: 2,
                borderWidth: 2,
                borderColor: 'green'
            }}>
                <TouchableOpacity onPress={this.props.onPress} style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{fontSize: this.props.fontSize, color: this.props.fontColor}}>
                        {this.props.text}
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default MyButton;