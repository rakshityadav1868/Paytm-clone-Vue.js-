<script setup>
import {ref} from "vue"
import {useRouter} from 'vue-router'
import api from "../services/api"

const username= ref("")
const password=ref("")
const loading= ref(false)

const router = useRouter() // same as navigate in react will use router.push in vue

const handlesignin= async ()=>{
    if(!username || !password){
        alert("Please fill both the fields")
        return
    }
    loading.value=true
    try{
        const response= await api.post("/user/signin",{
            username: username.value,
            password: password.value
        })
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("username",response.data.username)
        localStorage.setItem("firstName",response.data.firstName)

        router.push("/dashboard")
    }catch(err){
        alert("Signin failed")

    }finally{
        loading.value=false
    }
}

</script>

<template>
  <div class="signin-container">
    <div class="signin-card">
      <!-- Header -->
      <div class="signin-header">
        <h1 class="signin-title">Sign In</h1>
        <p class="signin-subtitle">Welcome back to your account</p>
      </div>

      <!-- Form -->
      <form class="signin-form" @submit.prevent="handlesignin">
        <!-- Email -->
        <div class="signin-form-group">
          <label class="signin-label">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            v-model="username"
            class="signin-input"
            required
          />
        </div>

        <!-- Password -->
        <div class="signin-form-group">
          <label class="signin-label">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            v-model="password"
            class="signin-input"
            required
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="signin-button"
        >
          {{ loading ? "Signing in..." : "Sign In" }}
        </button>
      </form>

      <!-- Divider -->
      <div class="signin-divider">
        <div class="signin-divider-line"></div>
        <span class="signin-divider-text">OR</span>
        <div class="signin-divider-line"></div>
      </div>

      <!-- Signup Link -->
      <div class="signin-footer">
        <p class="signin-footer-text">
          Don't have an account?
          <router-link to="/signup" class="signin-link">
            Sign Up
          </router-link>
        </p>
      </div>
    </div>
  </div>    
</template>