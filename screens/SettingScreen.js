import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import styles from '../styles';

export default class SettingScreen extends Component{
    constructor(){
        super();
        this.state={
          emailId:'',
          firstName:'',
          lastName:'',
          address:'',
          contact:'',
          docId:''
        }
    }

    getUserDetails = ()=>{
        var email = firebase.auth().currentUser.email;
        db.collection('users').where('email_id','==',email).get().then(snapshot => {
            snapshot.forEach(doc => {
                var data = doc.data();
                this.setState({
                    emailId:data.email_id,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    address:data.address,
                    contact:data.contact,
                    docId:doc.id
                });
            });
        })
    }

    updateUserDetails = ()=>{
        db.collection('users').doc(this.state.docId).update({
            "first_name":this.state.firstName,
            "last_name":this.state.lastName,
            "address":this.state.address,
            "contact":this.state.contact
        });
        Alert.alert('Profile Updated Successfully!');
    }

    componentDidMount(){
        this.getUserDetails();
    }

    render(){
        return(
            <View style = {styles.container}>
                <KeyboardAvoidingView style = {styles.formContainer}>
                    <Text style ={styles.modalTitle}>Settings</Text>
                    <TextInput 
                        style = {styles.loginBox}
                        placeholder = {"First Name"}
                        maxLength = {8}
                        onChangeText = {(text)=>{
                            this.setState({
                                firstName:text
                            })
                        }}
                        value = {this.state.firstName}
                    />
                    <TextInput 
                        style = {styles.loginBox}
                        placeholder = {"Last Name"}
                        maxLength = {8}
                        onChangeText = {(text)=>{
                            this.setState({
                                lastName:text
                            })
                        }}
                        value = {this.state.lastName}
                    />
                    <TextInput 
                        style = {styles.loginBox}
                        placeholder = {"Contact"}
                        maxLength = {10}
                        keyboardType = {'numeric'}
                        onChangeText = {(text)=>{
                            this.setState({
                                contact:text
                            })
                        }}
                        value = {this.state.contact}
                    />
                    <TextInput 
                        style = {styles.loginBox}
                        placeholder = {"Address"}
                        multiline = {true}
                        onChangeText = {(text)=>{
                            this.setState({
                                address:text
                            })
                        }}
                        value = {this.state.address}
                    />
                    <TouchableOpacity
                        style = {styles.button}
                        onPress = {()=>{
                            this.updateUserDetails()
                        }}
                    >
                        <Text style = {styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }

}