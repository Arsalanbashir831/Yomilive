import React, { useEffect, useState } from 'react';
import { View, PermissionsAndroid, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const VideoCall = () => {
  const [device, setDevice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const devices = useCameraDevices();
  const [isFrontCamera, setIsFrontCamera] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      const cameraPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
      const recordAudioPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
      if (cameraPermission && recordAudioPermission) {
        console.log('Permissions granted');
        setCameraDevice();
      } else {
        requestPermissions();
      }
    } catch (err) {
      console.warn('Error checking permissions:', err);
    }
  };

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissions granted');
        setCameraDevice();
      } else {
        console.log('Camera or audio permission denied');
      }
    } catch (err) {
      console.warn('Error requesting permissions:', err);
    }
  };

  const setCameraDevice = async () => {
    console.log('Available devices:', devices);
    if (devices.length > 0) {
      const selectedDevice = isFrontCamera ? devices.find(device => device.position === 'front') : devices.find(device => device.position === 'back');
      if (selectedDevice) {
        console.log('Using camera:', selectedDevice);
        setDevice(selectedDevice);
      } else {
        console.log('No camera devices available');
      }
    } else {
      console.log('No camera devices available');
    }
    setIsLoading(false);
  };

  const toggleCamera = () => {
    setIsFrontCamera(prevState => !prevState);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No camera device found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
   
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
      <TouchableOpacity style={styles.button} onPress={toggleCamera}>
        <Text style={styles.buttonText}>{isFrontCamera ? 'Switch to Back Camera' : 'Switch to Front Camera'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { bottom: 20, right: 20, backgroundColor: 'red' }]} onPress={() => { console.log('End Call') }}>
        <Text style={styles.buttonText}>End Call</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { bottom: 20, left: 20, backgroundColor: 'green' }]} onPress={() => { console.log('Add User') }}>
        <Text style={styles.buttonText}>Add User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VideoCall;
