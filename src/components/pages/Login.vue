<template>
    <div>
       <van-nav-bar
        title="用户登录"
        left-text="返回"
        left-arrow
        @click-left="goBack"
        />
        <div class="register-panel">
        <van-field
            :error-message="usernameErrorMsg"
            v-model="username"
            label="用户名"
            icon="clear"
            placeholder="请输入用户名"
            required
            @click-icon="username = ''"
        />
        <van-field
            :error-message="passwordErrorMsg"
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
        />
        <div class="register-button">
            <van-button type="primary" size="large" :loading="openLoading" @click='LoginAction'>登录</van-button>
        </div>
       </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {Toast} from 'vant'
    import url from '@/serviceAPI.config.js'
    export default {
        data() {
            return {
                username: '',
                password: '',
                openLoading:false,
                usernameErrorMsg:'',   //当用户名出现错误的时候
                passwordErrorMsg:'',   //当密码出现错误的时候
            }
        },
        created(){
            if(localStorage.userInfo){
                Toast.success('您已经登录')
                this.$router.push('/Main')
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            },
            axiosRegisterUser(){
                //先把按钮进行lodading状态，防止重复提交
                this.openLoading = true
                axios({
                    url:url.login,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password,
                    }
                })
                .then((response) => {
                    if(response.data.code==200 && response.data.message){
                        new Promise((resolve,reject)=>{
                            localStorage.userInfo = {userName:this.username}
                            setTimeout(()=>{
                                resolve()
                            },500)
                        }).then(()=>{
                            Toast.success('登录成功')
                            this.$router.push('/')
                        }).catch(()=>{
                            Toast.fail('登录状态保存失败')
                            console.log(err)
                        })
                    }else{
                        Toast.fail('登录失败')
                        this.openLoading = false
                    }
                })
                .catch((error)=>{
                    console.log(error)
                    Toast.fail('登录失败')
                    this.openLoading = false
                })
            },
            checkForm(){
                let isOk= true
                if(this.username.length<5){
                    this.usernameErrorMsg="用户名不能小于5位"
                    isOk= false
                }else{
                    this.usernameErrorMsg=''
                }
                if(this.password.length<6){
                    this.passwordErrorMsg="密码不能少于6位"
                    isOk= false
                }else{
                    this.passwordErrorMsg=''
                }
                return isOk
            },
            LoginAction(){
                 this.checkForm() && this.axiosRegisterUser()
            }
            
        }
    }
</script>

<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    };
    .register-button{
        padding-top:10px;
    }
</style>