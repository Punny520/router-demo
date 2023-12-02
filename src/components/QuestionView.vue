<template>
    <div>
        <p>题目类型：{{ questionType.typeName }}</p>
        <div>
            <div class="qo">
                {{ question.questionContent }}
            </div>

            <div class="qo">

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
export default {
    data(){
        return{
            questionType:{
                questionTypeId: '',
                typeName: '',
                questionCount: ''
            },
            questionList: [],
            question: {
                questionId: '',
                questionTypeId: '',
                questionContent: '测试',
                questionOptionsList: []
            },
            questionOptions: {
                optionsId: '',
                optionContent: '',
                questionId: '',
                answer: false
            }
        }
    },
    mounted(){
        const route = useRoute();
        console.log(route.params.id);
        axios.get("/getTypeById?id="+route.params.id).then(
            (response) =>{
                this.questionType = response.data.data;
                console.log(this.questionType);
            }
        )
    }
}
</script>

<style scoped>
    .qo{
        width: 750px;
        min-height: 100px;
        height: auto;
        margin: 20px auto;
        overflow-wrap: break-word;
    }
</style>