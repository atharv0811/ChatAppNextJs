"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutationState } from "@/hooks/useMutationState";
import { api } from "../../../../../convex/_generated/api";
import { ConvexError } from "convex/values";
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

const addFriendFormSchema = z.object({
    email: z
        .string()
        .min(1, "This field can not be empty")
        .email("Please provide valid email address"),
});

const AddFriendDialog = () => {
    const { mutate: createRequest, pending } = useMutationState(
        api.request.create
    );

    const form = useForm<z.infer<typeof addFriendFormSchema>>({
        resolver: zodResolver(addFriendFormSchema),
        defaultValues: {
            email: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof addFriendFormSchema>) => {
        await createRequest({ email: data.email })
            .then(() => {
                form.reset();
                toast.success("Friend request sent");
            })
            .catch((error) => {
                toast.error(
                    error instanceof ConvexError ? error.data : "Unexpected error occured"
                );
            });
    };

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button size="icon" variant="outline">
                            <UserPlus />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add Friend</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Friend</DialogTitle>
                    <DialogDescription>
                        Send a request to connect your friends.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="space-y-8"
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button disabled={pending} type="submit">
                                Send
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddFriendDialog;
