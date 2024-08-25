import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutationState } from "@/hooks/useMutationState";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

type Props = {
    id: Id<"requests">;
    imageUrl: string;
    username: string;
    email: string;
};

const Request = ({ id, imageUrl, username, email }: Props) => {
    const { mutate: rejectRequest, pending: rejectPending } = useMutationState(
        api.request.reject
    );

    const { mutate: acceptRequest, pending: acceptPending } = useMutationState(
        api.request.accept
    );

    return (
        <Card className="w-full p-2 flex flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-4 truncate">
                <Avatar>
                    <AvatarImage src={imageUrl} />
                    <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col truncate">
                    <h4 className="truncate">{username}</h4>
                    <p className="text-xs text-muted-foreground truncate">{email}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    size="icon"
                    disabled={acceptPending || rejectPending}
                    onClick={() => {
                        acceptRequest({ id })
                            .then(() => {
                                toast.success("Friend request accepted");
                            })
                            .catch((err) => {
                                toast.error(
                                    err instanceof ConvexError
                                        ? err.data
                                        : "Unexpected error occured"
                                );
                            });
                    }}
                >
                    <Check />
                </Button>
                <Button
                    size="icon"
                    variant="destructive"
                    disabled={rejectPending || acceptPending}
                    onClick={() => {
                        rejectRequest({ id })
                            .then(() => {
                                toast.success("Friend request rejected");
                            })
                            .catch((err) => {
                                toast.error(
                                    err instanceof ConvexError
                                        ? err.data
                                        : "Unexpected error occured"
                                );
                            });
                    }}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </Card>
    );
};

export default Request;
