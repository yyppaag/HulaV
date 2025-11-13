import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@types';
import {Button} from '@components/common';
import {Colors, Theme} from '@constants';
import {INTERESTS} from '@constants/interests';

type Props = NativeStackScreenProps<AuthStackParamList, 'Interests'>;

const MIN_INTERESTS = 3;
const MAX_INTERESTS = 10;

const InterestsScreen: React.FC<Props> = ({navigation}) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      if (selectedInterests.length >= MAX_INTERESTS) {
        Alert.alert(
          'Maximum Reached',
          `You can select up to ${MAX_INTERESTS} interests.`,
        );
        return;
      }
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleContinue = () => {
    if (selectedInterests.length < MIN_INTERESTS) {
      Alert.alert(
        'Select More Interests',
        `Please select at least ${MIN_INTERESTS} interests to continue.`,
      );
      return;
    }
    // TODO: Save interests to user profile
    // For now, just navigate to main app
    // navigation.navigate to main app flow
    Alert.alert('Success', 'Profile completed! (Would navigate to main app)');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Your Interests</Text>
          <Text style={styles.subtitle}>
            Choose at least {MIN_INTERESTS} things you love. This helps us find
            better matches for you!
          </Text>
          <Text style={styles.counter}>
            {selectedInterests.length}/{MAX_INTERESTS} selected
          </Text>
        </View>

        <View style={styles.interestsContainer}>
          {INTERESTS.map(interest => {
            const isSelected = selectedInterests.includes(interest);
            return (
              <TouchableOpacity
                key={interest}
                style={[styles.interestChip, isSelected && styles.selectedChip]}
                onPress={() => toggleInterest(interest)}>
                <Text
                  style={[
                    styles.interestText,
                    isSelected && styles.selectedText,
                  ]}>
                  {interest}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={`Continue (${selectedInterests.length}/${MIN_INTERESTS})`}
          onPress={handleContinue}
          fullWidth
          disabled={selectedInterests.length < MIN_INTERESTS}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.xl,
    paddingTop: Theme.spacing.xxl,
    paddingBottom: Theme.spacing.xl,
  },
  header: {
    marginBottom: Theme.spacing.xl,
  },
  title: {
    fontSize: Theme.fontSize.xxxl,
    fontWeight: Theme.fontWeight.bold,
    color: Colors.text,
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    fontSize: Theme.fontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Theme.spacing.md,
  },
  counter: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Colors.primary,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  interestChip: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.round,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  interestText: {
    fontSize: Theme.fontSize.sm,
    color: Colors.text,
    fontWeight: Theme.fontWeight.medium,
  },
  selectedText: {
    color: Colors.textInverse,
    fontWeight: Theme.fontWeight.semibold,
  },
  footer: {
    padding: Theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
});

export default InterestsScreen;
