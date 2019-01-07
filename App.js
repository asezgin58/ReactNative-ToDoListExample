/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, AsyncStorage, Text, View, ScrollView, TextInput, Button} from 'react-native';


import styles from './src/styles';
import MyButton from './src/myButton';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            task: '',
            list: [],
            editData: null
        }
    }

    componentWillMount() {

        let newList = [];

        AsyncStorage.getAllKeys((err, keys) => {

            // console.warn(keys)

            keys.map(async (item) => {

                try {
                    const value = await AsyncStorage.getItem(item);

                    // console.warn(value)
                    if (value !== null) {

                        let obj = {
                            taskId: item,
                            data: value
                        }
                        // We have data!!
                        newList.push(obj);
                    }

                    this.setState({
                        list: newList,
                        task: ''
                    });

                } catch (error) {
                    // Error retrieving data

                    console.error(error);
                }

            })

        });

    }

    addItem = async () => {
        // AsyncStorage.clear()

        // console.warn('addItem')
        const {list} = this.state;

        let newList = list;

        let rndNumber = Math.floor(Math.random() * Number.MAX_VALUE);
        try {
            await AsyncStorage.setItem('task' + rndNumber, this.state.task);
            const value = await AsyncStorage.getItem('task' + rndNumber);

            if (value !== null) {

                let obj = {
                    taskId: 'task' + rndNumber,
                    data: value
                }
                // We have data!!
                newList.push(obj);
            }

            this.setState({
                list: newList,
                task: ''
            });
        } catch (error) {
            console.error(error)
        }

    }

    reset = async () => {
        AsyncStorage.clear();

        this.setState({
            task: '',
            list: [],
            editData: null
        });

    }

    deleteItem = async (taskId) => {

        // console.warn(taskId)
        const {list} = this.state;

        try {
            await AsyncStorage.removeItem(taskId);

            let newList = list.filter(f => f.taskId !== taskId);

            this.setState({
                list: newList,
                task: ''
            });

        } catch (error) {
            console.error(error)
        }

    }

    editItem = (item) => {

        this.setState({
            editData: item
        });

    }

    updateItem = async () => {

        // console.warn('updateItem', this.state.editData)

        const {list} = this.state;

        try {
            await AsyncStorage.setItem(this.state.editData.taskId, this.state.editData.data);

            for (let item of list) {
                if (item.taskId === this.state.editData.taskId) {

                    item.data = this.state.editData.data;
                }
            }

            this.setState({
                editData: null,
                task: ''
            });

        } catch (error) {
            console.error(error)
        }


    }

    renderItem = () => {

        // console.warn(this.state.list)

        return this.state.list.map((item, key) => {
            return (
                <View key={key} style={styles.content}>
                    <View style={styles.contentItem}>

                        <Text style={styles.contentItemText}>{item.data}</Text>

                    </View>
                    <View style={styles.contentItemBtn}>

                        <Button onPress={() => this.deleteItem(item.taskId)} title={'Del'} color={'red'}></Button>
                        <Button onPress={() => this.editItem(item)} title={'Edit'}></Button>

                    </View>

                </View>
            );

        })

    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.contentForm}>

                    <View style={styles.addForm}>

                        <TextInput value={this.state.editData === null ? this.state.task : this.state.editData.data}
                                   onChangeText={(v) => this.state.editData === null ? this.setState({task: v}) : this.setState({
                                       editData: {
                                           taskId: this.state.editData.taskId,
                                           data: v
                                       }
                                   })}
                                   placeholder={'Enter a task information...'}
                                   style={styles.addFormTextInput}/>

                        <MyButton
                            onPress={this.state.editData === null ? this.addItem : this.updateItem}
                            text={'Save'} fontSize={16} fontColor={'black'}
                            bgColor={'#7cfc00'}></MyButton>
                    </View>
                    <View style={styles.resetButton}>

                        <Button onPress={this.reset} title={'Reset'} color={'red'}></Button>


                    </View>

                </View>

                <View style={styles.hr}></View>

                <ScrollView>

                    {this.renderItem()}

                </ScrollView>

            </View>
        );
    }
}


