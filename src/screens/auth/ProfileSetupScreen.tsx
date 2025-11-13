import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@types';
import {Button, Input, DatePicker, RadioGroup} from '@components/common';
import {Colors, Theme, MIN_AGE} from '@constants';
import {useAuthStore} from '@store';
import {calculateAge} from '@utils';

type Props = NativeStackScreenProps<AuthStackParamList, 'ProfileSetup'>;

const ProfileSetupScreen: React.FC<Props> = ({navigation}) => {
  const {user, setUser} = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [gender, setGender] = useState<string>('');
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const age = calculateAge(dateOfBirth.toISOString());
      if (age < MIN_AGE) {
        newErrors.dateOfBirth = `You must be at least ${MIN_AGE} years old`;
      }
    }

    if (!gender) {
      newErrors.gender = 'Please select your gender';
    }

    if (bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm() && dateOfBirth) {
      // Update user in store
      if (user) {
        setUser({
          ...user,
          name,
          dateOfBirth: dateOfBirth.toISOString(),
          gender: gender as 'male' | 'female' | 'other',
          bio,
        });
      }
      navigation.navigate('PhotoUpload');
    }
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - MIN_AGE);

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Let's get to know you better! This information will be shown on your
            profile.
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={text => {
              setName(text);
              if (errors.name) {
                setErrors({...errors, name: ''});
              }
            }}
            error={errors.name}
            autoCapitalize="words"
          />

          <DatePicker
            label="Date of Birth"
            value={dateOfBirth}
            onChange={date => {
              setDateOfBirth(date);
              if (errors.dateOfBirth) {
                setErrors({...errors, dateOfBirth: ''});
              }
            }}
            error={errors.dateOfBirth}
            maximumDate={maxDate}
            minimumDate={minDate}
          />

          <RadioGroup
            label="Gender"
            options={[
              {label: 'Male', value: 'male'},
              {label: 'Female', value: 'female'},
              {label: 'Other', value: 'other'},
            ]}
            value={gender}
            onChange={value => {
              setGender(value);
              if (errors.gender) {
                setErrors({...errors, gender: ''});
              }
            }}
            error={errors.gender}
          />

          <Input
            label="Bio (Optional)"
            placeholder="Tell us about yourself..."
            value={bio}
            onChangeText={text => {
              setBio(text);
              if (errors.bio) {
                setErrors({...errors, bio: ''});
              }
            }}
            error={errors.bio}
            multiline
            numberOfLines={4}
            maxLength={500}
            style={styles.bioInput}
          />
          <Text style={styles.charCount}>{bio.length}/500</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Continue" onPress={handleContinue} fullWidth />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
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
  },
  form: {
    flex: 1,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: Theme.spacing.sm,
  },
  charCount: {
    fontSize: Theme.fontSize.xs,
    color: Colors.textLight,
    textAlign: 'right',
    marginTop: Theme.spacing.xs,
    marginBottom: Theme.spacing.md,
  },
  buttonContainer: {
    marginTop: Theme.spacing.lg,
  },
});

export default ProfileSetupScreen;
