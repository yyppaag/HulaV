import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Colors, Theme} from '@constants';
import {useProfileStore} from '@store';
import ProfileCard from '@components/cards/ProfileCard';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const DiscoverScreen: React.FC = () => {
  const {
    profiles,
    currentIndex,
    isLoading,
    loadProfiles,
    likeProfile,
    passProfile,
    superLikeProfile,
  } = useProfileStore();

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  const handleLike = () => {
    if (currentProfile) {
      likeProfile(currentProfile.id);
    }
  };

  const handlePass = () => {
    if (currentProfile) {
      passProfile(currentProfile.id);
    }
  };

  const handleSuperLike = () => {
    if (currentProfile) {
      superLikeProfile(currentProfile.id);
    }
  };

  const handleUndo = () => {
    // TODO: Implement undo functionality
  };

  const handleProfilePress = () => {
    // TODO: Open profile detail modal
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!currentProfile) {
    return (
      <View style={styles.centerContainer}>
        <Icon name="people-outline" size={80} color={Colors.textLight} />
        <Text style={styles.emptyTitle}>No More Profiles</Text>
        <Text style={styles.emptyText}>
          Check back later for new matches!
        </Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={loadProfiles}>
          <Icon name="refresh-outline" size={24} color={Colors.textInverse} />
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="settings-outline" size={28} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discover</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="filter-outline" size={28} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* Cards Container */}
      <View style={styles.cardsContainer}>
        {/* Next card (behind) */}
        {nextProfile && (
          <View style={[styles.cardWrapper, styles.nextCardWrapper]}>
            <View style={styles.nextCardPlaceholder} />
          </View>
        )}

        {/* Current card (front) */}
        <Animated.View
          key={currentProfile.id}
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.cardWrapper}>
          <ProfileCard
            profile={currentProfile}
            onSwipeLeft={handlePass}
            onSwipeRight={handleLike}
            onPress={handleProfilePress}
          />
        </Animated.View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.undoButton]}
          onPress={handleUndo}>
          <Icon name="arrow-undo" size={24} color={Colors.warning} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.passButton]}
          onPress={handlePass}>
          <Icon name="close" size={32} color={Colors.error} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.superLikeButton]}
          onPress={handleSuperLike}>
          <Icon name="star" size={28} color={Colors.info} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={handleLike}>
          <Icon name="heart" size={32} color={Colors.success} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.boostButton]}
          onPress={() => {}}>
          <Icon name="flash" size={24} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: Theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Colors.text,
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    position: 'absolute',
  },
  nextCardWrapper: {
    transform: [{scale: 0.95}],
    opacity: 0.5,
  },
  nextCardPlaceholder: {
    width: SCREEN_WIDTH - Theme.spacing.xl * 2,
    height: Dimensions.get('window').height * 0.7,
    borderRadius: Theme.borderRadius.xl,
    backgroundColor: Colors.surface,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    ...Theme.shadows.md,
  },
  undoButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.warning,
  },
  passButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: Colors.error,
  },
  superLikeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.info,
  },
  likeButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: Colors.success,
  },
  boostButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  emptyTitle: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Colors.text,
    marginTop: Theme.spacing.lg,
  },
  emptyText: {
    fontSize: Theme.fontSize.md,
    color: Colors.textSecondary,
    marginTop: Theme.spacing.sm,
    textAlign: 'center',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.round,
    marginTop: Theme.spacing.xl,
    gap: Theme.spacing.xs,
  },
  refreshButtonText: {
    color: Colors.textInverse,
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
  },
});

export default DiscoverScreen;
