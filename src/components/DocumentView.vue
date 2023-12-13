<template>
    <div>
       <h2 style="color: #555;">学习资料</h2>
       <el-row :gutter="20">
            <el-col :span="6">
                <el-input placeholder="输入标题以搜索" size="large" v-model="search_title"/>
            </el-col>
            <el-col :span="6">
                <el-select size="large" placeholder="选择文章类型" v-model="search_type_id">
                    <el-option v-for="documentType in documentTypeList" 
                    :key="documentType.id"
                    :value="documentType.id"
                    :label="documentType.name"
                    />
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-button size="large" @click="search"><el-icon><Search /></el-icon>搜索</el-button>
            </el-col>
            <el-col :span="6">
                <el-button size="large" @click="reset"><el-icon><Refresh /></el-icon>重置</el-button>
            </el-col>
       </el-row>
       <el-table :data="documentList" stripe style="width: 100%">
            <el-table-column label="标题" width="180">
                <template v-slot="{ row }">
                    <!-- 使用 router-link 创建链接 -->
                    <router-link :to="`/DocumentDetail/${row.id}`" class="custom-link">
                    {{ row.title }}
                    </router-link>
                </template>
        </el-table-column>
            <el-table-column prop="typeName" label="类型" width="180" />
            <el-table-column prop="introduction" label="简介" />
        </el-table>
        <div style="margin: 10px">
            <el-pagination background layout="prev, pager, next" :total="10" />
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
export default {
    data(){
        return{
            getTypeName: new Map(),
            documentList:[],
            documentTypeList:[],
            documentType:{
                id:'',
                name:'',
                documentCount:''
            },
            document:{
                id:'',
                title:'',
                typeId:'',
                content:'',
                favoritesCount:0,
                likesCount:0,
                commentCount:0,
                introduction:'',
                typeName:''
            },
            search_type_id:'',
            search_title:''
        }
    },
    methods:{
        search(){
            console.log(this.search_type_id);
            console.log(this.search_title);
            const param = {
                'title' : this.search_title,
                'typeId' : this.search_type_id
            }
            axios.post('/document/search',param).then(
                (response) =>{
                    if(response.data.code == 1){
                        ElMessage({
                            message:"搜索成功",
                            type: 'success'
                        })
                    }else{
                        ElMessage({
                            message:"搜索失败",
                            type: 'error'
                        })
                    }
                    this.documentList = response.data.data;
                    //补全typeName
                    this.documentList.forEach(
                        (item) =>{
                            item.typeName = this.getTypeName.get(item.typeId);
                        }
                    )
                }
            )
        },
        reset(){
            this.search_type_id = '';
            this.search_title = '';
            // this.search();
        }
    },
    mounted(){
        //获取全部资料类型
        axios.get('/documentType/getAll').then(
            (response) =>{
                if(response.data.code == 1){
                    ElMessage({
                        message:"获取资料类型列表成功",
                        type: 'success'
                    })
                }else{
                    ElMessage({
                        message:"获取失败",
                        type: 'error'
                    })
                }

                this.documentTypeList = response.data.data;
                //创建文章类型和id的映射
                this.documentTypeList.forEach(
                    (item)=>{
                        this.getTypeName.set(item.id,item.name);
                    }
                )
                console.log(this.documentTypeList);
            }
        )
        //获取全部文章
        axios.get('/document/getAll').then(
            (response) =>{
                if(response.data.code == 1){
                    ElMessage({
                        message:"获取资料列表成功",
                        type: 'success'
                    })
                }else{
                    ElMessage({
                        message:"获取失败",
                        type: 'error'
                    })
                }
                this.documentList = response.data.data;
                //补全typeName
                this.documentList.forEach(
                    (item) =>{
                        console.log("introduction_lenth:"+item.introduction.length)
                        item.typeName = this.getTypeName.get(item.typeId);
                        //长度太大显示省略号
                        if(item.introduction.length >= 40){
                            item.introduction = item.introduction.substring(0,40) + '...';
                        }
                    }
                )
                console.log(this.documentList);
            }
        )
    }
}
</script>

<style>
    .custom-link {
        color: inherit; /* 使用父元素的文本颜色 */
        text-decoration: none; /* 去除下划线 */
        cursor: pointer; /* 显示光标为指针 */
    }

    .custom-link:hover {
        text-decoration: underline; /* 在悬停时显示下划线 */
    }
</style>