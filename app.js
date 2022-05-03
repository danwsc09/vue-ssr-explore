import { createSSRApp } from 'vue';
import axios from 'axios';

export function createApp() {
  return createSSRApp({
    data: () => ({
      count: 1,
      intervalTimer: null,
      response: 'default',
    }),
    template: `
    <section>
      <div @click="handleClick()">{{ count }}</div>
      <p>{{ response }}</p>
    </section>
    `,
    async beforeCreate () {
      const randomUri = 'https://random-data-api.com/api/address/random_address'
      if (typeof fetch === 'undefined') {
        // node env
        const response = await axios.get(randomUri)
        console.log(response)
        this.response = response.data;
      } else {
        // browser env
        const response = await fetch(randomUri)
        const json = await response.json()
        this.response = json
      }
    },
    created () {
      console.log('I am created!')
    },
    mounted () {
      this.intervalTimer = setInterval(() => {
        this.count++;
        console.log('increment from setInterval; count:', this.count);
      }, 1000)
    },
    beforeUpdate () {
      console.log('in before update! current count:', this.count);
    },
    beforeUnmount () {
      clearInterval(this.intervalTimer)
    },
    methods: {
      handleClick () {
        this.count++;
        console.log('BUTTON CLICKED!');
      }
    },
  });
}
