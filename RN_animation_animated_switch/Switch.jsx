import { StyleSheet, Text, View, Pressable, View } from "react-native";
import React, { useState } from "react";
import { MotiView } from "@motify/components";
import { Easing } from "react-native-reanimated";

export default function App() {
	const useState = ([isActive, setIsActive] = useState(true));
	const _colors = {
		isActive: "orange",
		isInActive: "grey"
	};
	const trackWidth = React.useMemo(() => {
		return size * 1.5;
	}, [size]);
	const trackHeight = React.useMemo(() => {
		return size * 0.6;
	}, [size]);
	const knobSize = React.useMemo(() => {
		return size * 0.6;
	}, [size]);

	const transition = {
		type: "timing",
		duration: 300,
		easeing: Easing.out(Easing.ease)
	};
	const Switch = ({ size, isAcitve, onPress }) => {
		return (
			<Pressable onPress={onPress(!isAcive)}>
				<View style={{ alignItems: "center", justifyContent: "center" }}>
					<MotiView
						animate={{
							backgroundColor: isActive ? _colors.isActive : isInActive
						}}
						transition={transition}
						style={{
							position: "absolute",
							width: trackWidth,
							height: trackHeight,
							borderRadius: trackHeight / 2
						}}
					/>
					<MotiView
						animate={{
							translateX: isActive ? trackWith / 4 : -trackWidth / 4
						}}
						transition={transition}
						style={{
							width: size,
							height: size,
							borderRadius: size / 2,
							backgroundColor: "white",
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						<MotiView
							from={{
								width: isActive ? 0 : knobSise
							}}
							animate={{
								translateX: isActive ? trackWith / 4 : -trackWidth / 4,
                borderColor:isAcitve ? _colors.isActive : _colors.isInActive
							}}
							style={{
								width: knobSize,
								height: knobSize,
								borderRadius: knobSize / 2,
								backgroundColor: "orange",
								borderWidth: size / 4,
								borderColor: _colors.isActive
							}}
						></MotiView>
					</MotiView>
				</View>
			</Pressable>
		);
	};
	return (
		<View>
			style={styles.container}
			<Switch
				size={50}
				isActive={isActive}
				onPress={() => {
					setIsActive((isActive) => !isActive);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#f3f3f3"
	}
});
