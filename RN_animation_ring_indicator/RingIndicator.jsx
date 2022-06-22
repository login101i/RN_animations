import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { MotiView } from "@motify/components";
import { MotiView, MotiText } from "moti";
import { Easing } from "react-native-reanimated";

const _color = "orange";
const _size = 100;

function RingIndicator() {
	return (
		<View>
			<View style={[styles.icon, styles.center]}>
				{[...Array(5).keys()].map((index) => {
					return (
						<MotiView
							from={{ opacity: 1, scale: 1 }}
							animate={{ opacity: 0, scale: 4 }}
							transition={{
								type: "timing",
								duration: 350,
								easing: Easing.out(Easing.ease),
								loop: true,
								repeatReverse: false,
								duration: 2000
							}}
							key={index}
							style={[StyleSheet.absoluteFillObject, styles.icon]}
						/>
					);
				})}
				<View style={styles.onTop}>
					<Feather name="phone-outgoing" size={33} color="white" />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	icon: {
		width: _size,
		height: _size,
		borderRadius: _size / 2,
		backgroundColor: _color
	},
	center: {
		alignItems: "center",
		justifyContent: "center"
	},
	onTop: {
		zIndex: 1
	}
});

export default RingIndicator;
