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

const MessagesScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const {matches, isLoading} = useAppSelector(state => state.match);

  useEffect(() => {
    dispatch(loadMatches());
  }, [dispatch]);

  const matchesWithMessages = matches.filter(match => match.lastMessage);

  const renderMessage = ({item}: {item: Match}) => {
    const age = calculateAge(item.user.dateOfBirth);
    const mainPhoto = item.user.photos[0];
    const isUnread = item.unreadCount > 0;

    return (
      <TouchableOpacity style={styles.messageCard}>
        <View style={styles.avatarContainer}>
          <Image source={{uri: mainPhoto?.url}} style={styles.avatar} />
          {item.user.verified && (
            <View style={styles.verifiedBadge}>
              <Icon name="checkmark-circle" size={16} color={Colors.info} />
            </View>
          )}
        </View>

        <View style={styles.messageContent}>
          <View style={styles.messageHeader}>
            <Text
              style={[styles.name, isUnread && styles.nameUnread]}
              numberOfLines={1}>
              {item.user.name}, {age}
            </Text>
            {item.lastMessage && (
              <Text style={styles.timestamp}>
                {formatMessageTime(item.lastMessage.createdAt)}
              </Text>
            )}
          </View>

          {item.lastMessage && (
            <Text
              style={[styles.message, isUnread && styles.messageUnread]}
              numberOfLines={2}>
              {item.lastMessage.senderId === item.user.id ? '' : 'You: '}
              {item.lastMessage.content}
            </Text>
          )}
        </View>

        {isUnread && (
          <View style={styles.unreadIndicator}>
            <View style={styles.unreadDot} />
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
        <Text style={styles.headerTitle}>Messages</Text>
        <Text style={styles.headerSubtitle}>
          {matchesWithMessages.length}{' '}
          {matchesWithMessages.length === 1 ? 'conversation' : 'conversations'}
        </Text>
      </View>

      {matchesWithMessages.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="chatbubbles-outline" size={80} color={Colors.textLight} />
          <Text style={styles.emptyTitle}>No Messages Yet</Text>
          <Text style={styles.emptyText}>
            Start a conversation with your matches!
          </Text>
        </View>
      ) : (
        <FlatList
          data={matchesWithMessages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
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
    paddingVertical: Theme.spacing.sm,
  },
  messageCard: {
    flexDirection: 'row',
    padding: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.background,
    borderRadius: 10,
  },
  messageContent: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Colors.text,
    flex: 1,
  },
  nameUnread: {
    fontWeight: Theme.fontWeight.bold,
  },
  timestamp: {
    fontSize: Theme.fontSize.xs,
    color: Colors.textLight,
    marginLeft: Theme.spacing.xs,
  },
  message: {
    fontSize: Theme.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  messageUnread: {
    color: Colors.text,
    fontWeight: Theme.fontWeight.medium,
  },
  unreadIndicator: {
    marginLeft: Theme.spacing.sm,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
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

export default MessagesScreen;
