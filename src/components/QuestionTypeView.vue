<template>
    <div class="box" style="overflow: auto;">
        <h2 style="color: #555;">选择题目类型：</h2>
        <el-button
            class="but" type="primary" plain
            v-for="questionType in questionTypeList" :key="questionType.id"
            @click="toNext(questionType.id)"
        >
            {{ questionType.name }}
        </el-button>
    </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
    data(){
        return{
            questionTypeList: [],
            questionType:{
                id: null,
                name: null,
                questionCount: null
            }
        }
    },
    setup() {
    const router = useRouter(); // 在 setup 中获取 router 对象

    return {
      router, // 将 router 对象暴露给模板
    };
  },
    mounted(){
        //获取全部题目类型
        axios.get('/questionType/getAll').then(
            (response)=>{
                this.questionTypeList = response.data.data;
            }
        )
    },
    methods:{
        //跳转至答题页面并且传递题目类型id
        toNext(questionTypeId){
            this.router.push("/Question/"+questionTypeId);
        }
    },
}
</script>

<style scoped>
    .box{
        width: 800px;
        min-height: 100px;
        height: auto;
        margin: 20px auto;
    }
    .but{
        width: 200px;
        min-height: 50px;
        height: auto;
        padding: 5px;
        margin: 20px 10px 20px 10px;
        text-align: center;
        overflow-wrap: break-word;
    }
</style>