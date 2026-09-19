import React from 'react';
import './ChatSidebar.css';
import BackButton from './BackButton';

interface ChatSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userProfile?: { full_name?: string, email?: string, avatar_url?: string } | null;
  chatList: { id: number, role: string, created_at: string }[];
  onNewChat: () => void;
  onSelectChat: (chatId: number) => void;
  currentChatId: number | null;
}

export default function ChatSidebar({ isOpen, setIsOpen, userProfile, chatList, onNewChat, onSelectChat, currentChatId }: ChatSidebarProps) {


  return (
    <>
      <div 
        className={`ax-sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(false)}
      ></div>
      
      <div className={`ax-sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="ax-sidebar-header" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <BackButton />
            <button className="ax-sidebar-close-btn" onClick={() => setIsOpen(false)}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <button className="ax-new-chat-btn" onClick={() => { onNewChat(); setIsOpen(false); }}>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New chat
          </button>
        </div>

        <div className="ax-sidebar-scroll">
          <div>
            <div className="ax-sidebar-section-title">Your Conversations</div>
            {chatList.map(conv => (
              <button 
                key={conv.id} 
                className={`ax-conversation-btn ${currentChatId === conv.id ? 'active' : ''}`}
                onClick={() => { onSelectChat(conv.id); setIsOpen(false); }}
                style={{
                  background: currentChatId === conv.id ? 'rgba(255,255,255,0.1)' : 'transparent'
                }}
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span className="ax-conversation-title">{conv.role || 'Chat'}</span>
              </button>
            ))}
            {chatList.length === 0 && (
              <div style={{ padding: '0 20px', color: '#666', fontSize: 13, marginTop: 10 }}>No previous chats found.</div>
            )}
          </div>
        </div>

        <div className="ax-sidebar-footer">
          <button className="ax-sidebar-profile">
            {userProfile?.avatar_url ? (
              <img src={userProfile.avatar_url} alt="Profile" style={{ width: 28, height: 28, borderRadius: 4 }} />
            ) : (
              <div className="ax-sidebar-avatar">
                {userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'A'}
              </div>
            )}
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {userProfile?.full_name || 'AX User'}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
