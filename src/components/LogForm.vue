<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{userErrors.errorText}}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{passwordErrors.errorText}}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="login">登录</a>
        </div>
      </div>
      <p>{{errorText}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usernameModel:'',
      passwordModel:'',
      errorText:'',
      userFlag:false,
      passwordFlag:false
    };
  },
  computed:{
    userErrors(){
      let status,errorText
      if (!/@/g.test(this.usernameModel)) {
        status=false
        errorText='不包含@'
      } else {
        status=true
        errorText=''
      }
      if (!this.userFlag) {
        errorText=''
        this.userFlag=true
      }
      return {
        status,
        errorText
      }
    },
    passwordErrors(){
      let status,errorText
      if (!/^\w{6}$/g.test(this.passwordModel)) {
        status=false;
        errorText='请输入6位密码'
      } else {
        status=true
        errorText=''
      }
      if (!this.passwordFlag) {
        errorText=''
        this.passwordFlag=true
      }
      return {
        status,
        errorText
      }
    }
  },
  methods:{
    login(){
      if (!this.userErrors.status||!this.passwordErrors.status) {
        this.errorText='用户名或密码不正确';
      } else {
        this.errorText='';
        this.$http.get('api/login').then((data)=>{
          this.$emit('has-log',data.body)
        },(err)=>{
          console.log(err)
        })
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
