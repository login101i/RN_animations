import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MotiView } from "@motify/components";

const LoadingAnimation = () => {
	const LoadingIndicator = ({ size } ) => {
		return (
			<MotiView
				from={{ width: size, height: size, borderRadius: size / 2 }}
				animate={{
					width: size + 20,
					height: size + 20,
					borderRadius: (size + 20) / 2
				}}
				transition={{
					type: "timing",
					duration: 1000,
					loop: true,
					repeatReverse: false
				}}
				style={{
					width: size,
					height: size,
					borderRadius: size / 2,
					borderWidth: size,
					borderColor: "black",
					shadowOpacity: 1,
					shadowRadius: 10,
					shadowColor: "black",
					shadowOffset: { width: 0, height: 0 }
				}}
			></MotiView>
		);
	};
	return (
		<View style={styles.background}>
			<LoadingIndicator size={100} />
		</View>
	);
};


const styles=StyleSheet.create({
	background:{ 
		backgroundColor:'white',
		display:"flex",
		alignItems:"center",
		justifyContent:"center",
		flex:1

	}
})

export default LoadingAnimation;
