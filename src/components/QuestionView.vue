<template>
    <div v-if="questionIndex < questionList.length" style="overflow: auto;">
        <p>题目类型：{{ questionType.name }}</p>
        <div>
            <div>
                <div class="qo">
                    {{ questionList[questionIndex].content}}
                </div>
                <div class="qo" v-for="(qoption,index) in questionList[questionIndex].qoptionList" 
                :key='`${questionList[questionIndex].id}_${qoption.id}`'>
                    <el-radio :label="index" size="large" v-model="chosen" border>
                        {{ abcIndex[index] }}
                    </el-radio>
                     {{ qoption.content }}
                </div>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between;">
            <el-button type="primary" 
            :disabled="questionIndex === 0 ? true : false" @click="left_but">
                <el-icon><ArrowLeftBold /></el-icon>上一题
            </el-button>

            <el-button v-if="questionIndex < questionList.length-1" 
            type="primary" 
            @click="right_but">
                下一题<el-icon><ArrowRightBold /></el-icon>
            </el-button>
            
            <el-button v-else 
            type="primary" 
            @click="finish_but">
                查看结果<el-icon><CircleCheckFilled /></el-icon>
            </el-button>
        </div>
    </div>
    <div v-else style="overflow: auto;">
        <div class="qo">
            本次答题答对: 
            {{ right_num }} /
            {{ questionList.length }}题
            <br>
            得分: {{ right_num }} 分
        </div>

        <div class="qo" v-for="(question,que_index) in questionList" :key="`t_${question.id}`" style="position: relative;">
            {{ que_index+1 }}  : {{ question.content}}
            <div class="opt" v-for="(qoption,opt_index) in question.qoptionList"
                :key='`t_${question.id}_${qoption.id}`'>
                {{ abcIndex[opt_index]}} : {{ qoption.content }}
            </div>
            正确答案: <span style="color: #67C23A;">{{ getAnswer(question.qoptionList) }}</span>
            <br>
            你选择的: 
            <span :style="getColor(getAnswer(question.qoptionList),abcIndex[que_answer[que_index]])">{{ abcIndex[que_answer[que_index]] }}</span>

            <!-- 按钮 -->
            <el-button type="primary" round style="position: absolute; bottom: 10px; right: 10px;" @click="addFavor">
                添加至收藏夹
                <el-icon>
                    <CirclePlus />
                </el-icon>
            </el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
export default {
    data(){
        return{
            chosen: null,
            questionIndex: 0,
            questionType:{
                id: '',
                name: '',
                questionCount: ''
            },
            questionList: [],
            question: {
                id: '',
                typeId: '',
                content: '',
                qoptionList: []
            },
            qoption: {
                id: '',
                content: '',
                questionId: '',
                answer: 0
            },
            abcIndex:['A','B','C','D','E','F','G','H','I'],//序号映射选项
            que_answer:[],//用户答案队列
            right_num: 0
        }
    },
    methods:{
        addFavor(){
            //TODO: 添加至收藏夹
            ElMessage({
                message:"添加成功",
                type: 'success'
            })
        },
        left_but(){
            this.que_answer[this.questionIndex] = this.chosen//保存答题状态
            this.questionIndex--;//题号减一回到上一题
            this.chosen = this.que_answer[this.questionIndex];//将记录的答案选择状态赋予给当前的题目
        },
        right_but(){
            if(this.chosen == null){
                ElMessage({
                    message:"请选择一个答案",
                    type: 'error'
                })
                return ;
            }
            console.log("选择了："+this.abcIndex[this.chosen]);
            this.que_answer[this.questionIndex] = this.chosen;//更改答案
            this.questionIndex++;//题号加一下一题
            this.chosen = this.que_answer[this.questionIndex];//将记录的答案选择状态赋予给当前的题目
        },
        finish_but(){
            if(this.chosen == null){
                ElMessage({
                    message:"请选择一个答案",
                    type: 'error'
                })
                return ;
            }
            this.que_answer[this.questionIndex] = this.chosen;//更改答案
            this.questionIndex++;

            this.questionList.forEach((item,index)=>{
                if(this.getAnswer(item.qoptionList)===this.abcIndex[this.que_answer[index]]){
                    this.right_num++;
                }
            })

            ElMessage({
                message:"结算成功",
                type: 'success'
            })
        },
        handleBeforeUnload(event) {
            const message = "刷新后不会保存答题结果!";
            event.returnValue = message; // 标准浏览器
            return message; // 针对老版本浏览器
        },
        getAnswer(opt_list){
            let ans = '';
            opt_list.forEach((opt,index) => {
                if(opt.answer == 1){
                    console.log(this.abcIndex[index]);
                    ans = this.abcIndex[index];
                    return;
                }
            });
            return ans;
        },
        getColor(ans,user_ans){
            if(ans === user_ans){
                return {color: '#67C23A'};
            }else return { color: '#F56C6C' };
        }
    },
    mounted(){
        window.addEventListener('beforeunload', this.handleBeforeUnload);
        const route = useRoute();
        //根据id获取题目类型
        axios.get("/questionType/getById?id="+route.params.id).then(
            (response) =>{
                this.questionType = response.data.data;
                console.log(this.questionType);
            }
        )
        //根据题目类型id获取题目列表
        axios.get('/question/getByTypeId?id='+route.params.id).then(
            (response) =>{
                this.questionList = response.data.data;
                console.log(this.questionList);
            }
        )
    },
    beforeUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }
}
</script>

<style scoped>
    .qo{
        width: 750px;
        min-height: 55px;
        height: auto;
        margin: 20px auto;
        overflow-wrap: break-word;
        border: 2px solid var(--el-border-color);
        border-radius: 4px;
        padding: 20px;
    }
    .opt{
        width: 650px;
        min-height: 55px;
        height: auto;
        margin: 20px auto;
        overflow-wrap: break-word;
        border: 2px solid var(--el-border-color);
        border-radius: 4px;
        padding: 20px;
        white-space: normal;
    }
</style>