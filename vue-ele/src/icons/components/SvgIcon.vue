<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="name"></use>
    </svg>
</template>
<script>
import {onMounted,reactive, ref,computed} from '@vue/composition-api'
export default {
    props:{
        iconName:{
            type:String,
            default:'',
            required: true,
        },
         iconClass:{
            type:String,
            default:'',
        },

    },
    setup(props,{root,refs}){
        console.log("--->",props.iconName)
        // 计算属性

        const svgClass=computed(()=>{
            if(props.iconClass){
                return `svg-icon ${props.iconClass}`
            }else{
                return `svg-icon`
            }
        })
        const name=computed(()=>`#icon-${props.iconName}`)
        return {
            svgClass,
            name
        }
    }
}
</script>
<style lang="scss" scoped>
    .svg-icon{
        width: 1em;
        height: 1em;
        font-size: 20px;
        fill: currentColor;
        color: white;
        margin-right:10px ;
    }
</style>