import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Theme} from '@constants';
import {Button} from '@components/common';
import {useAuthStore} from '@store';

const ProfileScreen: React.FC = () => {
  const {logout, user} = useAuthStore();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <Text style={styles.subtext}>Welcome, {user?.name}!</Text>
      <Button
        title="Logout"
        onPress={logout}
        variant="outline"
        style={styles.logoutButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.xl,
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
    marginBottom: Theme.spacing.xl,
  },
  logoutButton: {
    marginTop: Theme.spacing.lg,
  },
});

export default ProfileScreen;
