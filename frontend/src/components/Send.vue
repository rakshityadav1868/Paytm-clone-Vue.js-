<script setup>
import {ref} from "vue"
import { useRouter,useRoute } from "vue-router";
import api from "../services/api"
import "./Send.css"

const router = useRouter()
const route = useRoute()

const amount = ref("")

const recipientid= route.query.id
const recipientname= route.query.name

const handlesubmit = async ()=>{
    if (!amount.value || Number(amount.value)<=0){
        alert("please enter a valid amount ")
        return
    }
    try{
        const res = await api.post("/account/transfer",{
            to : recipientid,
            amount: Number(amount.value)
        })
        alert("Transfer Sucessful")
        setTimeout(() => {
            router.push("/dashboard")
        }, 500);
    }catch(err){
        console.log(err)
        alert("transaction failed ",err)
    }
}

</script>

<template>
  <div class="send-container">
    <div class="send-card">
      <!-- Header -->
      <div class="send-header">
        <h1 class="send-title">Send Money</h1>
      </div>

      <!-- Recipient Info -->
      <div class="recipient-info">
        <div class="recipient-avatar">
          {{ recipientname.charAt(0).toUpperCase() }}
        </div>
        <div class="recipient-details">
          <span class="recipient-label">Sending to</span>
          <h2 class="recipient-name">{{ recipientname }}</h2>
        </div>
      </div>

      <!-- Amount Form -->
      <form @submit.prevent="handlesubmit" class="send-form">
        <div class="form-group">
          <label class="form-label">Amount (in Rs)</label>
          <input
            type="number"
            placeholder="Enter amount"
            v-model="amount"
            class="amount-input"
            required
          />
        </div>

        <button
          type="submit"
          class="initiate-btn"
        >
          Initiate Transfer
        </button>
      </form>
    </div>
  </div>
</template>