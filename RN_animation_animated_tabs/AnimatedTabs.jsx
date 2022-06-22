import {
	View,
	Text,
	Animated,
	Dimensions,
	findNodeHandle,
	StyleSheet,
	Image,
	TouchableOpacity
} from "react-native";
import React from "react";

const { width, height } = Dimensions.get("screen");

const images = {
	man: "https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
	women:
		"https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
	kids: "https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
	skullcandy:
		"https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
	help: "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
};

const data = Object.keys(images).map((i) => ({
	key: i,
	title: i,
	image: images[i],
	ref: React.createRef()
}));

const scrollX = React.useRef(new Animated.Value(0)).current;

const Indicator = ({ measures, scrollX }) => {
	const inputRange = data.map((_, i) => i * width);

	const indicatorWidth = scrollX.interpolate({
		inputRange,
		outputRange: measures.map((measure) => measure.width)
	});
	const translateX = scrollX.interpolate({
		inputRange,
		outputRange: measures.map((measure) => measure.x)
	});

	return (
		<Animated.View
			style={{
				position: "absolute",
				height: 4,
				// width: measures[0].width,
				width: indicatorWidth,
				transform: translateX,
				backgroundColor: "white",
				bottom: -10
			}}
		></Animated.View>
	);
};

const Tab = React.forwardRef(({ item, onItemPress }, ref) => {
	return (
		<TouchableOpacity onPress={onItemPress}>
			<View ref={ref}>
				<Text style={{ color: "white", fontSize: 86 / data.length }}>
					{item.title}
				</Text>
			</View>
		</TouchableOpacity>
	);
});

const Tabs = ({ scrollX, data, onItemPress }) => {
	const [measures, setMeasures] = React.useState([]);
	const containerRef = React.useRef();

	React.useEffect(() => {
		let m = [];
		data.forEach((item) => {
			item.ref.curent.measureLayout(
				containerRef.current,
				(x, y, width, height) => {
					m.push({ x, y });

					if (m.length === data.length) {
						setMeasures(m);
					}
				}
			);
		});
	});

	console.log(measures);

	return (
		<View style={{ position: "absolute", top: 100, width }}>
			<View
				style={{ justifyContent: "space-evenly", flexDirection: "row" }}
				ref={containerRef}
			>
				{data.map((item) => {
					return (
						<Tab
							item={item}
							key={item.key}
							ref={item.ref}
							onItemPress={onItemPress}
						/>
					);
				})}
			</View>
		</View>
	);
};

const AnimatedTabs = () => {
	const ref = React.useRef();
	const onItemPress = React.useCallback((itemIndex) => {
		ref?.current?.scrollToOffset({
			offset: indeINdex * width
		});
	});
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Animated.FlatList
				ref={ref}
				data={data}
				keyExtractor={(item) => item.key}
				horizontal
				showsHorizontalScroll={false}
				pagingEnabled
				bounces={false}
				onScroll={Animated.event([
					{ nativeElement: { contentOffset: { x: scrollX } } },
					{ useNatidriver: false }
				])}
				renderItem={({ item }) => {
					return (
						<View style={{ width, height }}>
							<Image
								source={{ uri: item.image }}
								style={{ flex: 1, resizeMode: "cover" }}
							/>
							<View
								style={[
									StyleSheet.absoluteFillObject,
									{ backgroundColor: "rgba(0,0,0,0.3" }
								]}
							/>
						</View>
					);
				}}
			/>
			<Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
			{measures.length > 0 && (
				<Indicator measures={measures} scrollX={scrollX} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center"
	}
});

export default AnimatedTabs;
