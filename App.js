import React from "react";
import { AppRegistry } from "react-native";
import { render } from "react-dom";
import { AsyncStorage } from "react-native";
import ApolloClient from "apollo-boost";
import { NativeRouter, Switch, Route, Redirect } from "react-router-native";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";
import { persistCache } from "apollo-cache-persist";
import { StyleSheet, Text, View } from "react-native";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
//import Container from './components/Container'
//import TaskList from './pages/TaskList';
import Login from "./pages/Login";
//import TNC from './pages/TNC';
import Search from "./pages/Search";
const cache = new InMemoryCache();

persistCache({
  cache,
  storage: AsyncStorage
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/"
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("avenger-auth-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

// const client = new ApolloClient({
//   link: concat(authLink, httpLink),
//   cache
// });

// const networkInterface = createNetworkInterface(
//   "http://localhost:4000/"
// );
const client = new ApolloClient({
  uri: "http://192.168.1.10:4000/"
});

export default class App extends React.Component {
  render() {
    console.log("render");
    return (
      <ApolloProvider client={client}>
        <NativeRouter>
          <Switch>
            {/* <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Search} />
            {/* <Route component={Container} /> */}
          </Switch>
        </NativeRouter>
      </ApolloProvider>
    );
  }
}
AppRegistry.registerComponent("Avenger", () => App);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
