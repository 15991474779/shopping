<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" v-model="usernameModel" placeholder="请输入手机号或邮箱">
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
        <span class="g-form-label">确认密码：</span>
        <div class="g-form-input">
          <input type="password" v-model="rePasswordModel" placeholder="请确认密码">
        </div>
        <span class="g-form-error">{{rePasswordErrors.errorText}}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="reg">注册</a>
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
      rePasswordModel:'',
      errorText:'',
      userFlag:false,
      passwordFlag:false,
      rePasswordFlag:false
    };
  },
  computed:{
    userErrors(){
      let status,errorText
      if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.usernameModel))&&!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/).test(this.usernameModel)){ 
        status=false
        errorText='用户名格式有误！'
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
        errorText='密码为6位数字！'
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
    },
    rePasswordErrors(){
      let status,errorText
      if (this.rePasswordModel!==this.passwordModel) {
        status=false;
        errorText='两次输入密码不一致！'
      } else {
        status=true
        errorText=''
      }
      if (!this.rePasswordFlag||this.rePasswordModel==='') {
        errorText=''
        this.rePasswordFlag=true
      }
      return {
        status,
        errorText
      }
    }
  },
  methods:{
    reg(){
      if (!this.userErrors.status||!this.passwordErrors.status||!this.rePasswordErrors.status) {
        this.errorText='用户名或密码不正确';
      } else {
        this.errorText='';
        this.$http.post('https://wd3793229206tfiauj.wilddogio.com/users.json',{
          username:this.usernameModel,
          password:this.passwordModel,
          rePassWord:this.rePasswordModel
        }).then((data)=>{
          console.log(data);
          this.$emit('has-log')
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
