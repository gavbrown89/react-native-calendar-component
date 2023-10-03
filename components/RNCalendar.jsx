import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RNCalendar = ({theme}) => {
    const [selectedDate, setSelectedDate] = React.useState(null);
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const getDaysInMonth = () => {
        const days = [];

        // Determine the start day index (0 for Sunday, 1 for Monday, and so on)
        const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        // Fill empty cells for days before the 1st of the month
        for (let i = 0; i < startDayIndex; i++) {
                days.push({
                day: null,
                disabled: true,
            });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                day: i,
                disabled: false,
            });
        }

        // Fill empty cells for days after the last day of the month
        const totalDays = Math.ceil(days.length / 7) * 7;
        const remainingDays = totalDays - days.length;

        for (let i = 0; i < remainingDays; i++) {
            days.push({
                day: null,
                disabled: true,
            });
        }

        return days;
    };

    const renderDays = () => {
        const daysInMonth = getDaysInMonth();
        const weeks = [];

        for (let i = 0; i < daysInMonth.length; i += 7) {
            const week = daysInMonth.slice(i, i + 7);

            weeks.push(
                <View key={i} style={styles.week}>
                    {week.map((dayObj, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                if (!dayObj.disabled) setSelectedDate(dayObj.day);
                            }}
                            style={[
                                styles.day,
                                {
                                backgroundColor: dayObj.day === selectedDate ? theme : 'transparent',
                                opacity: dayObj.disabled ? 0.2 : 1,
                                },
                            ]}
                        >
                            <Text
                                style={{
                                color: dayObj.day === selectedDate ? 'white' : 'black',
                                }}
                            >
                                {dayObj.day}
                            </Text>
                        </TouchableOpacity>
                ))}
                </View>
            );
        }
        return weeks;
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, {backgroundColor: theme}]}>
                <Text style={styles.month}>{months[currentMonth]} {currentYear}</Text>
            </View>
            <View style={styles.weekLabels}>
                {weekDays.map((day) => (
                    <Text key={day} style={styles.dayLabel}>
                        {day}
                    </Text>
                ))}
            </View>
            {renderDays()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10
    },
    header: {
        alignItems: 'center',
        marginBottom: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    month: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    weekLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    dayLabel: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    week: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    day: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
        borderColor: 'gray',
        borderWidth: 1,
    },
});

export default RNCalendar;
