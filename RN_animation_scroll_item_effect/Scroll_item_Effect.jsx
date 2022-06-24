// Background image: https://www.pexels.com/photo/pink-rose-closeup-photography-1231265/

import * as React from "react";
import {
	StatusBar,
	FlatList,
	Image,
	Animated,
	Text,
	View,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Easing,
	SafeAreaViewBase,
	SafeAreaView
} from "react-native";
const { width, height } = Dimensions.get("screen");
import faker from "faker";

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
	return {
		key: faker.random.uuid(),
		image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
			"women",
			"men"
		])}/${faker.random.number(60)}.jpg`,
		name: faker.name.findName(),
		jobTitle: faker.name.jobTitle(),
		email: faker.internet.email()
	};
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const BG_IMG =
	" https://www.pexels.com/photo/pink-rose-closeup-photography-1231265/";

const ITEM_SIZE = AVATAR_SIZE + 3 * SPACING;

export default () => {
	const scrollY = React.useRef(new Animated.Value(0)).current;
	return (
		<View style={{ flex: 1, backgroundColor: "#fff" }}>
			<StatusBar hidden />
			<Image
				source={{ uri: BG_IMG }}
				style={StyleSheet.absoluteFillObject}
				blurRadius={50}
			/>
			<FlatList
				data={DATA}
				keyExtractor={(item) => item.key}
				contentContainerStyle={{
					padding: SPACING,
					paddingTop: StatusBar.currentHeight || 40
				}}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: true }
				)}
				renderItem={({ item }) => {
					const inputRange = [
						-1,
						0,
						ITEM_SIZE * index,
						ITEM_SIZE * (index + 2)
					];

					const opacityInputRange = [
						-1,
						0,
						ITEM_SIZE * index,
						ITEM_SIZE * (index + 0.5)
					];

					const scale = scrollY.interpolate({
						inputRange,
						outPutRange: [1, 1, 1, 0]
					});
					const opacityScale = scrollY.interpolate({
						opacityInputRange,
						outPutRange: [1, 1, 1, 0]
					});

					return (
						<Animated.View
							style={{
								flexDirection: "row",
								padding: SPACING,
								marginBottom: SPACING,
								borderRadius: 12,
								shadowColor: "@000",
								shadowOffset: { width: 0, height: 10 },
								shadowOpacity: 0.3,
								shadowRadius: 20,
								transform: [{ scale }],
								opacity: [{ opacityScale }]
							}}
						>
							<Image
								style={{
									width: AVATAR_SIZE,
									height: AVATAR_SIZE,
									borderRadius: AVATAR_SIZE / 2
								}}
								source={{ uri: item.image }}
							/>

							<View>
								<Text style={{ fontSize: 22, fontWeight: 700 }}>
									{item.name}
								</Text>
								<Text style={{ fontSize: 22, opacity: 0.8 }}>
									{item.jobTitle}
								</Text>
								<Text style={{ fontSize: 16, opacity: 0.6, color: "#0099cc" }}>
									{item.email}
								</Text>
							</View>
						</Animated.View>
					);
				}}
			/>
		</View>
	);
};
