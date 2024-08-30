'use client'

import LoadingLogo from '@/components/LoadingLogo'
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { AuthLoading, ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { dark } from '@clerk/themes'
import React from 'react'

type Props = React.PropsWithChildren<{}>

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || ""

const convex = new ConvexReactClient(CONVEX_URL)

const ConvexClientProvider = ({ children }: Props) => {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark
            }}
        >
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <AuthLoading>
                    <LoadingLogo />
                </AuthLoading>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}

export default ConvexClientProvider