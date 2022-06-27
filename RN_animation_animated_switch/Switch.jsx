import { StyleSheet, Text, View, Pressable, View } from "react-native";
import React, { useState } from "react";
import { MotiView } from "@motify/components";
import { Easing } from "react-native-reanimated";

export default function App() {
	const [isActive, setIsActive] = useState(true);
	const _colors = {
		isActive: "orange",
		isInActive: "grey"
	};

	const Switch = ({ size, isActive, onPress }) => {
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
			easing: Easing.out(Easing.ease)
		};
		return (
			<Pressable onPress={onPress}>
				<View style={{ alignItems: "center", justifyContent: "center" }}>
					<MotiView
						animate={{
							backgroundColor: isActive ? _colors.isActive : _colors.isInActive
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
							translateX: isActive ? trackWidth / 4 : -trackWidth / 4
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
								width: isActive ? 0 : knobSize
							}}
							animate={{
								translateX: isActive ? trackWidth / 4 : -trackWidth / 4,
								borderColor: isActive ? _colors.isActive : _colors.isInActive
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
