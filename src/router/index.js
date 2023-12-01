import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import QuestionTypeView from '@/components/QuestionTypeView.vue'
import QuestionView from '@/components/QuestionView.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path:'/QuestionType',component: QuestionTypeView},
    {path:'/Question/:id',component: QuestionView},

  ]
})

export default router
