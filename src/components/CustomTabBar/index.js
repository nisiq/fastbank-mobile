import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

export default function CustomTabBar({ state, descriptors, navigation }) {
    return (
        <View style={styles.container}>

            <View style={styles.content}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];

                    const isFocused = state.index === index;

                    //clica em uma tab
                    const onPress = () => {
                            const event = navigation.emit({
                              type: 'tabPress',
                              target: route.key,
                              canPreventDefault: true,
                            });
                  
                            if (!isFocused && !event.defaultPrevented) {
                              navigation.navigate(route.name, route.params);
                            }
                          };
                    //clica e segura
                          const onLongPress = () => {
                            navigation.emit({
                              type: 'tabLongPress',
                              target: route.key,
                            });
                          };

                          return (
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={styles.buttonTab}
                            >
                                <View style={{ alignItems: 'center', padding: 4,}}>
                                    <View style={[styles.innerButton, { backgroundColor: isFocused ? "#f8e2fd" : "transparent", }]}>
                                        <MaterialIcons
                                            name={options.tabBarIcon}
                                            size={34}
                                            color={ isFocused ? '#8f2abd' : "#535353"}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                          )

                    })}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    content:{
        flexDirection: 'row',
        marginBottom: Platform.OS === 'ios' ? 38 : 24,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        gap: 8,
        elevation: 10,
        borderRadius: 9,
    },
    buttonTab:{
        justifyContent: 'center',
    },
    innerButton:{
        padding: 8,
        borderRadius: 9,
    }
})