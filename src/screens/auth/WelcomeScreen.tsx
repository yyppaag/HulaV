import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@types';
import {Button} from '@components/common';
import {Colors, Theme} from '@constants';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>💃</Text>
        <Text style={styles.title}>Welcome to Hula</Text>
        <Text style={styles.subtitle}>
          Find your perfect match and start your love story
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Create Account"
          onPress={() => navigation.navigate('Signup')}
          fullWidth
        />
        <Button
          title="Sign In"
          variant="outline"
          onPress={() => navigation.navigate('Login')}
          fullWidth
          style={styles.signInButton}
        />
      </View>

      <Text style={styles.terms}>
        By continuing, you agree to our Terms of Service and Privacy Policy
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Theme.spacing.xl,
    justifyContent: 'space-between',
    paddingVertical: Theme.spacing.xxl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: Theme.spacing.xl,
  },
  title: {
    fontSize: Theme.fontSize.xxxl,
    fontWeight: Theme.fontWeight.bold,
    color: Colors.text,
    marginBottom: Theme.spacing.md,
  },
  subtitle: {
    fontSize: Theme.fontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Theme.spacing.xl,
  },
  buttonContainer: {
    width: '100%',
  },
  signInButton: {
    marginTop: Theme.spacing.md,
  },
  terms: {
    fontSize: Theme.fontSize.xs,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: Theme.spacing.lg,
  },
});

export default WelcomeScreen;
