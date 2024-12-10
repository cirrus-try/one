import { ChevronLeft, Search, Settings2, UserCircle } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { H3, Input, TooltipSimple, XStack } from 'tamagui'
import { githubSignIn } from '~/features/auth/githubSignIn'
import { useAuth } from '~/features/auth/useAuth'
import { updateUserState, useUserState } from '~/features/auth/useUserState'
import { HotMenu } from '~/features/hotmenu/HotMenu'
import { isTauri } from '~/features/tauri/constants'
import { useCurrentChannel, useCurrentServer } from '~/features/zero/useServer'
import { Avatar } from './Avatar'
import { Button } from './Button'

export const TopBar = memo(() => {
  const { user, session, jwtToken } = useAuth()
  const server = useCurrentServer()
  const channel = useCurrentChannel()
  const userState = useUserState()

  return (
    <XStack
      data-tauri-drag-region
      br="$4"
      mx={2}
      ai="center"
      jc="space-between"
      y={2}
      h={34}
      pl={72}
      pr={4}
      mb={4}
    >
      <XStack gap="$2">
        <TooltipSimple label="Menu">
          <HotMenu />
        </TooltipSimple>

        <H3 cur="default" userSelect="none" pe="none" m={0} o={0.5} size="$2">
          {server?.name || '-'} - #{channel?.name || '-'}
        </H3>
      </XStack>

      <XStack ai="center" gap="$1">
        <XStack ai="center" gap="$2" mr="$4">
          <Search size={16} o={0.5} />
          <Input w={250} placeholder="" size="$2" bw={0} />
        </XStack>

        <Button
          onPress={() => {
            if (userState?.showSidePanel === 'settings') {
              updateUserState({
                showSidePanel: undefined,
              })
            } else {
              updateUserState({
                showSidePanel: 'settings',
              })
            }
          }}
        >
          <Settings2 o={0.5} size={20} />
        </Button>

        <UserButton />

        {!isTauri && jwtToken && (
          <a href={`one-chat://finish-auth?token=${session?.token}`}>
            <Button>Open native app</Button>
          </a>
        )}
      </XStack>
    </XStack>
  )
})

const UserButton = () => {
  const { user, loggedIn } = useAuth()
  const userState = useUserState()

  return (
    <>
      <a
        target="_blank"
        {...(!loggedIn &&
          !userState?.showSidePanel && {
            href: window.location.origin + '/login-github',
          })}
        rel="noreferrer"
        // biome-ignore lint/a11y/useValidAnchor: <explanation>
        onClick={(e) => {
          if (userState?.showSidePanel === 'user') {
            e.preventDefault()
            updateUserState({
              showSidePanel: undefined,
            })
            return
          }

          if (loggedIn) {
            e.preventDefault()
            updateUserState({
              showSidePanel: 'user',
            })
            return
          }

          if (!isTauri) {
            e.preventDefault()
            githubSignIn()
            return
          }
        }}
      >
        <Button circular>
          {userState?.showSidePanel === 'user' ? (
            <ChevronLeft size={20} o={0.5} />
          ) : user?.image ? (
            <Avatar image={user.image} />
          ) : (
            <UserCircle size={20} o={0.5} />
          )}
        </Button>
      </a>
    </>
  )
}
