import { StyleSheet, TextInput, ScrollView, Pressable, Alert } from "react-native";
import React, { Component } from "react";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
// import useColorScheme from "../hooks/useColorScheme";

// const colorScheme = useColorScheme();

class TabTwoScreen extends React.Component {
	constructor(props) {
		super(props);
		let item = this.props.route.params.ContactDetail;

		this.state = {
			Detail: { ...item },
		};
	}

	componentDidMount() {
		// this.setState({ Detail: this.ContactDetail });

		this.props.navigation.setOptions({
			headerTitle: "",
			headerLeft: () => (
				<Pressable
					onPress={() => {
						this.props.navigation.goBack();
					}}
					style={({ pressed }) => ({
						opacity: pressed ? 0.5 : 1,
					})}
				>
					<Text style={{ color: Colors.light.tint }}>Cancel</Text>
				</Pressable>
			),
			headerRight: () => (
				<Pressable
					onPress={() => {
						if (this.state.Detail.firstName !== "") {
							if (this.state.Detail.lastName !== "") {
								this.props.route.params.onSave(this.state.Detail);
								Alert.alert("", "Saved successfully");
								this.props.navigation.goBack();
							} else {
								Alert.alert("Alert", "Last Name cannot be blank.");
								this.lastTextInput.focus();
							}
						} else {
							Alert.alert("Alert", "First Name cannot be blank.");
							this.firstTextInput.focus();
						}
					}}
					style={({ pressed }) => ({
						opacity: pressed ? 0.5 : 1,
					})}
				>
					<Text style={{ color: Colors.light.tint }}>Save</Text>
				</Pressable>
			),
		});
	}

	handleOnChange(value, fieldName) {
		let field = this.state.Detail;
		field[fieldName] = value;
		this.setState({});
	}

	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					<View style={{ backgroundColor: "#ff8c00", padding: 80, borderRadius: 100, marginVertical: 50, justifyContent: "center" }} />
					<Text style={styles.title}>Main Information</Text>
					<View style={styles.informationContainer}>
						<Text style={styles.subTitle}>First Name</Text>
						<TextInput
							ref={(input) => {
								this.firstTextInput = input;
							}}
							value={this.state.Detail.firstName}
							style={styles.textInput}
							onChangeText={(value) => {
								this.handleOnChange(value, "firstName");
							}}
							returnKeyType='next'
							onSubmitEditing={() => {
								this.lastTextInput.focus();
							}}
						/>
					</View>
					<View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
					<View style={styles.informationContainer}>
						<Text style={styles.subTitle}>Last Name</Text>
						<TextInput
							ref={(input) => {
								this.lastTextInput = input;
							}}
							value={this.state.Detail.lastName}
							style={styles.textInput}
							onChangeText={(value) => {
								this.handleOnChange(value, "lastName");
							}}
							returnKeyType='next'
							onSubmitEditing={() => {
								this.emailTextInput.focus();
							}}
						/>
					</View>
					<Text style={styles.title}>Sub Information</Text>
					<View style={styles.informationContainer}>
						<Text style={styles.subTitle}>Email</Text>
						<TextInput
							ref={(input) => {
								this.emailTextInput = input;
							}}
							value={this.state.Detail.email}
							style={styles.textInput}
							onChangeText={(value) => {
								this.handleOnChange(value, "email");
							}}
							returnKeyType='next'
							onSubmitEditing={() => {
								this.phoneTextInput.focus();
							}}
						/>
					</View>
					<View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
					<View style={styles.informationContainer}>
						<Text style={styles.subTitle}>Phone</Text>
						<TextInput
							ref={(input) => {
								this.phoneTextInput = input;
							}}
							value={this.state.Detail.phone}
							style={styles.textInput}
							onChangeText={(value) => {
								this.handleOnChange(value, "phone");
							}}
							returnKeyType='done'
						/>
					</View>
				</View>
			</ScrollView>
		);
	}
}
export default TabTwoScreen;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	informationContainer: {
		flexDirection: "row",
		marginVertical: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		backgroundColor: "#eee",
		width: "100%",
		paddingLeft: 10,
	},
	subTitle: {
		fontSize: 16,
		textAlign: "left",
		paddingHorizontal: 10,
		width: "30%",
	},
	textInput: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "#eee",
		marginHorizontal: 10,
		paddingHorizontal: 10,
	},
	separator: {
		height: 1,
		width: "90%",
	},
});
