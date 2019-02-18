import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { RkButton, RkTextInput } from "react-native-ui-kitten";
import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity } from "react-native";
import { AsyncStorage, Image } from "react-native";
import _ from "underscore";
import { Redirect } from "react-router-native";
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
export default class Login extends React.Component {
  state = {
    resp: "no response",
    username: "",
    password: "",
    hidden: true
  };

  async componentDidMount() {
    let user = await AsyncStorage.getItem("logged_in_user");
    if (user) {
      console.log(user);
      if (!_.isEmpty(user)) {
        this.props.history.push('/dashboard')
      }
    }
  }

  togglePass = () => {
    this.setState({ hidden: !this.state.hidden})
  }

  render() {
    // if (_.isEmpty(this.state.user)) {
    //   return <Redirect to="/dashboard" />;
    // }
    return (
      <Mutation mutation={LOGIN}>
        {(login, { data }) => (
          <View style={styles.container}>
            <Text textAlign="justify">Username</Text>
            <TextInput
              autoCapitalize="none"
              value={this.state.username}
              style={styles.loginuser}
              onChangeText={t => this.setState({ username: t })}
            />
            <Text textAlign="left">Password</Text>
            <View 
              style={{
                width: "75%",
                height: 30,
                position: 'relative',
                justifyContent: 'center',
                borderColor: "#DADBDF",
                borderWidth: 1,
                borderRadius: 25,
                marginBottom: 10,
                paddingTop: 2
              }}>
              <TextInput
                autoCapitalize="none"
                value={this.state.password}
                style={styles.loginpass}
                secureTextEntry={this.state.hidden}
                onChangeText={t => this.setState({ password: t })}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 3,
                  height: 40,
                  width: 35,
                  padding: 5
                }}
                  onPress={()=>this.togglePass()}
              >
              <Image 
                source={this.state.hidden ? require('./../../content/hide.png') :  require('./../../content/show.png')}
                style={{ 
                  resizeMode: 'contain',
                  height: '100%',
                  width: '100%' 
                }}/>
              </TouchableOpacity>
            </View>
            <RkButton
              onPress={() => {
                this.props.history.push('/search')
              }}
            >
              LOGIN
            </RkButton>
            {/* <View style={{ marginTop: "10%" }}>
              <Text>
                By logging in, you agree to the{" "}
                <Text
                  style={{ color: "blue" }}
                  onPress={() => {
                    this.props.history.push("/tnc");
                  }}
                >
                  privacy policy and terms of use
                </Text>
              </Text>
            </View> */}
          </View>
        )}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  loginuser: {
    width: "75%",
    height: 'auto',
    alignItems: "center",
    borderColor: "#DADBDF",
    borderWidth: 1,
    borderRadius: 25,
    marginTop: 5,
    marginBottom: 10,
    paddingRight : 15,
    paddingLeft: 15,
  },
  loginpass: {
    width: "90%",
    height: 'auto',
    alignItems: "center",
    marginBottom: 10,
    alignSelf: 'stretch',
    paddingLeft: 15,
    position: 'relative',
    top: 3
  }
});