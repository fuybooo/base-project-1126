import { Component, Vue } from 'vue-property-decorator'

/**
 */
declare module 'vue/types/vue' {
  interface Vue {
    step: number
    
    next (): void
    
    prev (): void
  }
}
@Component({})
export default class SignStepMixin extends Vue {
  public step = 2
  
  public next (): void {
    (this.$refs.cs as any).next()
  }
  
  public prev (): void {
    (this.$refs.cs as any).prev()
  }
}
