import React,{Component}from 'react';
import {View,Text,TextInput,Modal,KeyboardAvoidingView,Image,TouchableOpacity,Alert,ScrollView} from 'react-native';
import AppHeader from '../components/AppHeader';
import db from '../config';
import firebase from 'firebase';
import styles from '../styles';
import uri from '../components/uri';

export default class SignupLoginScreen extends Component{
  constructor(){
    super();
    this.state={
      emailId:'',
      password:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',
      isModalVisible:'false',
      isModalVisibleL:'false',
    }
  }

    userSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
        return Alert.alert("Password doesn't match\nCheck your password.")
        }else{
            firebase.auth().createUserWithEmailAndPassword(emailId, password).then(()=>{
            db.collection('users').add({
                first_name:this.state.firstName,
                last_name:this.state.lastName,
                contact:this.state.contact,
                email_id:this.state.emailId,
                address:this.state.address
            })
            return  Alert.alert(
                'User Added Successfully',
                '',
                [
                {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                ]
            );
            }).catch((error)=> {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            });
        }
    }

    userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password).then(()=>{
        Alert.alert("Successfully Login");
        this.props.navigation.navigate('Home');
    }).catch((error)=> {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
    });
    }

    showModalLogin = ()=>{
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isModalVisibleL}
            >   
            <View style={styles.modalContainer}>
                <ScrollView style={{width:'100%'}}>
                    <KeyboardAvoidingView>
                    <Text
                        style={styles.modalTitle}
                    >LOGIN</Text>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Email"}
                        keyboardType ={'email-address'}
                        onChangeText={(text)=>{
                            this.setState({
                            emailId: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Password"}
                        secureTextEntry = {true}
                        onChangeText={(text)=>{
                            this.setState({
                                password: text
                            })
                        }}
                    />
                    <View style={styles.modalBackButton}>
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={()=>
                            this.userLogin(this.state.emailId, this.state.password)
                        }
                    >
                    <Text style={styles.registerButtonText}>Login</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.modalBackButton}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={()=>this.setState({"isModalVisibleL":false})}
                    >
                    <Text style={{color:'#FE7F2D',fontWeight:'bold'}}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                </View>
            </Modal>
        )
    }

    showModal = ()=>{
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isModalVisible}
            >
                <View style={styles.modalContainer}>
                <ScrollView style={{width:'100%'}}>
                    <KeyboardAvoidingView>
                    <Text
                        style={styles.modalTitle}
                    >REGISTRATION</Text>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"First Name"}
                        maxLength ={8}
                        onChangeText={(text)=>{
                            this.setState({
                            firstName: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Last Name"}
                        maxLength ={8}
                        onChangeText={(text)=>{
                            this.setState({
                            lastName: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Contact"}
                        maxLength ={10}
                        keyboardType={'numeric'}
                        onChangeText={(text)=>{
                            this.setState({
                            contact: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Address"}
                        multiline = {true}
                        onChangeText={(text)=>{
                            this.setState({
                            address: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Email"}
                        keyboardType ={'email-address'}
                        onChangeText={(text)=>{
                            this.setState({
                            emailId: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Password"}
                        secureTextEntry = {true}
                        onChangeText={(text)=>{
                            this.setState({
                            password: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Confrim Password"}
                        secureTextEntry = {true}
                        onChangeText={(text)=>{
                            this.setState({
                            confirmPassword: text
                            })
                        }}
                    />
                    <View style={styles.modalBackButton}>
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={()=>
                            this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                        }
                    >
                    <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.modalBackButton}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={()=>this.setState({"isModalVisible":false})}
                    >
                    <Text style={{color:'#FE7F2D',fontWeight:'bold'}}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                </View>
            </Modal>
        )
    }
    render(){
        return(
        <View style={styles.container}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>

            </View>
            {
                this.showModal()
            }
            {
                this.showModalLogin()
            }
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <AppHeader title = "BaterTech" />
                <Image source={{uri:uri.img}} style={{width:350, height:200}} />
            </View>
            <View>
            <TouchableOpacity
                style={[styles.button,{marginBottom:20, marginTop:20}]}
                onPress = {()=>{
                    this.setState({
                        isModalVisibleL:true,
                    })
                }}
            >
            <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={()=>
                    this.setState({
                        isModalVisible:true,
                    })
                }
            >
            <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
        </View>
        </View>
        )
    }
}