import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {Agenda} from 'react-native-calendars';

interface CalendarComponentProps {
  visible: boolean;
}

const renderEmptyDay = () => {
  return <View />;
};

const renderEmptyItem = () => {
  return <Text>No slots in the calendar</Text>;
};

const renderItems = (item, firstItemInDay) => {
  return <View />;
};

export default function CalendarComponent({visible}: CalendarComponentProps) {
  if (!visible) return null;
  return (
    <Agenda
      // The list of items that have to be displayed in the Agenda
      items={{
        '2022-05-22': [{name: 'item 1'}],
        '2022-05-23': [{name: 'item 2'}],
        '2022-05-24': [],
        '2024-09-15': [{name: 'item 3'}],
      }}
      renderDay={renderEmptyDay}
      renderEmptyData={renderEmptyItem}
      renderItem={renderItems}
      scrollEnabled={false}
      selected={new Date().toString()}
      hideKnob={true}
      showClosingKnob
    />
  );
}
