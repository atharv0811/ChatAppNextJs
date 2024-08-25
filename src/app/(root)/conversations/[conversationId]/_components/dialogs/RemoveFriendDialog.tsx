"use client";

import { Dispatch, SetStateAction } from "react";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import { useMutationState } from "@/hooks/useMutationState";
import { api } from "../../../../../../../convex/_generated/api";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

type Props = {
    conversationId: Id<"conversations">;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const RemoveFriendDialog = ({ conversationId, open, setOpen }: Props) => {
    const { mutate: removeFriend, pending } = useMutationState(api.friend.remove);

    const handleRemoveFriend = async () => {
        removeFriend({ conversationId })
            .then(() => {
                toast.success("Friend removed successfully");
            })
            .catch((err) => {
                toast.error(
                    err instanceof ConvexError ? err.data : "Unexpected error occured"
                );
            });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. All messages will be deleted and you will not able to message this user.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={pending}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction disabled={pending} onClick={handleRemoveFriend}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
};

export default RemoveFriendDialog;
