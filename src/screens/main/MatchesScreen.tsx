import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Colors, Theme} from '@constants';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {loadMatches} from '@store/matchSlice';
import {calculateAge, formatMessageTime} from '@utils';
import Icon from 'react-native-vector-icons/Ionicons';
import type {Match} from '@types';

const MatchesScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const {matches, isLoading} = useAppSelector(state => state.match);

  useEffect(() => {
    dispatch(loadMatches());
  }, [dispatch]);

  const renderMatch = ({item}: {item: Match}) => {
    const age = calculateAge(item.user.dateOfBirth);
    const mainPhoto = item.user.photos[0];

    return (
      <TouchableOpacity style={styles.matchCard}>
        <Image source={{uri: mainPhoto?.url}} style={styles.matchImage} />
        <View style={styles.matchOverlay}>
          <Icon name="heart" size={20} color={Colors.textInverse} />
        </View>
        <View style={styles.matchInfo}>
          <Text style={styles.matchName} numberOfLines={1}>
            {item.user.name}, {age}
          </Text>
          {item.lastMessage && (
            <Text style={styles.matchMessage} numberOfLines={1}>
              {item.lastMessage.content}
            </Text>
          )}
        </View>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matches</Text>
        <Text style={styles.headerSubtitle}>
          {matches.length} {matches.length === 1 ? 'match' : 'matches'}
        </Text>
      </View>

      {matches.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="heart-outline" size={80} color={Colors.textLight} />
          <Text style={styles.emptyTitle}>No Matches Yet</Text>
          <Text style={styles.emptyText}>
            Start swiping to find your perfect match!
          </Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          renderItem={renderMatch}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  headerSubtitle: {
    fontSize: Theme.fontSize.md,
    color: Colors.textSecondary,
    marginTop: Theme.spacing.xs,
  },
  listContent: {
    padding: Theme.spacing.md,
  },
  row: {
    justifyContent: 'space-between',
  },
  matchCard: {
    width: '48%',
    aspectRatio: 3 / 4,
    borderRadius: Theme.borderRadius.lg,
    marginBottom: Theme.spacing.md,
    overflow: 'hidden',
    ...Theme.shadows.md,
    backgroundColor: Colors.background,
  },
  matchImage: {
    width: '100%',
    height: '100%',
  },
  matchOverlay: {
    position: 'absolute',
    top: Theme.spacing.sm,
    right: Theme.spacing.sm,
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Theme.spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  matchName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Colors.textInverse,
  },
  matchMessage: {
    fontSize: Theme.fontSize.sm,
    color: Colors.textInverse,
    marginTop: 2,
    opacity: 0.8,
  },
  unreadBadge: {
    position: 'absolute',
    top: Theme.spacing.sm,
    left: Theme.spacing.sm,
    backgroundColor: Colors.primary,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: Colors.textInverse,
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.bold,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xl,
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
});

export default MatchesScreen;
