import React, { Component } from 'react';
import {Text,View,TextInput,TouchableOpacity} from 'react-native';
import AppHeader from '../components/AppHeader';
import styles from '../styles';
import firebase from 'firebase';
import db from '../config';
import{Card,Header,Icon, Badge} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';

export default class ExchangeScreen extends Component {
    constructor(){
        super();
        this.state = {
            userId : firebase.auth().currentUser.email,
            name:'',
            description:'',
            giveOrWant:'Give',
            value:''
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }

    addItems(name,description){
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection('Exchange_Request').doc().set({
            "user_id": userId,
            'ItemName':name,
            'Description':description,
            "request_id"  : randomRequestId,
            "GiveOrWant":this.state.giveOrWant,
            "status":'forExchange'
        }).then(function(){
            alert('Your item has been successfully added and it is ready for exchange.');
            this.setState({
                name :null,
                description : null
            })
        }).catch(function(error){
            console.log(error);
        })
    }

    componentDidMount(){
        this.getNumberOfUnreadNotifications();
    }

    getNumberOfUnreadNotifications(){
        db.collection('all_notifications').where('status','==',"unread").where('email_id','==',this.state.barterId).onSnapshot((snapshot)=>{
            var unreadNotifications = snapshot.docs.map((doc) => doc.data())
            this.setState({
            value: unreadNotifications.length
            })
        })
    }

    BellIconWithBadge=()=>{
        return(
            <View>
            <Icon name='bell' type='font-awesome' color='#FCCA46' size={25}
                onPress={() =>this.props.navigation.navigate('Notifications')}/>
                <Badge
                value={this.state.value}
                containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
            </View>
        )
    }

    render(){
        return(
            <View style = {styles.container}>
                <AppHeader 
                    title="Exchange" navigation={this.props.navigation} 
                    leftComponent ={<Icon name='bars' type='font-awesome' color='#FCCA46'  onPress={() => this.props.navigation.toggleDrawer()}/>}
                    rightComponent={<this.BellIconWithBadge {...this.props}/>}          
                />
                <Picker 
                    selectedValue = {this.state.giveOrWant}
                    style = {styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({giveOrWant: itemValue})
                    }
                >
                    <Picker.Item label = 'Give' value = 'Give' />
                    <Picker.Item label = 'Want' value = 'Want' />
                </Picker>
                <TextInput
                    style = {styles.formTextInput}
                    placeholder = {'Item Name'}
                    multiline = {true}
                    textAlignVertical = 'top'
                    editable
                    placeholderTextColor = '#61F2C2'
                    onChangeText={(text)=>{
                        this.setState({
                            name: text
                        })
                    }}
                    value ={this.state.name}
                />
                <TextInput
                    style = {styles.formTextInput}
                    placeholder = {'Item Description'}
                    placeholderTextColor = '#61F2C2'
                    editable
                    multiline = {true}
                    numberOfLines = {5}
                    textAlignVertical = 'top'
                    onChangeText={(text)=>{
                        this.setState({
                            description: text
                        })
                    }}
                    value ={this.state.description}
                />

                <TouchableOpacity
                    style = {styles.button}
                    onPress = {()=>{this.addItems(this.state.name,this.state.description)}}
                >
                        <Text style = {styles.buttonText}>Add Items</Text>
                </TouchableOpacity>
            </View>
        )
    }
}