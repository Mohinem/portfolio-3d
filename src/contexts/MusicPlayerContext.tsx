// src/contexts/MusicPlayerContext.tsx

import React, { createContext, useState, ReactNode, useContext } from "react";

interface MusicPlayerContextProps {
  isOpen: boolean;
  openMusicPlayer: (content?: MusicPlayerContent) => void;
  closeMusicPlayer: () => void;
  content?: MusicPlayerContent;
}

interface MusicPlayerContent {
  title: string;
  description: string;
  soundCloudUrl: string;
}

const MusicPlayerContext = createContext<MusicPlayerContextProps | undefined>(
  undefined
);

export const MusicPlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<MusicPlayerContent | undefined>(
    undefined
  );

  const openMusicPlayer = (newContent?: MusicPlayerContent) => {
    setContent(newContent);
    setIsOpen(true);
  };

  const closeMusicPlayer = () => {
    setIsOpen(false);
    setContent(undefined);
  };

  return (
    <MusicPlayerContext.Provider
      value={{ isOpen, openMusicPlayer, closeMusicPlayer, content }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

// Custom hook for easy access to the context
export const useMusicPlayer = (): MusicPlayerContextProps => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error(
      "useMusicPlayer must be used within a MusicPlayerProvider"
    );
  }
  return context;
};
