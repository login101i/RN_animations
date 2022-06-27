import * as React from "react";

import {
	StatusBar,
	Text,
	View,
	StyleSheet,
	FlatList,
	Image,
	Dimensions,
	Animated,
	TouchableOpacity,
	Platform
} from "react-native";
import Svg, { Rect } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";

import Genres from "./Genres";
import Rating from "./Rating";
import { getMovies } from "./api";

const { width, height } = Dimensions.get("window");
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Backdrop = ({ movies, scrollX }) => {
	const inputRange = [(index - 2) * ITEM_SIZE, (index - 2) * ITEM_SIZE];

	const translateX = scrollX.interpolate({
		inputRange,
		outputRange: [-width, 0]
	});
	return (
		<View style={{ height: BACKDROP_HEIGHT, width, position: "absolute" }}>
			<FlatList
				data={movies.reverse()}
				keyExtractor={(item) => item.key + "-backdrop"}
				contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
				renderItem={({ item, index }) => {
					if (!item.backdrop) {
						return null;
					}

					return (
						<MaskedView
							style={{ position: "abosolute" }}
							maskElement={
								<AnimatedSvg
									width={width}
									height={height}
									viewBox={`0 0 ${width} ${height}`}
									style={{ transform: [{ translateX }] }}
								>
									<Rect x="0" y="0" width={width} height={height} />
								</AnimatedSvg>
							}
						>
							<Image
								source={{ uri: item.backdrop }}
								style={{
									width,
									height: BACKDROP_HEIGHT,
									position: "absolute"
								}}
							/>
						</MaskedView>
					);
				}}
				removeClippedSubviews={false}
			/>
			<LinearGradient
				colors={["rgba(0, 0, 0, 0)", "white"]}
				style={{
					height: BACKDROP_HEIGHT,
					width,
					position: "absolute",
					bottom: 0
				}}
			/>
		</View>
	);
};

const App = () => {
	const [movies, setMovies] = React.useState([]);
	const scrollX = React.useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		const fetchData = async () => {
			const movies = await getMovies();

			setMovies([{ key: "empty-left" }, ...movies, { key: "empty-right" }]);
		};

		if (movies.length === 0) {
			fetchData(movies);
		}
	}, [movies]);

	if (movies.length === 0) {
		return <Loading />;
	}

	return (
		<View style={styles.container}>
			<Backdrop movies={movies} scrollX={scrollX} />
			<StatusBar hidden />

			<FlatList
				data={movies}
				keyExtractor={(item) => item.key}
				showsHorizontalScrollIndicator={false}
				horizontal
				bounces={false}
				contentContainerStyle={{ alignItems: "center" }}
				snapToInterval={ITEM_SIZE}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
				renderItem={({ item, index }) => {
					if (!item.poster) {
						return <View style={{ width: EMPTY_ITEM_SIZE }} />;
					}

					const inputRange = [
						(index - 2) * ITEM_SIZE,
						(index - 2) * ITEM_SIZE,
						index * ITEM_SIZE
					];

					const translateY = scrollX.interpolate({
						inputRange,
						outputRange: [100, 50, 100],
						extrapolate: "clamp"
					});

					return (
						<View style={{ width: ITEM_SIZE }}>
							<Animated.View
								style={{
									marginHorizontal: SPACING,
									padding: SPACING * 2,
									alignItems: "center",
									transform: [{ translateY }],
									backgroundColor: "white",
									borderRadius: 34
								}}
							>
								<Image
									source={{ uri: item.poster }}
									style={styles.posterImage}
								/>
								<Text style={{ fontSize: 24 }} numberOfLines={1}>
									{item.title}
								</Text>
								<Rating rating={item.rating} />
								<Genres genres={item.genres} />
								<Text style={{ fontSize: 12 }} numberOfLines={3}>
									{item.description}
								</Text>
							</Animated.View>
						</View>
					);
				}}
				snapToAlignment="start"
				decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
				renderToHardwareTextureAndroid
				scrollEventThrottle={16}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	container: {
		flex: 1
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center"
	},
	posterImage: {
		width: "100%",
		height: ITEM_SIZE * 1.2,
		resizeMode: "cover",
		borderRadius: 24,
		margin: 0,
		marginBottom: 10
	}
});

export default App;
