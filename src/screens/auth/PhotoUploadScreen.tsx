import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList, UserPhoto} from '@types';
import {Button} from '@components/common';
import {Colors, Theme, MAX_PROFILE_PHOTOS} from '@constants';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<AuthStackParamList, 'PhotoUpload'>;

const PhotoUploadScreen: React.FC<Props> = ({navigation}) => {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  const handleAddPhoto = () => {
    if (photos.length >= MAX_PROFILE_PHOTOS) {
      Alert.alert(
        'Maximum Photos Reached',
        `You can upload up to ${MAX_PROFILE_PHOTOS} photos.`,
      );
      return;
    }

    // TODO: Implement actual image picker
    // For now, using placeholder
    const newPhoto: UserPhoto = {
      id: Date.now().toString(),
      url: `https://picsum.photos/400/600?random=${Date.now()}`,
      order: photos.length,
    };

    setPhotos([...photos, newPhoto]);
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const handleReorderPhoto = (fromIndex: number, toIndex: number) => {
    const newPhotos = [...photos];
    const [movedPhoto] = newPhotos.splice(fromIndex, 1);
    newPhotos.splice(toIndex, 0, movedPhoto);
    setPhotos(newPhotos.map((photo, index) => ({...photo, order: index})));
  };

  const handleContinue = () => {
    if (photos.length < 2) {
      Alert.alert(
        'Add More Photos',
        'Please add at least 2 photos to continue.',
      );
      return;
    }
    navigation.navigate('Interests');
  };

  const handleSkip = () => {
    navigation.navigate('Interests');
  };

  const renderPhotoSlot = (index: number) => {
    const photo = photos[index];

    if (photo) {
      return (
        <View key={`photo-${index}`} style={styles.photoContainer}>
          <Image source={{uri: photo.url}} style={styles.photo} />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemovePhoto(photo.id)}>
            <Icon name="close-circle" size={24} color={Colors.error} />
          </TouchableOpacity>
          {index === 0 && (
            <View style={styles.mainBadge}>
              <Text style={styles.mainBadgeText}>Main</Text>
            </View>
          )}
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={`empty-${index}`}
        style={styles.emptySlot}
        onPress={handleAddPhoto}>
        <Icon name="add-circle-outline" size={40} color={Colors.textLight} />
        <Text style={styles.emptySlotText}>
          {index === 0 ? 'Add main photo' : 'Add photo'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Your Photos</Text>
          <Text style={styles.subtitle}>
            Upload at least 2 photos. Your first photo will be your main photo.
          </Text>
        </View>

        <View style={styles.photosGrid}>
          {[...Array(MAX_PROFILE_PHOTOS)].map((_, index) =>
            renderPhotoSlot(index),
          )}
        </View>

        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>Photo Tips:</Text>
          <Text style={styles.tipText}>• Use clear, recent photos</Text>
          <Text style={styles.tipText}>
            • Show your face in the first photo
          </Text>
          <Text style={styles.tipText}>• Avoid group photos</Text>
          <Text style={styles.tipText}>• Smile and be yourself!</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={`Continue (${photos.length}/${MAX_PROFILE_PHOTOS})`}
          onPress={handleContinue}
          fullWidth
          disabled={photos.length < 2}
        />
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip for now</Text>
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
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
  },
  photoContainer: {
    width: '47%',
    aspectRatio: 3 / 4,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: Theme.spacing.sm,
    right: Theme.spacing.sm,
    backgroundColor: Colors.background,
    borderRadius: Theme.borderRadius.round,
  },
  mainBadge: {
    position: 'absolute',
    bottom: Theme.spacing.sm,
    left: Theme.spacing.sm,
    backgroundColor: Colors.primary,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
  },
  mainBadgeText: {
    color: Colors.textInverse,
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.semibold,
  },
  emptySlot: {
    width: '47%',
    aspectRatio: 3 / 4,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surface,
  },
  emptySlotText: {
    fontSize: Theme.fontSize.sm,
    color: Colors.textLight,
    marginTop: Theme.spacing.xs,
  },
  tips: {
    backgroundColor: Colors.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  tipsTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Colors.text,
    marginBottom: Theme.spacing.sm,
  },
  tipText: {
    fontSize: Theme.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
    lineHeight: 20,
  },
  footer: {
    padding: Theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
  },
  skipText: {
    color: Colors.textSecondary,
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
  },
});

export default PhotoUploadScreen;
