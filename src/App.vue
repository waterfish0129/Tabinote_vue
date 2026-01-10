<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/stores/locale'

const { t } = useI18n()
const localeStore = useLocaleStore()

//pinia 在.vue裡面用
// import { useSystemStore } from '@/stores/system'
// const systemStore = useSystemStore()

//pinia 在.ts裡面用
// import { useSystemStore } from '@/stores/system'
// import { pinia } from '@/stores'
// const systemStore = useSystemStore(pinia)
// console.log(systemStore.baseUrl)

import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
function callback(response: google.accounts.id.CredentialResponse) {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log('Handle the response', response.credential)

  authStore.loginWithGoogle(response.credential)
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <h1>{{ t('login.title') }}</h1>

      <Button @click="localeStore.setLocale('en')">English</Button>
      <Button @click="localeStore.setLocale('zh-TW')">中文</Button>

      <HelloWorld msg="You did it!" />
      <GoogleLogin :callback="callback"> </GoogleLogin>

      <Card class="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription> Enter your email below to login to your account </CardDescription>
          <CardAction>
            <Button variant="link"> Sign Up </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div class="grid w-full items-center gap-4">
              <div class="flex flex-col space-y-1.5">
                <Label for="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" />
              </div>
              <div class="flex flex-col space-y-1.5">
                <div class="flex items-center">
                  <Label for="password">Password</Label>
                  <a href="#" class="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter class="flex flex-col gap-2">
          <Button class="w-full"> Login </Button>
          <Button variant="outline" class="w-full"> Login with Google </Button>
        </CardFooter>
      </Card>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
