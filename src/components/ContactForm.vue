<template>
  <div class="form-wrapper box has-text-left has-background-light">
    <div class="field">
      <label class="label">お名前<span class="has-text-danger">※</span></label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="山田 太郎"
          v-model="form.name"
        />
      </div>
    </div>

    <div class="field">
      <label class="label"
        >メールアドレス<span class="has-text-danger">※</span></label
      >
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="example@example.com"
          v-model="form.email"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">内容<span class="has-text-danger">※</span></label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="お問い合わせ内容"
          v-model="form.content"
        />
      </div>
    </div>

    <div class="field">
      <div class="control" @click="onSubmit">
        <button class="button is-link is-fullwidth" :disabled="disabled">
          送信
        </button>
      </div>
    </div>
    <Notification
      :visible="notification.visible"
      :message="notification.message"
      :color="notification.color"
      @close="notification.visible = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/runtime-core";
import { functions } from "@/lib/firebase";
import Notification from "@/components/Notification.vue";

export default defineComponent({
  components: {
    Notification
  },
  setup() {
    const form = reactive({
      name: "",
      email: "",
      content: ""
    });
    const notification = reactive({
      visible: false,
      message: "",
      color: ""
    });
    const disabled = ref(false);

    const resetForm = () => {
      form.name = "";
      form.email = "";
      form.content = "";
    };

    const showMessage = (color: "danger" | "primary", message: string) => {
      notification.visible = true;
      notification.color = color;
      notification.message = message;
    };

    const onSubmit = async () => {
      disabled.value = true;
      if (!(form.name && form.email && form.content)) {
        showMessage("danger", "必須内容が入力されていません");
        disabled.value = false;
        return;
      }

      try {
        // お問い合わせフォームの送信
        const sendMail = functions.httpsCallable("sendMail");
        await sendMail({
          name: form.name,
          email: form.email,
          content: form.content
        });

        showMessage("primary", "送信が完了しました");
        resetForm();
      } catch (_e) {
        showMessage(
          "danger",
          "送信に失敗しました。時間をおいてもう一度お試しください。"
        );
      } finally {
        disabled.value = false;
      }
    };

    return {
      form,
      notification,
      disabled,
      onSubmit
    };
  }
});
</script>

<style scoped lang="scss">
.form-wrapper {
  width: 500px;
  margin: auto;
}
</style>
