<script setup lang="ts">
import Logo from '@/layouts/dashboard/logo/LogoMain.vue';
import AuthRegister from '../authentication/authForms/AuthRegister.vue';

// Assets
import facebookImg from '@/assets/images/icons/facebook.svg';
import twitterImg from '@/assets/images/icons/twitter.svg';
import googleImg from '@/assets/images/icons/google.svg';
</script>

<template>
  <v-row class="bg-containerBg position-relative" no-gutters>
    <div class="bg-blur">
      <div class="round-1"></div>
      <div class="round-2"></div>
    </div>

    <v-col cols="12" lg="12" class="d-flex align-center">
      <v-container>
        <div class="d-flex align-center justify-center" style="min-height: calc(100vh - 148px)">
          <v-row justify="center">
            <v-col cols="12" md="12">
              <v-card elevation="0" variant="outlined" rounded="lg" class="loginBox bg-surface">
                <v-card-text class="pa-sm-10 pa-6">
                  <div class="text-center">
                    <Logo class="mb-3" />
                    <v-list>
                      <v-list-item color="secondary" variant="tonal" href="#" rounded="md" class="mb-2">
                        <v-img :src="facebookImg" alt="Facebook" class="me-2 d-inline-flex" width="9" height="16" />
                        Sign in with Facebook
                      </v-list-item>
                      <v-list-item color="secondary" variant="tonal" href="#" rounded="md" class="mb-2">
                        <v-img :src="twitterImg" alt="Twitter" class="me-2 d-inline-flex" width="16" height="13" />
                        Sign in with Twitter
                      </v-list-item>
                      <v-list-item color="secondary" variant="tonal" href="#" rounded="md" class="mb-2">
                        <v-img :src="googleImg" alt="Google" class="me-2 d-inline-flex" width="16" height="16" />
                        Sign in with Google
                      </v-list-item>
                    </v-list>
                    <v-row>
                      <v-col cols="12" class="d-flex align-center">
                        <v-divider />
                        <div class="orbtn">OR</div>
                        <v-divider />
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Register Form -->
                  <AuthRegister />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}
</style>
