import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Scanner from "./Scanner";
import { Ionicons } from "@expo/vector-icons";
import Login from "./LogIn";

const Tab = createBottomTabNavigator()

function LoginTab() {
    return (
        <Tab.Navigator
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name == 'Login') {
                            iconName = focused ? 'home' : 'home-outline'
                            size = 24
                        } else if (route.name == 'Scan') {
                            iconName = focused ? 'person' : 'person-outline'
                            size = 26
                        }

                        return <Ionicons name={iconName} size={24} color={color} />
                    }
                    ,
                    tabBarActiveTintColor: '#436850',
                    tabBarInactiveTintColor: '#9bad89',
                })}
        >
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="Scan" component={Scanner} />
        </Tab.Navigator>
    );
}
export default LoginTab;