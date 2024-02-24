import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notifications from "../Notifications/Notifications";
import Home from "./Home";
import Profile from "../Profile/Profile";
import Settings from "../Settings/Settings";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator()

function HomeScreen() {
    return (
        <Tab.Navigator
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name == 'Home') {
                            iconName = focused ? 'home' : 'home-outline'
                            size = 24
                        } else if (route.name == 'Profile') {
                            iconName = focused ? 'person' : 'person-outline'
                            size = 26
                        } else if (route.name == 'Notifications') {
                            iconName = focused ? 'notifications' : 'notifications-outline'
                            size = 24
                        } else if (route.name == 'Settings') {
                            iconName = focused ? 'settings' : 'settings-outline'
                        }

                        return <Ionicons name={iconName} size={24} color={color} />
                    }
                    ,
                    tabBarActiveTintColor: '#436850',
                    tabBarInactiveTintColor: '#9bad89',
                })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Notifications" component={Notifications} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}
export default HomeScreen;