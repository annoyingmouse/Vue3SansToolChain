export const MyButton = Vue.component('my-button', {
  template: `
    <button class="normal"
            :class="type"
            :disabled="disabled"
            @click="callback($event)"
      >
        <slot></slot>
    </button>
  `,
  methods: {
    callback: function(e) {
      this.$emit('click', e);
    }
  }
});