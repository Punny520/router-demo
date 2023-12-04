<template>
  <div>
    <div class="article-container">
      <div class="title-box">
        <h1>{{ document.title }}</h1>
      </div>
      <div class="content-box">
        <p>{{ document.content }}</p>
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
        }
    },
    mounted(){
        const route = useRoute();
        console.log(route.params.id);
        //获取根据id文章
        axios.get('/document/getById?id='+route.params.id).then(
            (response) => {
                console.log(response.data.data);
                this.document = response.data.data;
            }
        )
    }
}
</script>

<style scoped>
    .article-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    }

    .title-box {
    text-align: center;
    margin-bottom: 20px;
    }

    h1 {
    font-size: 2.5em;
    color: #333;
    }

    .content-box {
    line-height: 1.6;
    font-size: 1.2em;
    color: #555;
    }

    p {
    margin-bottom: 15px;
    }
</style>