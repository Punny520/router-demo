<template>
    <div class="box">
        <h2>选择题目类型：</h2>
        <el-button
            class="but" type="primary" plain
            v-for="questionType in questionTypeList" :key="questionType.questionTypeId"
            @click="toNext(questionType.questionTypeId)"
        >
            {{ questionType.typeName }}
        </el-button>
    </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
    data(){
        return{
            questionTypeList: [
                {
                    questionTypeId: 1,
                    typeName: '1测试',
                    questionCount: '',
                },
                {
                    questionTypeId: 2,
                    typeName: '2测试',
                    questionCount: '',
                },
        ],
            questionType:{
                questionTypeId: null,
                typeName: null,
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
        // axios.get('/getQuestionType').then(
        //     (response)=>{
        //         this.questionTypeList = response.data.data;
        //     }
        // )
    },
    methods:{
        toNext(questionTypeId){
            this.router.push("/Question/"+questionTypeId);
            //跳转逻辑
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