export interface ChatContainerProps {
    roomId: string;
    userId: string;
    messages: Array<{
        id: string;
        senderId: string;
        content: string;
        timestamp: string;
    }>;
    isLoading?: boolean;
    onSendMessage?: (message: string) => void;
}