'use client'

import { Card } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { SendHorizonal } from 'lucide-react'
import TextAreaAutosize from 'react-textarea-autosize'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useConversation } from '@/hooks/useConversation'
import { useMutationState } from '@/hooks/useMutationState'
import { api } from '../../../../../../../convex/_generated/api'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'
import { useRef } from 'react'

const chatMessageSchema = z.object({
    content: z.string().min(1, "Field can not be empty")
})

const ChatInput = () => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const { conversationId } = useConversation()

    const { mutate: createMessage, pending } = useMutationState(api.message.create)

    const form = useForm<z.infer<typeof chatMessageSchema>>({
        resolver: zodResolver(chatMessageSchema),
        defaultValues: {
            content: ""
        }
    })

    const handleInputChange = (e: any) => {
        const { value, selectionStart } = e.target;

        if (selectionStart !== null) {
            form.setValue('content', value)
        }
    }

    const handleSubmit = async (value: z.infer<typeof chatMessageSchema>) => {
        createMessage({
            conversationId,
            type: 'text',
            content: [value.content]
        }).then(() => {
            form.reset()
        }).catch(err => {
            toast.error(err instanceof ConvexError ? err.data : 'Unexpected error occured')
        })
    }

    return (
        <Card className='w-full p-2 rounded-lg relative'>
            <div className='flex gap-2 items-end w-full'>
                <Form {...form}>
                    <form className='flex gap-2 items-end w-full' onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            control={form.control}
                            name='content'
                            render={({ field }) => {
                                return (
                                    <FormItem className='h-full w-full'>
                                        <FormControl>
                                            <TextAreaAutosize
                                                onKeyDown={async e => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        await form.handleSubmit(handleSubmit)()
                                                    }
                                                }}
                                                rows={1}
                                                maxRows={3}
                                                {...field}
                                                onChange={handleInputChange}
                                                onClick={handleInputChange}
                                                placeholder='Type a message...'
                                                className='min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <Button disabled={pending} size='icon' type='submit'>
                            <SendHorizonal />.
                        </Button>
                    </form>
                </Form>
            </div>
        </Card>
    )
}

export default ChatInput