import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import QuestionTypeView from '@/components/QuestionTypeView.vue'
import QuestionView from '@/components/QuestionView.vue'
import DocumentView from '@/components/DocumentView.vue'
import DocumentDetailView from '@/components/DocumentDetailView.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path:'/QuestionType',component: QuestionTypeView},
    {path:'/Question/:id',component: QuestionView},
    {path:'/Document',component: DocumentView},
    {path:'/DocumentDetail/:id',component: DocumentDetailView}
  ]
})

export default router
