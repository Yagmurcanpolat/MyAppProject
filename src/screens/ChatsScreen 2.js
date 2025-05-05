import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../constants/theme';

// Örnek mesajlaşmalar için veri
const chatData = [
  {
    id: '1',
    name: 'Tech Enthusiasts Group',
    lastMessage: 'Etkinliğe katılımınız için teşekkürler! Bir sonraki buluşmamız için haberdar olacaksınız.',
    time: '10:30',
    unread: 1,
    avatar: 'https://source.unsplash.com/random/100x100/?tech',
    isGroup: true,
  },
  {
    id: '2',
    name: 'Ayşe Yılmaz',
    lastMessage: 'Merhaba, ben de etkinliğe geleceğim!',
    time: 'Dün',
    unread: 0,
    avatar: 'https://source.unsplash.com/random/100x100/?woman',
    isGroup: false,
  },
  {
    id: '3',
    name: 'Mindful Movement',
    lastMessage: 'Yoga etkinliğimize katıldığınız için teşekkürler.',
    time: '18 Haz',
    unread: 0,
    avatar: 'https://source.unsplash.com/random/100x100/?yoga',
    isGroup: true,
  },
  {
    id: '4',
    name: 'Ahmet Çelik',
    lastMessage: 'Fotoğrafları paylaşabilir misin?',
    time: '15 Haz',
    unread: 2,
    avatar: 'https://source.unsplash.com/random/100x100/?man',
    isGroup: false,
  },
  {
    id: '5',
    name: 'Community Cares',
    lastMessage: 'Hayır koşusunun tarihi değişti, yeni tarih: 27 Haziran.',
    time: '12 Haz',
    unread: 0,
    avatar: 'https://source.unsplash.com/random/100x100/?community',
    isGroup: true,
  },
];

const ChatsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState(chatData);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filteredChats = chatData.filter(chat => 
        chat.name.toLowerCase().includes(text.toLowerCase())
      );
      setChats(filteredChats);
    } else {
      setChats(chatData);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setChats(chatData);
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatDetail', { chat: item })}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.isGroup && (
          <View style={styles.groupIndicator}>
            <MaterialCommunityIcons name="account-group" size={12} color="white" />
          </View>
        )}
      </View>
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.chatMessage} numberOfLines={1}>{item.lastMessage}</Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mesajlar</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialCommunityIcons
            name="magnify"
            size={22}
            color={theme.COLORS.textLight}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Mesajlarda ara..."
            placeholderTextColor={theme.COLORS.textLight}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={clearSearch}>
              <MaterialCommunityIcons
                name="close-circle"
                size={18}
                color={theme.COLORS.textLight}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      
      {chats.length > 0 ? (
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="chat-remove-outline"
            size={64}
            color={theme.COLORS.textLight}
          />
          <Text style={styles.emptyText}>Mesaj bulunamadı</Text>
          <Text style={styles.emptySubtext}>
            {searchQuery 
              ? 'Arama kriterlerinizle eşleşen mesaj yok'
              : 'Henüz hiç mesajınız yok. Etkinliklere katılarak diğer kullanıcılarla iletişime geçebilirsiniz.'}
          </Text>
        </View>
      )}
      
      <TouchableOpacity style={styles.newChatButton}>
        <MaterialCommunityIcons name="message-plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.background,
  },
  header: {
    paddingHorizontal: theme.SPACING.m,
    paddingTop: theme.SPACING.l,
    paddingBottom: theme.SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  headerTitle: {
    fontSize: theme.SIZES.xlarge,
    fontWeight: 'bold',
    color: theme.COLORS.text,
  },
  searchContainer: {
    paddingHorizontal: theme.SPACING.m,
    paddingVertical: theme.SPACING.s,
    backgroundColor: theme.COLORS.background,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.COLORS.card,
    borderRadius: theme.BORDER_RADIUS.l,
    paddingHorizontal: theme.SPACING.m,
    paddingVertical: Platform.OS === 'ios' ? theme.SPACING.s : 0,
    borderWidth: 1,
    borderColor: theme.COLORS.border,
  },
  searchIcon: {
    marginRight: theme.SPACING.s,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.text,
    paddingVertical: 8,
  },
  chatList: {
    paddingVertical: theme.SPACING.s,
  },
  chatItem: {
    flexDirection: 'row',
    padding: theme.SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: theme.SPACING.m,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  groupIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.COLORS.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.COLORS.background,
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontSize: theme.SIZES.medium,
    fontWeight: 'bold',
    color: theme.COLORS.text,
    flex: 1,
  },
  chatTime: {
    fontSize: theme.SIZES.small,
    color: theme.COLORS.textLight,
    marginLeft: theme.SPACING.s,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatMessage: {
    fontSize: theme.SIZES.font,
    color: theme.COLORS.textLight,
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: theme.COLORS.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.SPACING.s,
  },
  unreadText: {
    color: 'white',
    fontSize: theme.SIZES.small,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.SPACING.xl,
  },
  emptyText: {
    fontSize: theme.SIZES.large,
    fontWeight: 'bold',
    color: theme.COLORS.text,
    marginTop: theme.SPACING.m,
    marginBottom: theme.SPACING.s,
  },
  emptySubtext: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
  newChatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default ChatsScreen; 