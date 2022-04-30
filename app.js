import { createSSRApp } from 'vue';

export function createApp() {
  return createSSRApp({
    data: () => ({ count: 1, intervalTimer: null }),
    // template: `<div @click="handleClick()">{{ count }}</div>`,
    template: `<p><div @click="handleClick()">{{ count }}</div></p>`,
    // created () {
    //   this.intervalTimer = setInterval(() => {
    //     this.count++;
    //     console.log('increment from setInterval; count:', this.count);
    //   }, 1000)
    // },
    methods: {
      handleClick () {
        this.count++;
        console.log('BUTTON CLICKED!');
      }
    },
    // beforeUnmount () {
    //   clearInterval(this.intervalTimer)
    // }
  });
}
