import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

// import Donut from "./RN_animation_donut_chart/Donut";
// import RingIndicator from "./RN_animation_ring_indicator/RingIndicator";
import RingIndicator from "./RN_animation_ring_indicator/RingIndicator";
export default function App() {
	return (
		<View style={styles.container}>
			<RingIndicator />
			<Text>Hello</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
