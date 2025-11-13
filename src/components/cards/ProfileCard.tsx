import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {UserProfile} from '@types';
import {Colors, Theme} from '@constants';
import {calculateAge, formatDistance} from '@utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - Theme.spacing.xl * 2;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.7;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

interface ProfileCardProps {
  profile: UserProfile;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onPress: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onSwipeLeft,
  onSwipeRight,
  onPress,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(event => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        // Swipe detected
        if (event.translationX > 0) {
          // Swipe right - like
          translateX.value = withSpring(SCREEN_WIDTH, {}, () => {
            onSwipeRight();
          });
        } else {
          // Swipe left - pass
          translateX.value = withSpring(-SCREEN_WIDTH, {}, () => {
            onSwipeLeft();
          });
        }
      } else {
        // Return to center
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-15, 0, 15],
      Extrapolate.CLAMP,
    );

    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {rotate: `${rotate}deg`},
      ],
    };
  });

  const likeOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 4],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {opacity};
  });

  const nopeOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 4, 0],
      [1, 0],
      Extrapolate.CLAMP,
    );
    return {opacity};
  });

  const age = calculateAge(profile.dateOfBirth);
  const mainPhoto = profile.photos[currentPhotoIndex] || profile.photos[0];

  const handleNextPhoto = () => {
    if (currentPhotoIndex < profile.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const handlePrevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, animatedCardStyle]}>
        <TouchableOpacity activeOpacity={0.95} onPress={onPress}>
          <Image source={{uri: mainPhoto?.url}} style={styles.image} />

          {/* Like/Nope Labels */}
          <Animated.View style={[styles.likeLabel, likeOpacityStyle]}>
            <Text style={styles.likeLabelText}>LIKE</Text>
          </Animated.View>
          <Animated.View style={[styles.nopeLabel, nopeOpacityStyle]}>
            <Text style={styles.nopeLabelText}>NOPE</Text>
          </Animated.View>

          {/* Photo Navigation Dots */}
          {profile.photos.length > 1 && (
            <View style={styles.dotsContainer}>
              {profile.photos.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentPhotoIndex && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          )}

          {/* Photo Navigation Touch Areas */}
          {currentPhotoIndex > 0 && (
            <TouchableOpacity
              style={styles.leftTouchArea}
              onPress={handlePrevPhoto}
            />
          )}
          {currentPhotoIndex < profile.photos.length - 1 && (
            <TouchableOpacity
              style={styles.rightTouchArea}
              onPress={handleNextPhoto}
            />
          )}

          {/* Gradient Overlay */}
          <View style={styles.gradient} />

          {/* Profile Info */}
          <View style={styles.infoContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>
                {profile.name}, {age}
              </Text>
              {profile.verified && (
                <Icon
                  name="checkmark-circle"
                  size={24}
                  color={Colors.info}
                  style={styles.verifiedIcon}
                />
              )}
            </View>

            {profile.bio && (
              <Text style={styles.bio} numberOfLines={2}>
                {profile.bio}
              </Text>
            )}

            {profile.distance !== undefined && (
              <View style={styles.distanceRow}>
                <Icon name="location-outline" size={16} color={Colors.textInverse} />
                <Text style={styles.distance}>
                  {formatDistance(profile.distance)}
                </Text>
              </View>
            )}

            {profile.interests.length > 0 && (
              <View style={styles.interestsContainer}>
                {profile.interests.slice(0, 3).map((interest, index) => (
                  <View key={index} style={styles.interestChip}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                ))}
                {profile.interests.length > 3 && (
                  <View style={styles.interestChip}>
                    <Text style={styles.interestText}>
                      +{profile.interests.length - 3}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: Theme.borderRadius.xl,
    overflow: 'hidden',
    ...Theme.shadows.lg,
    backgroundColor: Colors.background,
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'transparent',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
  },
  likeLabel: {
    position: 'absolute',
    top: 50,
    left: 30,
    borderWidth: 4,
    borderColor: Colors.success,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Theme.borderRadius.md,
    transform: [{rotate: '-20deg'}],
  },
  likeLabelText: {
    fontSize: 32,
    fontWeight: Theme.fontWeight.bold,
    color: Colors.success,
  },
  nopeLabel: {
    position: 'absolute',
    top: 50,
    right: 30,
    borderWidth: 4,
    borderColor: Colors.error,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Theme.borderRadius.md,
    transform: [{rotate: '20deg'}],
  },
  nopeLabelText: {
    fontSize: 32,
    fontWeight: Theme.fontWeight.bold,
    color: Colors.error,
  },
  dotsContainer: {
    position: 'absolute',
    top: Theme.spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    backgroundColor: Colors.textInverse,
  },
  leftTouchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 100,
    width: '40%',
  },
  rightTouchArea: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 100,
    width: '40%',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Theme.spacing.xl,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  name: {
    fontSize: Theme.fontSize.xxxl,
    fontWeight: Theme.fontWeight.bold,
    color: Colors.textInverse,
  },
  verifiedIcon: {
    marginLeft: Theme.spacing.xs,
  },
  bio: {
    fontSize: Theme.fontSize.md,
    color: Colors.textInverse,
    marginBottom: Theme.spacing.sm,
    lineHeight: 20,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  distance: {
    fontSize: Theme.fontSize.sm,
    color: Colors.textInverse,
    marginLeft: 4,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.xs,
  },
  interestChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.round,
  },
  interestText: {
    fontSize: Theme.fontSize.xs,
    color: Colors.textInverse,
    fontWeight: Theme.fontWeight.medium,
  },
});

export default ProfileCard;
