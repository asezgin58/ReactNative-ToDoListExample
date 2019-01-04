import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: Platform.OS === 'ios' ? 21 : 0
    },

    contentForm: {
        height: 90,
        flexDirection: 'row',
        padding: 5
    },

    addForm: {

        flex: 3,
        marginRight: 5,
        justifyContent: 'center',
        padding: 10
    },

    addFormTextInput: {
        height: 30,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black'
    },

    resetButton: {
        flex: 1,
        justifyContent: 'center',
        padding: 8
    },

    hr: {
        height: 0.8,
        backgroundColor: 'gray',
        marginHorizontal: 5
    },

    content: {
        height: 40,
        borderColor: 'green',
        borderWidth: 1,
        margin: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        overflow: 'hidden'
    },

    contentItem: {
        flex: 4,
        justifyContent: 'center',
        padding: 8,
        backgroundColor: '#adff2f'
    },

    contentItemText: {
        padding: 2,
        fontSize: 14,
        fontWeight: 'bold'
    },
    contentItemBtn: {
        flex: 2,
        justifyContent: 'center',
        flexDirection: 'row'
    }

});

export default styles;
