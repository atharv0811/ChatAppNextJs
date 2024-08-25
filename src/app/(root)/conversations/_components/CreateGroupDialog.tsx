"use client";

import { useQuery } from "convex/react";
import React, { useMemo } from "react";
import { z } from "zod";
import { api } from "../../../../../convex/_generated/api";
import { useMutationState } from "@/hooks/useMutationState";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CirclePlus, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const createGroupFormSchema = z.object({
    name: z.string().min(1, "This feild cannot be empty"),
    members: z.string().array().min(1, "You must select atleast 1 friend"),
});

const CreateGroupDialog = () => {
    const friends = useQuery(api.friends.get);

    const { mutate: createGroup, pending } = useMutationState(
        api.conversation.createGroup
    );

    const form = useForm<z.infer<typeof createGroupFormSchema>>({
        resolver: zodResolver(createGroupFormSchema),
        defaultValues: {
            name: "",
            members: [],
        },
    });

    const members = form.watch("members", []);

    const unselectedFriends = useMemo(() => {
        return friends
            ? friends.filter((friend) => !members.includes(friend._id))
            : [];
    }, [members.length, friends?.length]);

    const handleSubmit = async (data: z.infer<typeof createGroupFormSchema>) => {
        await createGroup({ name: data.name, members: data.members })
            .then(() => {
                form.reset();
                toast.success("Group created successfully");
            })
            .catch((err) => {
                toast.error(
                    err instanceof ConvexError ? err.data : "Unexpected error occured"
                );
            });
    };

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button size="icon" variant="outline">
                            <CirclePlus />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Create Group</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent className="block">
                <DialogHeader>
                    <DialogTitle>Create group</DialogTitle>
                    <DialogDescription>Add your friends to get started</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Group name..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="members"
                            render={() => {
                                return (
                                    <FormItem>
                                        <FormLabel>Friends</FormLabel>
                                        <FormControl>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger
                                                    asChild
                                                    disabled={unselectedFriends.length === 0}
                                                >
                                                    <Button className="w-full" variant="outline">
                                                        Select
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-full">
                                                    {unselectedFriends.map((friend) => {
                                                        return (
                                                            <DropdownMenuCheckboxItem
                                                                key={friend._id}
                                                                className="flex items-center gap-2 w-full p-2"
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) {
                                                                        form.setValue("members", [
                                                                            ...members,
                                                                            friend._id,
                                                                        ]);
                                                                    }
                                                                }}
                                                            >
                                                                <Avatar className="w-8 h-8">
                                                                    <AvatarImage src={friend.imageUrl} />
                                                                    <AvatarFallback>
                                                                        {friend.username.charAt(0).toUpperCase()}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <h4 className="truncate">{friend.username}</h4>
                                                            </DropdownMenuCheckboxItem>
                                                        );
                                                    })}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        {members && members.length ? (
                            <Card className="flex items-center gap-3 overflow-x-auto w-full h-24 p-2 no-scrollbar">
                                {friends
                                    ?.filter((friend) => members.includes(friend._id))
                                    .map((friend) => {
                                        return (
                                            <div
                                                key={friend._id}
                                                className="flex flex-col items-center gap-1"
                                            >
                                                <div className="relative">
                                                    <Avatar>
                                                        <AvatarImage src={friend.imageUrl} />
                                                        <AvatarFallback>
                                                            {friend.username.charAt(0).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <X
                                                        className="text-muted-foreground w-4 h-4 absolute bottom-8 left-7 bg-muted rounded-full cursor-pointer"
                                                        onClick={() =>
                                                            form.setValue(
                                                                "members",
                                                                members.filter((id) => id !== friend._id)
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <p className="truncate text-sm">
                                                    {friend.username.split(" ")[0]}
                                                </p>
                                            </div>
                                        );
                                    })}
                            </Card>
                        ) : null}
                        <DialogFooter>
                            <Button disabled={pending} type="submit">
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateGroupDialog;
