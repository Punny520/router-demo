import { createRouter, createWebHashHistory } from 'vue-router'
import QuestionTypeView from '@/components/QuestionTypeView.vue'
import QuestionView from '@/components/QuestionView.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {path:'/QuestionType',component: QuestionTypeView},
    {path:'/Question/:id',component: QuestionView},

  ]
})

export default router
