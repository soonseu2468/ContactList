import React, { Component } from "react";
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl, Pressable } from "react-native";
import { Text, View } from "../components/Themed";
import ContactListJSON from "../assets/data.json";
import originData from "../assets/orginalData.json";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";

class TabOneScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ContactList: [],
			isLoading: false,
		};
		this.loadData = this.loadData.bind(this);
		this.editContact = this.editContact.bind(this);
		this.onSave = this.onSave.bind(this);
	}

	componentDidMount() {
		this.loadData();
		this.props.navigation.setOptions({
			title: "Contacts",
			headerTitleAlign: "center",
			tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
			headerLeft: () => (
				<Pressable
					// onPress={() => navigation.navigate("Modal")}
					style={({ pressed }) => ({
						opacity: pressed ? 0.5 : 1,
					})}
				>
					<FontAwesome name='search' size={25} color={Colors.light.tint} style={{ marginLeft: 15 }} />
				</Pressable>
			),
			headerRight: () => (
				<Pressable
					// onPress={() => navigation.navigate("Modal")}
					style={({ pressed }) => ({
						opacity: pressed ? 0.5 : 1,
					})}
				>
					<FontAwesome name='plus' size={25} color={Colors.light.tint} style={{ marginRight: 15 }} />
				</Pressable>
			),
		});
	}
	loadData() {
		this.setState({ isLoading: true });
		setTimeout(() => {
			this.setState({ ContactList: [...ContactListJSON], isLoading: false });
		}, 100);
	}

	editContact(item) {
		this.props.navigation.navigate("TabTwo", { ContactDetail: item, onSave: this.onSave });
	}

	onSave(data) {
		this.setState({ isLoading: true });
		let ContactList = [...this.state.ContactList];
		let index = ContactList.findIndex((el) => el.id === data.id);
		ContactList[index] = data;

		this.setState({ isLoading: false, ContactList });
	}

	refreshData() {
		this.setState({ ContactList: [...ContactListJSON] });
	}
	renderEmptyContainer() {
		return (
			<View style={styles.container}>
				{this.state.isLoading ? null : <Text style={{ textAlign: "center", fontSize: 30, color: "gray", alignContent: "center", justifyContent: "center", flex: 1 }}>No Data Show</Text>}
			</View>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					refreshControl={<RefreshControl refreshing={this.state.isLoading} onRefresh={() => this.loadData()} />}
					contentContainerStyle={{ paddingBottom: 15 }}
					data={this.state.ContactList}
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

export default TabOneScreen;

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
