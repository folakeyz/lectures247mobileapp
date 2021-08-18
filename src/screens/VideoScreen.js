import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";

import { Video } from "expo-av";
import * as FileSystem from "expo-file-system";
import { BASE_URL } from "../redux/config";

const { width, height } = Dimensions.get("window");

const VideoScreen = ({ navigation, route }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [buttonTitle, setButtonTitle] = useState("Save Offline");
  const [progressValue, setProgressValue] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [downloaded, setDownloaded] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    let { course } = route.params;
    setSelectedCourse(course);
    async function find() {
      const { uri } = await FileSystem.getInfoAsync(
        `${FileSystem.documentDirectory + `${course.title}.mp4`}`
      );
      if (uri === undefined) {
        setVideoUrl(`${BASE_URL}/uploads/${course.url}`);
      } else {
        setVideoUrl(uri);
        setDownloaded(true);
        setButtonTitle("Video Saved Offline");
      }
    }
    find();
  }, []);

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  async function downloadVideo() {
    setButtonTitle("Downloading...");

    const callback = (downloadProgress) => {
      setTotalSize(formatBytes(downloadProgress.totalBytesExpectedToWrite));
      var progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
      progress = progress.toFixed(2) * 100;
      setProgressValue(progress.toFixed(0));
    };

    const downloadResumable = FileSystem.createDownloadResumable(
      videoUrl,
      FileSystem.documentDirectory + `${selectedCourse.title}.mp4`,
      {},
      callback
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log("Finished downloading to ", uri);
      setButtonTitle("Downloaded");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 30,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 300,
          backgroundColor: "white",
        }}
      >
        <Video
          source={{ uri: videoUrl }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={false}
          isLooping={false}
          useNativeControls
          style={styles.video}
        />
        {!downloaded && <Button title={buttonTitle} onPress={downloadVideo} />}
        {!downloaded && <Text>Video Size: {totalSize}</Text>}
        {!downloaded && <Text>Download Progress: {progressValue}%</Text>}

        <View style={{ padding: 10 }}>
          <Text
            style={{ fontSize: 20, fontFamily: "Poppins", fontWeight: "bold" }}
          >
            {selectedCourse.title}
          </Text>
          <Text
            style={{ fontSize: 11, fontFamily: "Poppins", color: "#0075FF" }}
          >
            {selectedCourse.coursecode}
          </Text>
          <ScrollView style={{ height: 200 }}>
            <Text style={{ fontSize: 11, fontFamily: "Poppins" }}>
              {selectedCourse.description}
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  font: {
    fontSize: 20,
    fontFamily: "Poppins",
  },
  video: {
    width: width,
    height: height / 3,
  },
});

export default VideoScreen;
