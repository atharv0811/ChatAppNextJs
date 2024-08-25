"use client";

import CoversationFallback from "@/components/conversation/CoversationFallback";
import ItemList from "@/components/items-list/ItemList";
import React from "react";
import AddFriendDialog from "./_components/AddFriendDialog";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import Request from "./_components/Request";

const FriendsPage = () => {
    const request = useQuery(api.requests.get);
    return (
        <>
            <ItemList title="Friends" action={<AddFriendDialog />}>
                {request ? (
                    request.length === 0 ? (
                        <p className="w-full h-full flex items-center justify-center">
                            No friends found
                        </p>
                    ) : (
                        request.map((request) => {
                            return <Request
                                key={request.request._id}
                                id={request.request._id}
                                imageUrl={request.sender.imageUrl}
                                username={request.sender.username}
                                email={request.sender.email}
                            />;
                        })
                    )
                ) : (
                    <Loader2 className="h-8 w-8 animate-spin" />
                )}
            </ItemList>
            <CoversationFallback />
        </>
    );
};

export default FriendsPage;
