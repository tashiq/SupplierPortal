import { CameraView, useCameraPermissions } from 'expo-camera/next';
import { useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { StackActions } from '@react-navigation/native';

export default function App({ navigation }) {
    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false)
    const [data, setData] = useState(null)
    const activateCam = () => {
        setScanned(false)
    }
    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }
    const handleBarCodeScanned = ({ type, data }) => {
        setData(data)
        setScanned(true)
        console.log(data)
        if (data) {
            // BACKEND TASKS
            // console.log(data)
            navigation.dispatch(StackActions.replace('HomeScreen'))
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scan</Text>
            <View style={styles.camContainer}>
                {!scanned ?
                    <CameraView style={styles.cameraView} facing="back" barcodeScannerSettings={{ barCodeTypes: ['qr'] }} onBarcodeScanned={handleBarCodeScanned}>

                    </CameraView> :
                    <View>
                        <Text>{data}</Text>
                        <TouchableOpacity style={styles.ReScanBtn} onPress={activateCam}>
                            <Text style={styles.btnText}>Re-Scan</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#031d47'
    },
    title: {
        width: '70%',
        color: '#031d47',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        backgroundColor: 'white',
        paddingBottom: 10,
        paddingTop: 10,
        paddingEnd: 20,
        paddingStart: 20,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        elevation: 5
    },
    camContainer: {
        backgroundColor: 'white',
        elevation: 5,
        width: '90%',
        height: '50%',
        borderRadius: 5,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cameraView: {
        width: '90%',
        height: '90%',
    },
    ReScanBtn: {
        marginTop: 10,
        width: 150,
        backgroundColor: '#faf',
        borderRadius: 14,
        elevation: 5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingStart: 15,
        paddingEnd: 15,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 20
    }
    ,
})