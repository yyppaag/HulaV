import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors, Theme} from '@constants';
import {Button} from '@components/common';
import {useAuthStore} from '@store';
import {calculateAge} from '@utils';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen: React.FC = () => {
  const {logout, user} = useAuthStore();

  if (!user) {
    return null;
  }

  const age = user.dateOfBirth ? calculateAge(user.dateOfBirth) : '';
  const mainPhoto = user.photos[0];

  const menuItems = [
    {icon: 'settings-outline', label: 'Settings', onPress: () => {}},
    {icon: 'shield-checkmark-outline', label: 'Safety & Privacy', onPress: () => {}},
    {icon: 'star-outline', label: 'Get Hula Plus', onPress: () => {}, highlight: true},
    {icon: 'help-circle-outline', label: 'Help & Support', onPress: () => {}},
    {icon: 'information-circle-outline', label: 'About', onPress: () => {}},
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.photoContainer}>
          {mainPhoto ? (
            <Image source={{uri: mainPhoto.url}} style={styles.photo} />
          ) : (
            <View style={[styles.photo, styles.photoPlaceholder]}>
              <Icon name="person" size={60} color={Colors.textLight} />
            </View>
          )}
          <TouchableOpacity style={styles.editPhotoButton}>
            <Icon name="camera" size={20} color={Colors.textInverse} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>
              {user.name}{age ? `, ${age}` : ''}
            </Text>
            {user.verified && (
              <Icon name="checkmark-circle" size={24} color={Colors.info} />
            )}
          </View>
          {user.email && (
            <Text style={styles.email}>{user.email}</Text>
          )}
          {user.bio && (
            <Text style={styles.bio}>{user.bio}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Icon name="create-outline" size={20} color={Colors.primary} />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Interests */}
      {user.interests && user.interests.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {user.interests.map((interest, index) => (
              <View key={index} style={styles.interestChip}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Menu Items */}
      <View style={styles.section}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              item.highlight && styles.menuItemHighlight,
            ]}
            onPress={item.onPress}>
            <Icon
              name={item.icon}
              size={24}
              color={item.highlight ? Colors.primary : Colors.text}
            />
            <Text
              style={[
                styles.menuItemText,
                item.highlight && styles.menuItemTextHighlight,
              ]}>
              {item.label}
            </Text>
            <Icon
              name="chevron-forward"
              size={20}
              color={Colors.textLight}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <Button
          title="Logout"
          onPress={logout}
          variant="outline"
          fullWidth
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: Theme.fontSize.xxxl,
    fontWeight: Theme.fontWeight.bold,
    color: Colors.text,
  },
  profileCard: {
    margin: Theme.spacing.xl,
    padding: Theme.spacing.xl,
    backgroundColor: Colors.background,
    borderRadius: Theme.borderRadius.lg,
    ...Theme.shadows.md,
    alignItems: 'center',
  },
  photoContainer: {
    position: 'relative',
    marginBottom: Theme.spacing.md,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholder: {
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.background,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  name: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Colors.text,
    marginRight: Theme.spacing.xs,
  },
  email: {
    fontSize: Theme.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  bio: {
    fontSize: Theme.fontSize.md,
    color: Colors.text,
    textAlign: 'center',
    marginTop: Theme.spacing.sm,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.round,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: Theme.spacing.xs,
  },
  editButtonText: {
    color: Colors.primary,
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
  },
  section: {
    marginBottom: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Colors.text,
    marginBottom: Theme.spacing.md,
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
  interestText: {
    fontSize: Theme.fontSize.sm,
    color: Colors.text,
    fontWeight: Theme.fontWeight.medium,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemHighlight: {
    backgroundColor: Colors.primaryLight + '10',
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.sm,
    borderBottomWidth: 0,
  },
  menuItemText: {
    flex: 1,
    fontSize: Theme.fontSize.md,
    color: Colors.text,
    marginLeft: Theme.spacing.md,
  },
  menuItemTextHighlight: {
    color: Colors.primary,
    fontWeight: Theme.fontWeight.semibold,
  },
  logoutContainer: {
    paddingHorizontal: Theme.spacing.xl,
    marginBottom: Theme.spacing.xl,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.xl,
  },
  version: {
    fontSize: Theme.fontSize.xs,
    color: Colors.textLight,
  },
});

export default ProfileScreen;
