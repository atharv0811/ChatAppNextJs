"use client";

import ItemList from "@/components/items-list/ItemList";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import ConversationList from "./_components/ConversationList";
import CreateGroupDialog from "./_components/CreateGroupDialog";
import GroupList from "./_components/GroupList";

type Props = React.PropsWithChildren<{}>;

const ConversationLayout = ({ children }: Props) => {
    const conversations = useQuery(api.conversations.get);
    return (
        <>
            <ItemList title="Conversation" action={<CreateGroupDialog />}>
                {conversations ? (
                    conversations.length === 0 ? (
                        <p className="w-full h-full flex justify-center items-center">
                            No conversations found
                        </p>
                    ) : (
                        conversations.map((conversation) => {
                            return conversation.conversation.isGroup ? (
                                <GroupList
                                    key={conversation.conversation._id}
                                    id={conversation.conversation._id}
                                    name={conversation.conversation.name || ""}
                                    lastMessageContent={conversation.lastMessage?.content}
                                    lastMessageSender={conversation.lastMessage?.sender}
                                    unseenCount={conversation.unseenCount}
                                />
                            ) : (
                                <ConversationList
                                    key={conversation.conversation._id}
                                    id={conversation.conversation._id}
                                    username={conversation.otherMember?.username || ""}
                                    imageUrl={conversation.otherMember?.imageUrl || ""}
                                    lastMessageContent={conversation.lastMessage?.content}
                                    lastMessageSender={conversation.lastMessage?.sender}
                                    unseenCount={conversation.unseenCount}
                                />
                            );
                        })
                    )
                ) : (
                    <Loader2 className="h-8 w-8 animate-spin" />
                )}
            </ItemList>
            {children}
        </>
    );
};

export default ConversationLayout;
