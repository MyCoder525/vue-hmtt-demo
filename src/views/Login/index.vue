<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="from">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
        type="number"
      >
        <template #left-icon>
          <ToutiaoIcon icon="shouji"></ToutiaoIcon>
        </template>
      </van-field>

      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        type="number"
        maxlength="6"
      >
        <template #left-icon>
          <ToutiaoIcon icon="yanzhengma"></ToutiaoIcon>
        </template>
        <template #button>
          <van-count-down
            @finish="isShow = false"
            v-if="isShow"
            :time="10000"
            format="ss s"
          />
          <van-button
            v-else
            size="small"
            class="send-sms-btn"
            type="primary"
            native-type="button"
            @click="sendSmsCode"
            :loading="isDisabled"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import ToutiaoIcon from "@/components/ToutiaoIcon.vue";
import { login, getSmsCode } from "@/api/user.js";
import { Toast } from "vant";
export default {
  name: "LoginPage",
  components: { ToutiaoIcon },
  props: {},
  data() {
    return {
      isDisabled: false,
      isShow: false,
      user: {
        mobile: "",
        code: "",
      },

      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码错误",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      try {
        const res = await login(this.user);
        console.log(res);
        Toast.success("登录成功");
      } catch (e) {
        Toast.fail(e?.response?.data?.message || "服务器端错误");
      }
    },
    async sendSmsCode() {
      try {
        this.isDisabled = true;
        await this.$refs.from.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }
      try {
        await getSmsCode(this.user.mobile);
        this.isShow = true;
        Toast.success("发送验证码成功");
      } catch (e) {
        Toast.fail(e?.response?.data?.message || "出错了");
        this.isShow = false;
      } finally {
        this.isDisabled = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 156px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
</style>
