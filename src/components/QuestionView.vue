<template>
    <div>
        <p>题目类型：{{ question.questionTypeId }}</p>
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
import { useRoute } from 'vue-router';
export default {
    data(){
        return{
            questionList: [],
            question: {
                questionId: '',
                questionTypeId: '测试',
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