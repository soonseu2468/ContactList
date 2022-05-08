import { StyleSheet, TextInput, FlatList, Pressable, TouchableOpacity, RefreshControl } from "react-native";
import React, { Component } from "react";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { SearchBar } from "react-native-elements";
import _ from "lodash";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class SearchScreen extends React.Component {
	constructor(props) {
		super(props);
		this.ContactList = this.props.route.params.ContactList;
		this.state = {
			ContactList: this.ContactList,
			search: "",
		};
		this.editContact = this.editContact.bind(this);
	}

	componentDidMount() {
		this.searchInput.focus();
		this.props.navigation.setOptions({
			headerTitle: "Search",
			headerTitleAlign: "center",

			headerLeft: () => (
				<Pressable
					onPress={() => {
						this.props.navigation.goBack();
					}}
					style={({ pressed }) => ({
						opacity: pressed ? 0.5 : 1,
					})}
				>
					<Text style={{ color: Colors.light.tint }}>Back</Text>
				</Pressable>
			),
		});
	}

	handleOnChange(value, fieldName) {
		let field = this.state.Detail;
		field[fieldName] = value;
		this.setState({});
	}

	renderEmptyContainer() {
		return (
			<View style={styles.container}>
				{this.state.isLoading ? null : (
					<View>
						<Text style={{ textAlign: "center", fontSize: 20, color: "gray", alignContent: "center", justifyContent: "center", flex: 1 }}>
							Record not found. <MaterialCommunityIcons name='magnify-close' size={20} />
						</Text>
					</View>
				)}
			</View>
		);
	}

	editContact(item) {
		this.props.navigation.navigate("ContactDetail", { ContactDetail: item, action: "view" });
	}

	loadData() {
		this.setState({ isLoading: true });
		setTimeout(() => {
			this.setState({ ContactList: [...this.ContactList], isLoading: false });
		}, 100);
	}

	render() {
		const data = this.state.search
			? _.filter(this.state.ContactList, (data) => {
					return data.firstName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || data.lastName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
			  })
			: this.state.ContactList;
		return (
			<View>
				<SearchBar
					autoFocus
					placeholder='Search'
					onChangeText={(search) => this.setState({ search })}
					value={this.state.search}
					platform='ios'
					inputContainerStyle={{ backgroundColor: "#dee2e6", borderRadius: 5, paddingHorizontal: 10, height: 40 }}
					searchIcon={true}
					cancelButtonTitle=''
					cancelButtonProps={{
						buttonStyle: { width: 8 },
					}}
					ref={(input) => {
						this.searchInput = input;
					}}
				/>
				<FlatList
					refreshControl={<RefreshControl refreshing={this.state.isLoading} onRefresh={() => this.loadData()} />}
					contentContainerStyle={{ paddingBottom: 15 }}
					data={data}
					keyExtractor={(item, index) => index.toString()}
					ListEmptyComponent={this.renderEmptyContainer()}
					renderItem={({ item }) => (
						<View>
							<TouchableOpacity style={{ padding: 10, flexDirection: "row", alignItems: "center" }} onPress={() => this.editContact(item)}>
								<View style={{ backgroundColor: "#ff8c00", padding: 25, borderRadius: 50, marginRight: 5 }} />
								<Text numberOfLines={3} style={styles.title}>
									{item.firstName} {item.lastName}
								</Text>
							</TouchableOpacity>
							<View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
						</View>
					)}
				/>
			</View>
		);
	}
}
export default SearchScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		// fontWeight: "bold",
		flex: 1,
	},
	separator: {
		// marginVertical: 30,
		height: 1,
		// width: "80%",
	},
});
