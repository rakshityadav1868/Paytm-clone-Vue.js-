<script setup>
import {ref} from "vue"
import {useRouter} from "vue-router"
import api from "../services/api"
import "./Signup.css"

const firstName= ref("")
const lastName= ref("")
const username= ref("")
const password= ref("")
const loading = ref(false)

const router = useRouter()

const handlesubmit= async()=>{
    if (! firstName || !lastName || !username || !password){
        alert("Please fill the required fields")
        return 

    }
    loading.value=true
    try{
        const response=await api.post("/user/signup",{
            username: username.value,
            firstName: firstName.value,
            password: password.value,
            lastName: lastName.value
        })
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("username", username.value)
        localStorage.setItem("firstName",firstName.value)
        router.push("/dashboard")
    }catch(err){
        alert("signup Failed")
    }finally{
        loading.value=false
    }
}
</script>

<template>
  <div class="signup-container">
    <div class="signup-card">
      <!-- Header -->
      <div class="signup-header">
        <h1 class="signup-title">Sign Up</h1>
        <p class="signup-subtitle">Create your account to get started</p>
      </div>

      <!-- Form -->
      <form class="signup-form" @submit.prevent="handlesubmit">
        <!-- First Name -->
        <div class="signup-form-group">
          <label class="signup-label">First Name</label>
          <input
            type="text"
            placeholder="John"
            v-model="firstName"
            class="signup-input"
            required
          />
        </div>

        <!-- Last Name -->
        <div class="signup-form-group">
          <label class="signup-label">Last Name</label>
          <input
            type="text"
            placeholder="Doe"
            v-model="lastName"
            class="signup-input"
            required
          />
        </div>

        <!-- Email -->
        <div class="signup-form-group">
          <label class="signup-label">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            v-model="username"
            class="signup-input"
            required
          />
        </div>

        <!-- Password -->
        <div class="signup-form-group">
          <label class="signup-label">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            v-model="password"
            class="signup-input"
            required
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="signup-button"
        >
          {{ loading ? "Creating Account..." : "Sign Up" }}
        </button>
      </form>

      <!-- Divider -->
      <div class="signup-divider">
        <div class="signup-divider-line"></div>
        <span class="signup-divider-text">OR</span>
        <div class="signup-divider-line"></div>
      </div>

      <!-- Footer -->
      <div class="signup-footer">
        <p class="signup-footer-text">
          Already have an account?
          <router-link to="/" class="signup-link">
            Sign In
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>