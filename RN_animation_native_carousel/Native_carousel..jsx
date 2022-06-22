import * as React from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
	Image,
	FlatList,
	View,
	StatusBar,
	Dimensions,
	StyleSheet
} from "react-native";

const { width, height } = Dimensions.get("screen");

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.75;
const DOT_SIZE = 8;
const DOT_SPACING = 10;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

const images = [
	"https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128",
	"https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993",
	"https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_2_1.jpg?ts=1606727889015",
	"https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_3_1.jpg?ts=1606727896369",
	"https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_4_1.jpg?ts=1606727898445"
];

const product = {
	title: "SOFT MINI CROSSBODY BAG WITH KISS LOCK",
	description: [
		"Mini crossbody bag available in various colours. Featuring two compartments. Handles and detachable crossbody shoulder strap. Lined interior. Clasp with two metal pieces.",
		'Height x Length x Width: 14 x 21.5 x 4.5 cm. / 5.5 x 8.4 x 1.7"'
	],
	price: "29.99£"
};

export default () => {
	const scrollY = React.useRef(Animated.Value(0)).current;
	return (
		<View style={{ flex: 1 }}>
			<StatusBar hidden />
			<View style={{ height: ITEM_HEIGHT, overflow: "hidden" }}>
				<Animated.FlatList
					data={images}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item }) => {
						return <Image source={{ uri: item }} style={styles.image} />;
					}}
					snapToInterval={ITEM_HEIGHT}
					decelerationRate="fast"
					showsVerticalScrollIndicator={false}
					bounces={false}
					onScroll={Animated.value(
						[{ nativeEvent: { contentOffset: { y: scrollY } } }],
						{ useNativeDriver: true }
					)}
				/>
				<View style={styles.container}>
					{images.map((_, index) => {
						return (
							<View key={index}>
								<View style={[styles.dot]}></View>
							</View>
						);
					})}
					<View
						style={[
							styles.dotIndicator,
							{
								transform: [
									{
										tranlateY: Animated.divide(
											scrollY,
											ITEM_HEIGHT
										).interpolate({
											inputRange: [0, 1],
											outputRange: [0, DOT_INDICATOR_SIZE]
										})
									}
								]
							}
						]}
					/>
				</View>
			</View>
			<BottomSheet snapPoints={[height - ITEM, height]} initialSnapIndex={0}>
				<BottomSheetScrollView
					style={{ background: "white" }}
					contentContainerStyle={{ padding: 20 }}
				>
					<Text style={{ fontSize: 24, fontWeight: "800" }}>
						{product.title}
					</Text>
					<Text style={{ fontSize: 24 }}>{product.price}</Text>

					<Text style={{ fontSize: "15px" }}>{product.description}</Text>
					<Text>{product.price}</Text>
					{product.description.map((text, index) => {
						return (
							<View key={index}>
								<Text style={{ marginBottom: 10, lineHeight: 22 }}>{text}</Text>
							</View>
						);
					})}
				</BottomSheetScrollView>
			</BottomSheet>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		width: ITEM_WIDTH,
		height: ITEM_HEIGHT,
		resizeMode: "cover"
	},

	container: {
		position: "aboslute",
		top: ITEM_HEIGHT / 2,
		left: 30
	},
	dot: {
		width: DOT_SIZE,
		heigth: DOT_SIZE,
		borderRadius: DOT_SIZE / 2,
		marginBottom: DOT_SPACING,
		background: "black"
	},
	dotIndicator: {
		width: DOT_INDICATOR_SIZE,
		heigth: DOT_INDICATOR_SIZE,
		borderRadius: DOT_INDICATOR_SIZE,
		borderColor: "grey",
		borderWidth: 1,
		position: "absolute",
		left: -DOT_SIZE / 2,
		left: -DOT_SIZE / 2
	}
});
