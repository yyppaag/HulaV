import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Theme} from '@constants';

const DiscoverScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Discover Screen</Text>
      <Text style={styles.subtext}>Swipeable cards will be implemented here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Colors.text,
  },
  subtext: {
    fontSize: Theme.fontSize.md,
    color: Colors.textSecondary,
    marginTop: Theme.spacing.sm,
  },
});

export default DiscoverScreen;
