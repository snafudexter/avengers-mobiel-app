import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { RkButton } from "react-native-ui-kitten";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const SEARCH_MUTATION = gql`
  mutation search(
    $name: String!
    $address: String
    $city: String
    $state: String
  ) {
    search(name: $name, address: $address, city: $city, state: $state) {
      id
      name
      sex
      specialty
      city
      state
      cust_id
      age
      address
    }
  }
`;

export default class Search extends React.Component {
  state = {
    search: "",
    content: []
  };

  pushContent = item => {
    let content = this.state.content;

    content.push(item);

    this.setState({ content });
  };

  pushResponse = items => {

    let content = this.state.content;

    content = content.concat(items)

    this.setState({content})

  }

  renderContent = () => {
    return this.state.content.map((e, i) => {
      if (e.id)
        return (
          <View key={i}>
            <View style={{ padding: "2%" }}>
              <Text>Name: {e.name}</Text>
              <Text>Age: {e.age}</Text>
              <Text>Sex: {e.sex}</Text>
              <Text>Address: {e.address}</Text>
              <Text>Speciality: {e.specialty}</Text>
              <Text>City: {e.city}</Text>
              <Text>State: {e.state}</Text>
            </View>
          </View>
        );
      else {
        return (
          <View key={i}>
            <View style={{ padding: "2%" }}>
              <Text style={{ alignSelf: "flex-end" }}>{e.content}</Text>
            </View>
          </View>
        );
      }
    });
  };

  render() {
    return (
      <Mutation mutation={SEARCH_MUTATION}>
        {(search, { data }) => (
          <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled
          >
            <View
              style={{
                backgroundColor: "#efefef",
                height: "94%",
                width: "100%",
                justifyContent: "flex-end"
              }}
            >
              {this.renderContent()}
            </View>
            <View
              style={{
                flex: 1,
                width: "100%",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexDirection: "row",
                padding: "1%",
                backgroundColor: "#efefef"
              }}
            >
              <TextInput
                autoCapitalize="none"
                value={this.state.search}
                style={styles.loginpass}
                onChangeText={t => this.setState({ search: t })}
              />
              <RkButton
                onPress={() => {
                  content = this.state.search;
                  this.pushContent({ content });
                  console.log(content);

                  search({
                    variables: {
                      name: content,
                      city: content,
                      address: content,
                      state: content
                    }
                  })
                    .then(response => {
                      this.pushResponse(response.data.search)
                    })
                    .catch(error => {
                      console.log("error");
                      console.log(error);
                    });
                }}
              >
                Search
              </RkButton>
            </View>
          </KeyboardAvoidingView>
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
    justifyContent: "space-between"
  },
  loginuser: {
    width: "75%",
    height: "auto",
    alignItems: "center",
    borderColor: "#DADBDF",
    borderWidth: 1,
    borderRadius: 25,
    marginTop: 5,
    marginBottom: 10,
    paddingRight: 15,
    paddingLeft: 15
  },
  loginpass: {
    width: "70%",
    height: "100%",
    alignItems: "center",
    alignSelf: "stretch",
    borderColor: "#DADBDF",
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: "5%"
  }
});
