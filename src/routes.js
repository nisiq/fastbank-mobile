import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Páginas
import Home from './pages/Home'
import Assistente from './pages/Assistente';
import Ajustes from './pages/Ajustes';

import CustomTabBar from './components/CustomTabBar';

const Tab = createBottomTabNavigator(); //

export function Routes(){
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false, //eliminar header padrão navigation
                tabBarHideOnKeyboard: true, //caso tenha algum input/surgir teclado, a tabBar irá ser escondida
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#d2d", //cor do icone da tela atual selecionada

                tabBarStyle:{
                    borderTopWidth: 0,
                    backgroundColor: '#fff',
                }
            }}

            tabBar={ ( props ) => <CustomTabBar {...props} /> }
        >
            <Tab.Screen
            name="Home"
            component={Home}
            options={{
                tabBarIcon: "compare-arrows"
            }}
            />


            <Tab.Screen 
            name="Assistente" 
            component={Assistente}
            options={{
                tabBarIcon: "message"
            }}
            />


            <Tab.Screen 
            name="Ajustes" 
            component={Ajustes}
            options={{
                tabBarIcon: "settings"
            }}
            />
        </Tab.Navigator>
    )
}