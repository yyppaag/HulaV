import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Theme} from '@constants';

const MatchesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Matches Screen</Text>
      <Text style={styles.subtext}>Your matches will appear here</Text>
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

export default MatchesScreen;
