import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../constants/theme';

const ChatDetailScreen = ({ route, navigation }) => {
  const { chat } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: chat.lastMessage,
      time: chat.time,
      isMe: false,
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          text: message.trim(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: true,
        },
      ]);
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.isMe ? styles.myMessage : styles.theirMessage]}>
      <Text style={[styles.messageText, item.isMe ? styles.myMessageText : styles.theirMessageText]}>
        {item.text}
      </Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          inverted={false}
        />
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!message.trim()}
          >
            <MaterialCommunityIcons 
              name="send" 
              size={24} 
              color={message.trim() ? theme.COLORS.primary : theme.COLORS.textLight} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.background,
  },
  messagesList: {
    padding: theme.SPACING.m,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: theme.SPACING.m,
    padding: theme.SPACING.m,
    borderRadius: theme.BORDER_RADIUS.l,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: theme.COLORS.primary,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: theme.COLORS.card,
  },
  messageText: {
    fontSize: theme.SIZES.font,
    marginBottom: 4,
  },
  myMessageText: {
    color: 'white',
  },
  theirMessageText: {
    color: theme.COLORS.text,
  },
  messageTime: {
    fontSize: theme.SIZES.small,
    color: theme.COLORS.textLight,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: theme.SPACING.m,
    borderTopWidth: 1,
    borderTopColor: theme.COLORS.border,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: theme.COLORS.card,
    borderRadius: theme.BORDER_RADIUS.l,
    paddingHorizontal: theme.SPACING.m,
    paddingVertical: theme.SPACING.s,
    marginRight: theme.SPACING.s,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default ChatDetailScreen; 