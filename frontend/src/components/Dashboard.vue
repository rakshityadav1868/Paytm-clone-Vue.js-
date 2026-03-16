<script setup>
import {onMounted, ref, watch} from "vue"
import { useRouter } from "vue-router"
import api from "../services/api"
import "./Dashboard.css"

const router = useRouter()
const users =ref([])
const filter = ref("")
const balance = ref(0)
const username = localStorage.getItem("username")||"User"
const firstName= localStorage.getItem("firstName")


const handlelogout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    router.push("/")
}
const fetchuser= async ()=>{
    try{
        const res= await api.get(`/user/bulk?filter=${filter}`)
        const loggedinuser= localStorage.getItem("username")
        const filteruser=res.data.users.filter(user=>
            {
                return user.username!=loggedinuser
            }

        )
        users.value=filteruser
    }catch(err){
        console.log(err)
    }

}
const fetchbalance= async ()=>{
    try{
const res= await api.get("/account/balance")
balance.value=res.data.balance
    }catch(err){
        console.log(err)
    }
}

watch(filter,fetchuser)

onMounted(()=>{
    fetchbalance()
    fetchuser()
})

const handlesendmoney=(user)=>{
    router.push(`/send?id=${user._id}&name=${user.firstName}`)
}

</script>

<template>
  <div class="dashboard-container">
    <!-- Header -->
    <div class="dashboard-header">
      <div class="dashboard-header-content">
        <div>
          <h1 class="dashboard-title">Welcome, {{ firstName }}!</h1>
          <p class="dashboard-subtitle">Manage your payments and transfers</p>
        </div>
        <button @click="handlelogout" class="dashboard-logout-btn">
          Logout
        </button>
      </div>
    </div>

    <!-- Balance Section -->
    <div class="dashboard-balance-section">
      <div class="dashboard-balance-card">
        <p class="dashboard-balance-label">Your Balance</p>
        <h2 class="dashboard-balance-amount">₹{{ balance }}</h2>
      </div>
    </div>

    <!-- Users Section -->
    <div class="dashboard-users-section">
      <div class="dashboard-users-header">
        <h2 class="dashboard-users-title">Send Money</h2>
        <input
          v-model="filter"
          type="text"
          placeholder="Search users..."
          class="dashboard-search-input"
        />
      </div>

      <!-- Users Grid -->
      <div class="dashboard-users-grid">
        <div
          v-for="user in users"
          :key="user._id"
          class="dashboard-user-card"
        >
          <div class="dashboard-user-info">
            <div class="dashboard-user-avatar">
              {{ user.firstName.charAt(0).toUpperCase() }}
            </div>
            <div class="dashboard-user-details">
              <p class="dashboard-user-name">{{ user.firstName }} {{ user.lastName }}</p>
              <p class="dashboard-user-email">{{ user.username }}</p>
            </div>
          </div>
          <button
            @click="handlesendmoney(user)"
            class="dashboard-send-btn"
          >
            Send Money
          </button>
        </div>
      </div>

      <!-- No Users Message -->
      <div v-if="users.length === 0" class="dashboard-no-users">
        <p>No users found</p>
      </div>
    </div>
  </div>
</template>